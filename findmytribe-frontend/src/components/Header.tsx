import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{
      background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)', // Blue gradient
      boxShadow: '0 2px 8px 0 #0002',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Link to="/" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', letterSpacing: 0.2, textShadow: '0 1px 2px #0003', textDecoration: 'none' }}>FindMyTribe</Link>
      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        <Link to="/search" style={{ color: '#e0e7ff', fontWeight: 500, textDecoration: 'none', fontSize: '1rem' }}>Search</Link>
        <Link to="/create-event" style={{ color: '#e0e7ff', fontWeight: 500, textDecoration: 'none', fontSize: '1rem' }}>Create Event</Link>
      </nav>
    </header>
  )
}
