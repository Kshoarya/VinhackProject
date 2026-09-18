import React from 'react';
import { ShieldCheck, LogOut, ArrowLeft, ArrowRight, Building2 } from 'lucide-react';

export default function PageHeader({ title, subtitle, clubInfo, pageStep, totalPages, onPrevPage, onNextPage, onLogout }) {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-muted)',
      background: 'rgba(6, 9, 17, 0.95)',
      padding: '10px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '56px'
    }}>
      {/* Page Title & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 800,
          padding: '2px 6px',
          borderRadius: '4px',
          background: 'rgba(37, 99, 235, 0.15)',
          color: '#60a5fa',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        }}>
          PAGE {pageStep}/{totalPages}
        </span>
        <h1 className="gradient-blue-text" style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderLeft: '1px solid var(--border-muted)', paddingLeft: '10px' }}>
            {subtitle}
          </span>
        )}
      </div>

      {/* Logged in Club Badge & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {clubInfo && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(15, 23, 42, 0.8)',
            padding: '4px 10px',
            borderRadius: '8px',
            border: '1px solid var(--border-muted)'
          }}>
            <Building2 size={14} color="#60a5fa" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-white)' }}>
              {clubInfo.club_name || clubInfo.username}
            </span>
          </div>
        )}

        {/* Page Nav Buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {onPrevPage && pageStep > 1 && (
            <button onClick={onPrevPage} className="btn-outline" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
              <ArrowLeft size={12} /> Back
            </button>
          )}
          {onNextPage && pageStep < totalPages && (
            <button onClick={onNextPage} className="btn-blue" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
              Next <ArrowRight size={12} />
            </button>
          )}
        </div>

        {clubInfo && onLogout && (
          <button
            onClick={onLogout}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              paddingLeft: '4px'
            }}
          >
            <LogOut size={14} /> Exit
          </button>
        )}
      </div>
    </header>
  );
}
