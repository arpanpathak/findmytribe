// src/pages/SearchPage.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  fromUser: boolean;
  text: string;
}

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, placeholder = 'AI powered search… (events, tribes, people)' }) => {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSearch = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setIsSending(true);
    onSearch(trimmed);
    setTimeout(() => setIsSending(false), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div style={{
      width: '100%',
      background: '#0A1F45', // deep/navy blue nav background
      boxSizing: 'border-box',
      padding: '18px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 520,
        background: '#223c6a', // dark blue search box background
        borderRadius: 18,
        boxShadow: '0 2px 16px 0 #1e3a8a22',
        display: 'flex',
        alignItems: 'center',
        padding: '0 0 0 12px',
        position: 'relative',
      }}>
        <textarea
          ref={inputRef}
          placeholder={placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            resize: 'vertical',
            border: 'none',
            background: 'transparent',
            color: '#e0e7ff', // bright text for dark bg
            fontSize: 18,
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
            padding: '16px 0 16px 0',
            outline: 'none',
            minHeight: 40,
            maxHeight: 180,
            boxSizing: 'border-box',
            lineHeight: 1.5,
          }}
          rows={2}
          disabled={isSending}
          aria-label="Search input"
        />
        {/* Toolbar inside input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '0 10px',
          height: '100%',
        }}>
          {/* Microphone icon */}
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} aria-label="Voice search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 17a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v6a4 4 0 0 0 4 4Zm5-4a1 1 0 1 0-2 0 6 6 0 0 1-12 0 1 1 0 1 0-2 0 8 8 0 0 0 16 0Z" fill="#60a5fa"/></svg>
          </button>
          {/* Send icon */}
          <button onClick={handleSearch} disabled={isSending || !input.trim()} style={{ background: 'none', border: 'none', padding: 0, cursor: isSending || !input.trim() ? 'not-allowed' : 'pointer', opacity: isSending || !input.trim() ? 0.5 : 1 }} aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12l18-8-8 18-2-7-7-2Z" fill="#38bdf8"/></svg>
          </button>
          {/* Settings icon */}
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} aria-label="Settings">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Zm7.43-2.9c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.03 7.03 0 0 0-1.7-.98l-.38-2.65A.5.5 0 0 0 13 2h-2a.5.5 0 0 0-.5.42l-.38 2.65c-.63.25-1.22.57-1.78.98l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.49-1c.56.41 1.15.73 1.78.98l.38 2.65A.5.5 0 0 0 11 22h2a.5.5 0 0 0 .5-.42l.38-2.65c.63-.25 1.22-.57 1.78-.98l2.49 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.11-1.65Z" fill="#60a5fa"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
