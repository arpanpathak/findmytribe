import React, { useEffect, useState } from 'react';

/**
 * Represents an event object.
 * @typedef {Object} Event
 * @property {string} id - Unique event ID.
 * @property {string} name - Event name.
 * @property {string} description - Event description.
 * @property {string} startTime - Event start time (ISO string).
 * @property {string} endTime - Event end time (ISO string).
 * @property {string} location - Event location.
 * @property {string[]} organizerIds - Organizer profile IDs.
 * @property {'Free'|'Paid'} type - Event type.
 * @property {string} coverImageUrl - Cover image URL.
 */
export type Event = {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  organizerIds: string[];
  type: 'Free' | 'Paid';
  coverImageUrl: string;
};

/**
 * Event attendance statistics.
 * @typedef {Object} EventStats
 * @property {number} Attending
 * @property {number} MightGo
 * @property {number} NotAttending
 * @property {Record<string, number>} GenderBalance
 */
export type EventStats = {
  Attending: number;
  MightGo: number;
  NotAttending: number;
  GenderBalance: Record<string, number>;
};

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 4, fill: 'currentColor' }}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const AttendButton: React.FC<{ onAttend: (status: string) => void }> = ({ onAttend }) => {
  const btns = [
    {
      label: 'Attend',
      color: 'linear-gradient(90deg, #2563eb 0%, #1e3a8a 100%)',
      hover: 'linear-gradient(90deg, #1e40af 0%, #2563eb 100%)',
      icon: (
        // Strong bold tick
        <svg width="20" height="20" viewBox="0 0 24 24" style={{ fill: '#fff' }}>
          <path d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-8.285 8.293-3.172-3.172a1 1 0 1 0-1.414 1.414l3.879 3.879a1 1 0 0 0 1.414 0l8.992-8.996z"/>
        </svg>
      ),
      status: 'Attending',
    },
    {
      label: 'Might Go',
      color: 'linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)',
      hover: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 100%)',
      icon: (
        // Modern bold hourglass
        <svg width="20" height="20" viewBox="0 0 24 24" style={{ fill: '#fff' }}>
          <path d="M7 2a1 1 0 0 0 0 2h1v2.5c0 1.2.5 2.4 1.4 3.3L12 12l-2.6 2.2A4.5 4.5 0 0 0 8 17.5V20H7a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2h-1v-2.5c0-1.2-.5-2.4-1.4-3.3L12 12l2.6-2.2A4.5 4.5 0 0 0 16 6.5V4h1a1 1 0 1 0 0-2H7zm3 2h4v2.5c0 .7-.3 1.4-.8 1.8L12 12l-1.2-1.7A2.5 2.5 0 0 1 10 6.5V4z"/>
        </svg>
      ),
      status: 'MightGo',
    },
    {
      label: 'Not Attending',
      color: 'linear-gradient(90deg, #64748b 0%, #2563eb 100%)',
      hover: 'linear-gradient(90deg, #475569 0%, #2563eb 100%)',
      icon: (
        // Modern minimal X (cross)
        <svg width="20" height="20" viewBox="0 0 24 24" style={{ fill: '#fff' }}>
          <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"/>
        </svg>
      ),
      status: 'NotAttending',
    },
  ];
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      margin: '10px 0 6px 0',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      width: '100%',
    }}>
      {btns.map((btn, i) => (
        <button
          key={btn.label}
          onClick={() => onAttend(btn.status)}
          onMouseEnter={() => setHoverIdx(i)}
          onMouseLeave={() => setHoverIdx(null)
          }
          style={{
            background: hoverIdx === i ? btn.hover : btn.color,
            color: '#fff',
            border: '1.5px solid #e0e7ef',
            borderRadius: 999,
            minWidth: 90,
            maxWidth: 140,
            width: '100%',
            padding: '7px 0',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.93rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hoverIdx === i
              ? '0 2px 12px 0 #2563eb33, 0 0 0 3px #fff6 inset'
              : '0 1.5px 6px 0 #2563eb18',
            letterSpacing: 0.18,
            transition: 'background 0.18s, box-shadow 0.18s, border 0.18s',
            outline: 'none',
            lineHeight: 1.13,
            position: 'relative',
            overflow: 'hidden',
            gap: 8,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>{btn.icon}</span>
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  );
};

const EventCard = ({ event }: { event: Event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [stats, setStats] = useState<EventStats | null>(null);

  useEffect(() => {
    fetch(`/api/attendances/event/${event.id}/statistics`)
      .then(res => res.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, [event.id]);

  const handleAttend = (status: string) => {
    fetch(`/api/attendances/event/${event.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ProfileId: '1', Status: status }) // TODO: Replace with real profile id
    })
      .then(() => {
        fetch(`/api/attendances/event/${event.id}/statistics`)
          .then(res => res.json())
          .then(setStats)
          .catch(() => setStats(null));
      });
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: isHovered 
          ? '0 6.4px 14.4px 0 rgba(0, 0, 0, 0.13), 0 1.2px 3.6px 0 rgba(0, 0, 0, 0.09)'
          : '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.09), 0 0.3px 0.9px 0 rgba(0, 0, 0, 0.06)',
        transition: 'all 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title bar with tribe info */}
      <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(90deg, #0a1836 0%, #1e3a8a 100%)', // much darker blue
          padding: '0.22rem 0.7rem 0.18rem 0.7rem', // slightly more height
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          minHeight: 25, // slightly taller
          boxShadow: '0 2px 8px 0 #0ea5e955',
          transition: 'background 0.3s',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" style={{ marginRight: 5, fill: '#fff', filter: 'drop-shadow(0 1px 2px #0ea5e988)' }}>
            <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05C16.16 13.66 18 14.42 18 15.5V19h6v-2.5c0-2.33-4.67-3.5-6-3.5z"/>
          </svg>
          <span style={{ fontWeight: 700, fontSize: '0.93rem', color: '#e6edfa', letterSpacing: 0.09, textShadow: '0 1px 4px #0a183655', fontFamily: 'Inter, Segoe UI, Arial, sans-serif', lineHeight: 1.13 }}>
            {event.name}
          </span>
        </div>
      {/* Cover Image */}
      {event.coverImageUrl && (
        <img
          src={event.coverImageUrl}
          alt={event.name + ' cover'}
          style={{
            width: '100%',
            height: 180,
            objectFit: 'cover',
            marginBottom: 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            boxShadow: '0 2px 8px 0 #2563eb22',
          }}
        />
      )}
      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title and description */}
        <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: 'rgba(30,58,138,0.93)', margin: '0 0 4px 0', lineHeight: 1.5, letterSpacing: 0.1, textShadow: '0 2px 8px #a5b4fc55' }}>
          {event.name}
        </h3>
        <p style={{ fontSize: '0.93rem', color: '#374151', margin: '0 0 8px 0' }}>
          {event.description}
        </p>

        {/* Date and time with calendar icons */}
        <p style={{ fontSize: '0.89rem', color: '#2563eb', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 2, fill: '#3b82f6', verticalAlign: 'middle' }}><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/></svg>
            <b>Start:</b> {new Date(event.startTime).toLocaleString()}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 16 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 2, fill: '#3b82f6', verticalAlign: 'middle' }}><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1z"/></svg>
            <b>End:</b> {new Date(event.endTime).toLocaleString()}
          </span>
        </p>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <LocationIcon />
          <span style={{ fontSize: '0.875rem', color: '#605e5c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>
            {event.location}
          </span>
        </div>

        {/* Organizers */}
        <div style={{ fontSize: '0.8rem', color: '#888' }}>
          Organizers: {event.organizerIds.join(', ')}
        </div>

        {/* Attend Buttons */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0 0 10px 0' }}>
          <AttendButton onAttend={handleAttend} />
        </div>

        {/* Statistics */}
        {stats && (
          <div style={{ fontSize: '0.85rem', marginTop: 8 }}>
            <div><b>Attending:</b> {stats.Attending} &nbsp; <b>Might Go:</b> {stats.MightGo} &nbsp; <b>Not Attending:</b> {stats.NotAttending}</div>
            {stats.GenderBalance && Object.keys(stats.GenderBalance).length > 0 ? (
              <div><b>Gender Balance:</b> {Object.entries(stats.GenderBalance).map(([g, n]) => `${g}: ${n}`).join(', ')}</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

const EventGrid = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [showPagination, setShowPagination] = useState(true);
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    fetch(`/api/events?page=${page}&pageSize=${pageSize}`)
      .then(res => res.json())
      .then((data) => {
        if (data && Array.isArray(data.items)) {
          setEvents(data.items.filter((e: { id: any; }) => e && e.id));
          setTotal(data.total || 0);
        } else {
          setEvents([]);
          setTotal(0);
        }
      })
      .catch(() => {
        setEvents([]);
        setTotal(0);
      });
  }, [page, pageSize]);

  // Magic floating pagination bar
  const Pagination = () => (
    showPagination ? (
      <div
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 36,
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: 'linear-gradient(135deg, #e0f2fe 0%, #b6e0fe 60%, #dbeafe 100%)',
          borderRadius: 32,
          boxShadow: '0 8px 32px 0 #38bdf833, 0 2px 12px 0 #1e3a8a22',
          padding: '12px 32px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          border: '2.5px solid #a5b4fc',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
          fontWeight: 600,
          color: '#223c6a',
          fontSize: 1.08 + 'rem',
          backdropFilter: 'blur(8px)',
          animation: 'floatMagic 2.5s infinite ease-in-out',
        }}
      >
        <button
          onClick={() => setShowPagination(false)}
          style={{
            background: 'none',
            border: 'none',
            marginRight: 12,
            cursor: 'pointer',
            fontSize: 22,
            color: '#2563eb',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Collapse pagination bar"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M7 10l5 5 5-5" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span style={{ marginRight: 10, fontSize: '1rem', color: '#2563eb', fontWeight: 700 }}>Page size:</span>
        <select
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
          style={{
            borderRadius: 16,
            border: '1.5px solid #a5b4fc',
            padding: '4px 12px',
            fontWeight: 600,
            fontSize: '1rem',
            color: '#223c6a',
            background: '#e0f2fe',
            marginRight: 18,
            outline: 'none',
            boxShadow: '0 1px 4px #b6d0f733',
            cursor: 'pointer',
          }}
        >
          {[5, 10, 20, 40, 60, 100].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <button onClick={() => setPage(1)} disabled={page === 1} style={pageBtnStyle}>&laquo; First</button>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={pageBtnStyle}>&lsaquo; Prev</button>
        {/* Jump to page slider */}
        <input
          type="range"
          min={1}
          max={totalPages}
          value={page}
          onChange={e => setPage(Number(e.target.value))}
          style={{
            width: 90,
            margin: '0 10px',
            accentColor: '#38bdf8',
            verticalAlign: 'middle',
          }}
          aria-label="Jump to page"
        />
        <input
          type="number"
          min={1}
          max={totalPages}
          value={page}
          onChange={e => {
            let val = Number(e.target.value);
            if (isNaN(val)) val = 1;
            setPage(Math.max(1, Math.min(totalPages, val)));
          }}
          style={{
            width: 48,
            margin: '0 6px',
            border: '1.5px solid #a5b4fc',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '1rem',
            color: '#223c6a',
            background: '#e0f2fe',
            outline: 'none',
            textAlign: 'center',
          }}
          aria-label="Page number"
        />
        <span style={{ fontSize: '1rem', color: '#2563eb', fontWeight: 700 }}>/ {totalPages}</span>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => Math.abs(p - page) <= 2 || p === 1 || p === totalPages)
          .map((p, idx, arr) =>
            arr[idx - 1] && p - arr[idx - 1] > 1 ? (
              <span key={p + 'dots'} style={{ padding: '0 6px', color: '#b6d0f7' }}>…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  ...pageBtnStyle,
                  background: p === page ? 'linear-gradient(90deg, #38bdf8 0%, #a5b4fc 100%)' : 'none',
                  color: p === page ? '#0a1f44' : '#223c6a',
                  border: p === page ? '2px solid #2563eb' : '2px solid transparent',
                  fontWeight: p === page ? 700 : 600,
                  boxShadow: p === page ? '0 2px 8px #38bdf822' : 'none',
                }}
              >
                {p}
              </button>
            )
          )}
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={pageBtnStyle}>Next &rsaquo;</button>
        <button onClick={() => setPage(totalPages)} disabled={page === totalPages} style={pageBtnStyle}>Last &raquo;</button>
      </div>
    ) : (
      <button
        onClick={() => setShowPagination(true)}
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 36,
          transform: 'translateX(-50%)',
          zIndex: 100,
          background: 'linear-gradient(135deg, #e0f2fe 0%, #b6e0fe 60%, #dbeafe 100%)',
          borderRadius: 32,
          boxShadow: '0 8px 32px 0 #38bdf833, 0 2px 12px 0 #1e3a8a22',
          border: '2.5px solid #a5b4fc',
          padding: '10px 22px',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
          fontWeight: 700,
          color: '#2563eb',
          fontSize: '1.1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backdropFilter: 'blur(8px)',
          animation: 'floatMagic 2.5s infinite ease-in-out',
        }}
        aria-label="Expand pagination bar"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 14l-5-5-5 5" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Show Pagination
      </button>
    )
  );

  const pageBtnStyle: React.CSSProperties = {
    border: 'none',
    background: 'none',
    color: '#2563eb',
    fontWeight: 600,
    fontSize: '1.05rem',
    borderRadius: 18,
    padding: '6px 14px',
    margin: '0 2px',
    cursor: 'pointer',
    transition: 'background 0.18s, color 0.18s',
    outline: 'none',
    boxShadow: 'none',
    opacity: 1,
    borderBottom: '2.5px solid transparent',
    minWidth: 36,
    minHeight: 36,
    backgroundClip: 'padding-box',
    userSelect: 'none',
    position: 'relative',
  };

  return (
    <>
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24,
        padding: '16px 16px 40px 16px',
        background: 'none',
        maxWidth: 1200,
        margin: '0 auto',
      }}>
        {events.filter(event => event && event.id).map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {totalPages > 1 && <Pagination />}
      <style>{`
        @keyframes floatMagic {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-8px) scale(1.03); }
        }
      `}</style>
    </>
  );
};

export default EventGrid;