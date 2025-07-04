import React from 'react';

const FloatingCreateEventButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: isHovered ? '#106ebe' : '#0078d4',
        color: 'white',
        border: 'none',
        boxShadow: '0 6.4px 14.4px 0 rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        transition: 'all 0.2s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }}
      aria-label="Create Event"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" style={{ fill: 'currentColor' }}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    </button>
  );
};

export default FloatingCreateEventButton;
