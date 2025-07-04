import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Tribes from './pages/TribePage';
import Navbar from './pages/NavBar';
import ProfilePage from './pages/CrewPage';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/tribes', label: 'Tribes' },
  { to: '/profile', label: 'Profile' },
];

const GlacierBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      overflow: 'hidden',
      background:
        'linear-gradient(135deg, #e0f2fe 0%, #b6e0fe 40%, #dbeafe 70%, #f0f9ff 100%)',
    }}
  >
    {/* Top Mountains */}
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: 160,
        zIndex: 0,
      }}
      viewBox="0 0 1200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 160L200 80L350 120L500 60L650 130L800 90L1000 140L1200 100V0H0V160Z"
        fill="#b6d0f7"
      />
      <path
        d="M0 160L150 110L300 140L450 80L600 150L750 110L900 130L1050 90L1200 160V0H0V160Z"
        fill="#a5b4fc"
      />
    </svg>
    {/* Top-Middle Glacier/Mountain */}
    <svg
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translateX(-50%)',
        width: 420,
        height: 120,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.92,
      }}
      viewBox="0 0 420 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 120L70 60L140 90L210 40L280 100L350 70L420 120V0H0V120Z" fill="#e0f2fe" />
      <path d="M0 120L60 80L120 110L180 60L240 115L300 90L360 110L420 120V0H0V120Z" fill="#b6d0f7" />
    </svg>
    {/* Left Glacier/Mountain */}
    <svg
      style={{
        position: 'absolute',
        left: -80,
        top: 120,
        width: 220,
        height: 340,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
      viewBox="0 0 220 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 340L40 200L100 260L160 120L220 320V0H0V340Z" fill="#b6d0f7" />
      <path d="M0 340L30 250L80 300L130 180L180 320L220 340V0H0V340Z" fill="#a5b4fc" />
    </svg>
    {/* Right Glacier/Mountain */}
    <svg
      style={{
        position: 'absolute',
        right: -80,
        top: 180,
        width: 220,
        height: 340,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
      viewBox="0 0 220 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M220 340L180 200L120 260L60 120L0 320V0H220V340Z" fill="#b6d0f7" />
      <path d="M220 340L190 250L140 300L90 180L40 320L0 340V0H220V340Z" fill="#a5b4fc" />
    </svg>
    {/* Decorative Strips */}
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 120,
        width: '100%',
        height: 40,
        zIndex: 1,
        opacity: 0.7,
      }}
      viewBox="0 0 1200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="1200" height="40" fill="#bae6fd" />
      <rect x="0" y="20" width="1200" height="10" fill="#a5b4fc" />
      <rect x="0" y="30" width="1200" height="6" fill="#38bdf8" />
    </svg>
    {/* Clouds */}
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: 120,
        zIndex: 2,
        opacity: 0.13,
      }}
      viewBox="0 0 1200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="200" cy="60" rx="120" ry="32" fill="#fff" />
      <ellipse cx="500" cy="40" rx="90" ry="24" fill="#e0f2fe" />
      <ellipse cx="900" cy="70" rx="110" ry="28" fill="#fff" />
    </svg>
    {/* Bottom Mountains */}
    <svg
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 180,
        zIndex: 0,
      }}
      viewBox="0 0 1200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 180L200 120L350 160L500 100L650 170L800 130L1000 180L1200 140V180H0Z"
        fill="#b6d0f7"
      />
      <path
        d="M0 180L150 150L300 170L450 120L600 180L750 140L900 170L1050 130L1200 180V180H0Z"
        fill="#a5b4fc"
      />
    </svg>
    {/* River */}
    <svg
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 60,
        zIndex: 1,
        opacity: 0.7,
      }}
      viewBox="0 0 1200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 40Q300 60 600 40T1200 40V60H0V40Z" fill="#38bdf8" />
    </svg>
    <div style={{ position: 'relative', zIndex: 3 }}>{children}</div>
  </div>
);

const App: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  // Height of the fixed nav+search bar (adjusted for true combined height)
  const navBarHeight = 160;

  return (
    <Router>
      <GlacierBackground>
        {/* Fixed nav+search bar as a single unit, with Search first */}
        <Navbar navLinks={navLinks} onSearch={handleSearch} />
        {/* Spacer to prevent content from being hidden under fixed nav */}
        <div style={{ height: navBarHeight }} />
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 24,
            background: 'none',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tribes" element={<Tribes />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </GlacierBackground>
    </Router>
  );
};

export default App;
