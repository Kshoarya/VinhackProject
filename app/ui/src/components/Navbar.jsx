import React from 'react';
import { Sparkles, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(10, 13, 20, 0.8)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-purple))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)'
        }}>
          <Zap size={22} color="#ffffff" />
        </div>
        <div>
          <h2 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 800 }}>CampusSync</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Autonomous Event Marketing Pipeline</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div className="badge badge-purple">
          <Sparkles size={14} /> Hackathon 20-Hr Sprint
        </div>
        <div className="badge badge-green">
          <ShieldCheck size={14} /> Strict Directory Isolation Active
        </div>
      </div>
    </nav>
  );
}
