// src/pages/Tribe.tsx
import React, { useEffect, useState } from 'react';

export type Tribe = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  memberProfileIds: string[];
};

const TribeIcon = ({ url }: { url: string }) => (
  <img src={url} alt="Tribe Icon" style={{ width: 36, height: 36, borderRadius: 8, marginRight: 12, background: '#f3f3f3', objectFit: 'cover' }} />
);

const sidebarOptions = [
  {
    key: 'my-tribes',
    label: 'My Tribes',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" style={{ fill: '#38bdf8' }}><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05C16.16 13.66 18 14.42 18 15.5V19h6v-2.5c0-2.33-4.67-3.5-6-3.5z"/></svg>
    ),
  },
  {
    key: 'create-tribe',
    label: 'Create Tribe',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" style={{ fill: '#a5b4fc' }}><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
    ),
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" style={{ fill: '#0ea5e9' }}><path d="M19.14,12.94a1.43,1.43,0,0,0,0-1.88l2-1.55a.5.5,0,0,0,.12-.66l-2-3.46a.5.5,0,0,0-.61-.22l-2.35,1a5.37,5.37,0,0,0-1.6-.93l-.36-2.49A.5.5,0,0,0,13,3H11a.5.5,0,0,0-.5.42l-.36,2.49a5.37,5.37,0,0,0-1.6.93l-2.35-1a.5.5,0,0,0-.61.22l-2,3.46a.5.5,0,0,0,.12.66l2,1.55a1.43,1.43,0,0,0,0,1.88l-2,1.55a.5.5,0,0,0-.12.66l2,3.46a.5.5,0,0,0,.61.22l2.35-1a5.37,5.37,0,0,0,1.6.93l.36,2.49A.5.5,0,0,0,11,21h2a.5.5,0,0,0,.5-.42l.36-2.49a5.37,5.37,0,0,0,1.6-.93l2.35,1a.5.5,0,0,0,.61-.22l2-3.46a.5.5,0,0,0-.12-.66ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
    ),
  },
];

const Tribes: React.FC = () => {
  const [tribes, setTribes] = useState<Tribe[]>([]);
  const [newTribe, setNewTribe] = useState({ name: '', description: '', iconUrl: '' });
  const [selected, setSelected] = useState('my-tribes');

  useEffect(() => {
    fetch('/api/tribes')
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setTribes(data) : setTribes([]));
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/tribes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTribe)
    })
      .then(res => res.json())
      .then((tribe) => setTribes(t => [...t, tribe]));
    setNewTribe({ name: '', description: '', iconUrl: '' });
  };

  const isValid = newTribe.name.trim().length > 0 && newTribe.description.trim().length > 0;

  return (
    <div>
      {/* Top nav is fixed, so add left padding for sidebar on desktop */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          minHeight: 500,
          maxWidth: 1200,
          margin: '0 auto',
          padding: 0,
          background: 'none',
        }}
      >
        {/* Sidebar: solid, fixed-colored, always visible */}
        <nav
          className="tribe-solid-sidebar"
          style={{
            minWidth: 72,
            maxWidth: 90,
            width: 72,
            background: '#223c6a',
            borderRight: '2.5px solid #1e3a8a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            padding: '0 0 12px 0',
            position: 'fixed',
            top: 16, // start a little below nav
            left: 0,
            zIndex: 101,
            height: 'calc(100vh - 16px)',
            boxShadow: '2px 0 16px 0 #223c6a22',
            borderTopLeftRadius: 18,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
            transition: 'all 0.2s',
          }}
        >
          {sidebarOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSelected(opt.key)}
              style={{
                background: selected === opt.key ? 'linear-gradient(120deg, #0a1f44 60%, #223c6a 100%)' : 'none',
                border: selected === opt.key ? '2px solid #38bdf8' : '2px solid transparent',
                borderRadius: 14,
                padding: '12px 0',
                margin: '10px 0 2px 0',
                boxShadow: selected === opt.key ? '0 2px 12px #0a1f4444' : 'none',
                color: selected === opt.key ? '#e0f2fe' : '#e0e7ff',
                fontWeight: 700,
                fontSize: '1.08rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.18s',
                minWidth: 48,
                width: 48,
                borderLeft: selected === opt.key ? '4px solid #38bdf8' : '4px solid transparent',
              }}
            >
              {opt.icon}
              <span style={{ fontSize: '0.85rem', marginTop: 2 }}>{opt.label}</span>
            </button>
          ))}
        </nav>
        {/* Main panel */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            width: '100%',
            marginTop: 0,
            padding: '18px 8px',
            marginLeft: 90,
            transition: 'margin-left 0.2s',
          }}
        >
          {selected === 'my-tribes' && (
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '1.3rem', marginBottom: 18 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" style={{ marginRight: 8, fill: '#1db954' }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                Your Tribes
              </h2>
              <div>
                {tribes.map(tribe => (
                  <div key={tribe.id} style={{ display: 'flex', alignItems: 'center', background: '#f9f9f9', borderRadius: 8, padding: 12, marginBottom: 12, boxShadow: '0 2px 8px 0 #0001' }}>
                    <TribeIcon url={tribe.iconUrl || 'https://cdn-icons-png.flaticon.com/512/616/616494.png'} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 2 }}>{tribe.name}</div>
                      <div style={{ color: '#666', fontSize: '0.93rem', marginBottom: 2 }}>{tribe.description}</div>
                      <div style={{ color: '#888', fontSize: '0.85rem' }}>Members: {tribe.memberProfileIds.length}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selected === 'create-tribe' && (
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '1.3rem', marginBottom: 18 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" style={{ marginRight: 8, fill: '#38bdf8' }}><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
                Create Tribe
              </h2>
              <form onSubmit={handleCreate} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                marginBottom: 18,
                background: 'white',
                borderRadius: 10,
                boxShadow: '0 4px 24px 0 #38bdf822',
                padding: '28px 24px',
                maxWidth: 420,
                margin: '0 auto',
                border: '1.5px solid #e5e7eb',
              }}>
                <FloatingInput label="Tribe Name" required value={newTribe.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTribe(t => ({ ...t, name: e.target.value }))} />
                <FloatingInput label="Description" required value={newTribe.description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTribe(t => ({ ...t, description: e.target.value }))} />
                <FloatingInput label="Icon URL (optional)" value={newTribe.iconUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTribe(t => ({ ...t, iconUrl: e.target.value }))} />
                <button type="submit" disabled={!isValid} style={{
                  background: isValid ? 'linear-gradient(90deg, #38bdf8 0%, #a5b4fc 100%)' : '#b6c6e6',
                  color: isValid ? '#0a1f44' : '#7b8bb7',
                  border: 'none',
                  borderRadius: 6,
                  padding: '12px 0',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  boxShadow: '0 2px 12px #38bdf822',
                  cursor: isValid ? 'pointer' : 'not-allowed',
                  marginTop: 8,
                  letterSpacing: 0.5,
                  transition: 'background 0.2s, color 0.2s',
                }}>Create Tribe</button>
              </form>
            </div>
          )}
          {selected === 'settings' && (
            <div>
              <h2 style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '1.3rem', marginBottom: 18 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" style={{ marginRight: 8, fill: '#0ea5e9' }}><path d="M19.14,12.94a1.43,1.43,0,0,0,0-1.88l2-1.55a.5.5,0,0,0,.12-.66l-2-3.46a.5.5,0,0,0-.61-.22l-2.35,1a5.37,5.37,0,0,0-1.6-.93l-.36-2.49A.5.5,0,0,0,13,3H11a.5.5,0,0,0-.5.42l-.36,2.49a5.37,5.37,0,0,0-1.6.93l-2.35-1a.5.5,0,0,0-.61.22l-2,3.46a.5.5,0,0,0,.12.66l2,1.55a1.43,1.43,0,0,0,0,1.88l-2,1.55a.5.5,0,0,0-.12.66l2,3.46a.5.5,0,0,0,.61.22l2.35-1a5.37,5.37,0,0,0,1.6.93l.36,2.49A.5.5,0,0,0,11,21h2a.5.5,0,0,0,.5-.42l.36-2.49a5.37,5.37,0,0,0,1.6-.93l2.35,1a.5.5,0,0,0,.61-.22l2-3.46a.5.5,0,0,0-.12-.66ZM12,15.5A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                Settings (coming soon)
              </h2>
              <div style={{ color: '#888', fontSize: '1.05rem' }}>Settings and preferences for your tribes will appear here.</div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .tribe-solid-sidebar {
            position: fixed !important;
            left: 0 !important;
            bottom: 0 !important;
            top: unset !important;
            width: 100vw !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            height: 64px !important;
            flex-direction: row !important;
            border-radius: 0 !important;
            border-right: none !important;
            border-top: 2.5px solid #1e3a8a !important;
            box-shadow: 0 -2px 16px 0 #223c6a22 !important;
            z-index: 100 !important;
            padding: 0 0 0 0 !important;
            gap: 0 !important;
            justify-content: space-around !important;
            align-items: center !important;
            top: unset !important;
          }
          .tribe-solid-sidebar button {
            min-width: 48px !important;
            width: 48px !important;
            font-size: 0.85rem !important;
            padding: 6px 0 !important;
            border-left: none !important;
            border-top: 4px solid transparent !important;
            border-bottom: 4px solid transparent !important;
            border-radius: 10px !important;
            margin: 0 !important;
          }
          div[style*='max-width: 1200px'] > div[style*='margin-left: 90px'] {
            margin-left: 0 !important;
          }
          form {
            max-width: 98vw !important;
            padding: 18px 4vw !important;
          }
        }
      `}</style>
    </div>
  );
};

// Modern linear input with floating label
export const FloatingInput = ({ label, value, onChange, ...props }: any) => {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ position: 'relative', marginBottom: 24 }}>
      <input
        {...props}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={e => setFocused(!!e.target.value)}
        style={{
          width: '100%',
          fontSize: '1.08rem',
          fontWeight: 500,
          padding: '18px 8px 6px 8px',
          border: 'none',
          borderBottom: focused || value ? '2.5px solid #38bdf8' : '1.5px solid #b6c6e6',
          background: 'transparent',
          outline: 'none',
          transition: 'border 0.2s',
          borderRadius: 0,
          boxShadow: 'none',
        }}
      />
      <label
        style={{
          position: 'absolute',
          left: 8,
          top: focused || value ? 2 : 18,
          fontSize: focused || value ? '0.85rem' : '1.08rem',
          color: focused || value ? '#38bdf8' : '#7b8bb7',
          fontWeight: 600,
          pointerEvents: 'none',
          letterSpacing: 0.2,
          background: 'white',
          padding: focused || value ? '0 4px' : '0',
          transition: 'all 0.18s',
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default Tribes;