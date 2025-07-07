import * as pulumi from "@pulumi/pulumi";
import * as sql from "@pulumi/azure-native/sql";
import * as authorization from "@pulumi/azure-native/authorization";
import * as azuread from "@pulumi/azuread";

interface SqlDatabaseIamStackArgs {
    resourceGroupName: pulumi.Input<string>;
    databaseName: string;
    serverName: string;
    location?: string;
    azureAdAdmin?: pulumi.Input<string>;
}

class SqlDatabaseIamStack extends pulumi.ComponentResource {
    public database: sql.Database;
    public server: sql.Server;
    public azureAdAdmin?: sql.ServerAzureADAdministrator;

    constructor(name: string, args: SqlDatabaseIamStackArgs, opts?: pulumi.ComponentResourceOptions) {
        super("custom:azure:SqlDatabaseIamStack", name, {}, opts);

        // Create SQL Server with Azure AD-only authentication
        this.server = new sql.Server(`${name}-server`, {
            resourceGroupName: args.resourceGroupName,
            serverName: args.serverName,
            location: args.location || "eastus",
            version: "12.0",
            administrators: {
                administratorType: "ActiveDirectory",
                azureADOnlyAuthentication: true,
            },
        }, { parent: this });

        // Create Free Tier Database
        this.database = new sql.Database(`${name}-db`, {
            resourceGroupName: args.resourceGroupName,
            serverName: this.server.name,
            databaseName: args.databaseName,
            location: args.location || "eastus",
            sku: {
                name: "Free",
                tier: "Free",
            },
            maxSizeBytes: 1073741824,
        }, { parent: this });

        // Handle Azure AD admin assignment
        this.setAzureAdAdmin(name, args);
    }

    private async setAzureAdAdmin(name: string, args: SqlDatabaseIamStackArgs) {
        if (!args.azureAdAdmin) return;

        const clientConfig = await authorization.getClientConfig();
        const tenantId = clientConfig.tenantId;

        // Determine if the admin is a user or service principal
        try {
            const user = await azuread.getUser({
                userPrincipalName: pulumi.output(args.azureAdAdmin).apply(u => u as string),
            });

            this.azureAdAdmin = new sql.ServerAzureADAdministrator(`${name}-adadmin`, {
                resourceGroupName: args.resourceGroupName,
                serverName: this.server.name,
                administratorName: "ActiveDirectoryAdmin",
                administratorType: "ActiveDirectory",
                login: args.azureAdAdmin,
                sid: user.objectId,
                tenantId: tenantId,
            }, { parent: this });
        } catch (error) {
            // If not a user, try as service principal
            const servicePrincipal = await azuread.getServicePrincipal({
                displayName: pulumi.output(args.azureAdAdmin).apply(u => u as string),
            });

            this.azureAdAdmin = new sql.ServerAzureADAdministrator(`${name}-adadmin`, {
                resourceGroupName: args.resourceGroupName,
                serverName: this.server.name,
                administratorName: "ActiveDirectoryAdmin",
                administratorType: "ActiveDirectory",
                login: args.azureAdAdmin,
                sid: servicePrincipal.objectId,
                tenantId: tenantId,
            }, { parent: this });
        }
    }
}

// Main deployment
const config = new pulumi.Config();
const existingResourceGroupName = "findmytribe";

// Get current user context
const currentClient = azuread.getClientConfig();

// Create SQL Database Stack with IAM
const sqlStack = new SqlDatabaseIamStack("findmytribe-sql-iam", {
    resourceGroupName: existingResourceGroupName,
    databaseName: "findmytribe-db",
    serverName: "findmytribe-sql-server",
    location: "eastus",
    azureAdAdmin: config.get("azureAdAdmin") || currentClient.then(c => c.objectId),
});

// Export outputs
export const serverFqdn = sqlStack.server.fullyQualifiedDomainName;
export const databaseName = sqlStack.database.name;
export const azureAdOnlyAuth = true;