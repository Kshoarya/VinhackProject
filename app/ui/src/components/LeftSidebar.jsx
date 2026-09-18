import React from 'react';
import { Zap, Sparkles, Layers, Calendar, LayoutDashboard, Settings, Sun, Moon, Building2, LogOut } from 'lucide-react';

export default function LeftSidebar({ activeTab, setActiveTab, theme, toggleTheme, clubInfo, onLogout }) {
  const navItems = [
    { id: 'creator', label: 'Campaign Creator', icon: Sparkles },
    { id: 'campaigns', label: 'Campaigns Library', icon: Layers },
    { id: 'schedule', label: 'Schedule Timeline', icon: Calendar },
    { id: 'dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
  ];

  return (
    <aside className="left-nav-sidebar">
      {/* Top Section: Brand & Nav Links */}
      <div>
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingLeft: '6px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '12px',
            background: 'var(--pop-tab-yellow)',
            border: '2px solid var(--border-pop)',
            boxShadow: 'var(--shadow-pop-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000000'
          }}>
            <Zap size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>CampusSync</h3>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.05em' }}>AI ENGINE</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`left-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Theme Toggle, Social Auth Settings & Club Badge */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1.5px solid var(--border-subtle)', paddingTop: '16px' }}>
        {/* Small Authorization Settings Button */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`left-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          style={{
            padding: '9px 12px',
            fontSize: '0.8rem',
            background: activeTab === 'settings' ? 'var(--pop-tab-purple)' : 'var(--card-purple)',
            color: activeTab === 'settings' ? '#000000' : 'var(--text-main)'
          }}
        >
          <Settings size={15} />
          <span>Authorization</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--card-blue)',
            border: '2px solid var(--border-pop)',
            boxShadow: 'var(--shadow-pop-sm)',
            color: 'var(--text-main)',
            borderRadius: '14px',
            padding: '9px 12px',
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {theme === 'light' ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#8b5cf6" />}
            <span>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</span>
          </div>
          <span style={{ fontSize: '0.65rem', color: 'var(--accent-blue)', textTransform: 'uppercase', fontWeight: 900 }}>Switch</span>
        </button>

        {/* Logged-in Club Badge & Logout */}
        {clubInfo && (
          <div style={{
            background: 'var(--card-amber)',
            borderRadius: '14px',
            padding: '8px 12px',
            border: '2px solid var(--border-pop)',
            boxShadow: 'var(--shadow-pop-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={15} color="var(--text-main)" />
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {clubInfo.club_name || clubInfo.username}
              </div>
            </div>

            {onLogout && (
              <button onClick={onLogout} title="Log Out" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <LogOut size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

