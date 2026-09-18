import React from 'react';
import { Zap, Sparkles, ArrowRight, Lock, UserPlus } from 'lucide-react';

export default function IntroLanding({ onGoToLogin, onGoToSignup }) {
  return (
    <div style={{ maxWidth: '820px', margin: '40px auto 0', padding: '10px 20px' }}>
      {/* Hero Banner Card */}
      <div className="curved-card curved-card-white" style={{ padding: '48px 36px 40px', textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'var(--pop-tab-yellow)',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          border: '2.5px solid var(--border-pop)',
          boxShadow: '4px 4px 0px var(--border-pop)'
        }}>
          <Zap size={34} fill="#000000" color="#000000" />
        </div>

        <span className="pill-badge pill-badge-coral" style={{ marginBottom: '16px', fontSize: '0.78rem' }}>
          <Sparkles size={14} /> Vinhack 20-Hour Hackathon
        </span>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '14px', lineHeight: 1.1 }}>
          SocialFlow_Club AI Engine
        </h1>
        <p style={{ color: 'var(--text-sub)', fontSize: '1.05rem', fontWeight: 700, maxWidth: '680px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          Autonomous Event Social Marketing Engine for Campus Clubs. Convert poster images into multi-platform campaigns for Instagram and LinkedIn automatically.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button onClick={() => onGoToLogin()} className="btn-secondary-pill" style={{ padding: '14px 32px', fontSize: '1rem' }}>
            <Lock size={18} /> Club Login
          </button>
          <button onClick={() => onGoToSignup()} className="btn-primary-pill" style={{ padding: '14px 34px', fontSize: '1rem' }}>
            <UserPlus size={18} /> Register New Club <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}



