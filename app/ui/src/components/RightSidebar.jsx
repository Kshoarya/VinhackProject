import React from 'react';
import { Zap, Sparkles, Layers, Calendar, User, Sun, Moon, Building2, LogOut } from 'lucide-react';

export default function RightSidebar({ activeTab, setActiveTab, theme, toggleTheme, clubInfo, onLogout }) {
  const navItems = [
    { id: 'creator', label: 'Campaign Creator', icon: Sparkles },
    { id: 'campaigns', label: 'Campaigns Library', icon: Layers },
    { id: 'schedule', label: 'Schedule Timeline', icon: Calendar },
    { id: 'account', label: 'Club Settings & Auth', icon: User },
  ];

  return (
    <aside className="right-nav-sidebar">
      {/* Top Section: Brand & Nav Links */}
      <div>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingLeft: '6px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>
            <Zap size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>CampusSync</h3>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>AI ENGINE</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`right-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Theme Toggle & Club Badge */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--card-blue)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-main)',
            borderRadius: '14px',
            padding: '10px 14px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {theme === 'light' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#8b5cf6" />}
            <span>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', textTransform: 'uppercase' }}>Switch</span>
        </button>

        {/* Logged-in Club Badge & Logout */}
        {clubInfo && (
          <div style={{
            background: 'var(--card-purple)',
            borderRadius: '14px',
            padding: '10px 14px',
            border: '1px solid var(--card-purple-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={16} color="var(--accent-purple)" />
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {clubInfo.club_name || clubInfo.username}
              </div>
            </div>

            {onLogout && (
              <button onClick={onLogout} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                <LogOut size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
