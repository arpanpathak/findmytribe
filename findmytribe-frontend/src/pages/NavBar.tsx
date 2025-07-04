// src/components/Navbar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './SearchPage';

interface NavLinkItem {
  to: string;
  label: string;
}

interface NavbarProps {
  navLinks: NavLinkItem[];
}

const navIcons: Record<string, React.ReactNode> = {
  Home: (
    <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: 8, verticalAlign: 'middle', fill: 'currentColor' }}><path d="M12 3l9 8h-3v7a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-7H3z"/><path d="M9 21V9h6v12" fill="none"/></svg>
  ),
  Tribes: (
    <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: 8, verticalAlign: 'middle', fill: 'currentColor' }}><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05C16.16 13.66 18 14.42 18 15.5V19h6v-2.5c0-2.33-4.67-3.5-6-3.5z"/></svg>
  ),
  Profile: (
    <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: 8, verticalAlign: 'middle', fill: 'currentColor' }}><path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
  ),
};

const Navbar: React.FC<NavbarProps & { onSearch: (query: string) => void }> = ({ navLinks, onSearch }) => {
  return (
    <div
      style={{
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 20,
        background: 'rgba(22, 40, 80, 0.92)',
        backdropFilter: 'blur(12px)',
        boxShadow:
          '0 8px 32px 0 rgba(56, 189, 248, 0.16), 0 2px 12px 0 rgba(30, 58, 138, 0.13), 0 1px 4px 0 rgba(165, 180, 252, 0.13)',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        overflow: 'visible',
      }}
    >
      <Search onSearch={onSearch} />
      <nav style={navStyle}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            style={({ isActive }) => ({
              ...linkStyle,
              borderBottom: isActive ? '2px solid #3A8DFF' : '2px solid transparent',
              color: isActive ? '#3A8DFF' : 'white',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: 16,
              padding: '0 10px',
            })}
          >
            {navIcons[label]}
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 24,
  padding: '12px 24px',
  fontFamily: 'system-ui, sans-serif',
  background: '#0A1F44',
  color: 'white',
  fontWeight: 600,
  fontSize: 16,
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  paddingBottom: 4,
  transition: 'color 0.3s ease',
};

export default Navbar;
