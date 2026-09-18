import React from 'react';
import { Zap, Database, BarChart3, Layers, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, selectedClub, setSelectedClub }) {
  return (
    <nav style={{
      borderBottom: '1px solid var(--border-muted)',
      background: 'rgba(6, 9, 17, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Brand Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-cyan))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)'
        }}>
          <Zap size={24} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 className="gradient-blue-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>CampusSync</h1>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'rgba(59, 130, 246, 0.15)',
              color: '#60a5fa',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              AI ENGINE
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Autonomous Event Social Marketing Pipeline</span>
        </div>
      </div>

      {/* Navigation Controls & Club Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Active Club Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Club:</span>
          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              color: 'var(--text-white)',
              border: '1px solid var(--border-muted)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="Campus Tech Club">Campus Tech Club</option>
            <option value="ACM Student Chapter">ACM Student Chapter</option>
            <option value="Robotics & AI Society">Robotics & AI Society</option>
            <option value="Design & Innovation Lab">Design & Innovation Lab</option>
          </select>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-muted)' }}>
          <button
            className={`nav-tab ${activeTab === 'pipeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('pipeline')}
          >
            <Layers size={16} /> Campaign Creator
          </button>
          <button
            className={`nav-tab ${activeTab === 'oversight' ? 'active' : ''}`}
            onClick={() => setActiveTab('oversight')}
          >
            <BarChart3 size={16} /> Live Oversight
          </button>
        </div>

        {/* Database Status Indicator */}
        <div className="status-pill status-green">
          <Database size={13} /> Supabase Live
        </div>
      </div>
    </nav>
  );
}
