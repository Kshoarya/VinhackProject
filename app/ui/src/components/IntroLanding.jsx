import React from 'react';
import { Zap, Cpu, Sparkles, ShieldCheck, ArrowRight, Layers, BarChart3, Lock, UserPlus } from 'lucide-react';

export default function IntroLanding({ onGoToLogin, onGoToSignup }) {
  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '10px 20px' }}>
      {/* Hero Banner Card in Pop Style (Theme-Aware) */}
      <div className="pop-folder-card" style={{ padding: '36px 28px 28px', textAlign: 'center', marginBottom: '28px' }}>
        <div className="pop-folder-tab pop-tab-yellow">00 / OVERVIEW</div>

        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'var(--pop-tab-yellow)',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          border: '2.5px solid var(--border-pop)',
          boxShadow: '3px 3px 0px var(--border-pop)'
        }}>
          <Zap size={30} fill="#000000" color="#000000" />
        </div>

        <span className="pill-badge pill-badge-coral" style={{ marginBottom: '14px', fontSize: '0.75rem' }}>
          <Sparkles size={13} /> Vinhack 20-Hour Hackathon
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.1 }}>
          CampusSync AI Engine
        </h1>
        <p style={{ color: 'var(--text-sub)', fontSize: '0.98rem', fontWeight: 700, maxWidth: '740px', margin: '0 auto 26px', lineHeight: 1.6 }}>
          Autonomous Event Social Marketing Engine for Campus Clubs. Convert poster images into multi-platform campaigns for Instagram and LinkedIn automatically.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button onClick={() => onGoToLogin()} className="btn-secondary-pill" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
            <Lock size={16} /> Club Login
          </button>
          <button onClick={() => onGoToSignup()} className="btn-primary-pill" style={{ padding: '12px 30px', fontSize: '0.95rem' }}>
            <UserPlus size={16} /> Register New Club <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Feature Grid (4 Retro Folder Cards with Accent Tabs as shown in Reference Image 5) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
        {/* Folder 1: Blue Tab */}
        <div className="pop-folder-card" style={{ padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="pop-folder-tab pop-tab-blue">01 / VISION</div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--pop-tab-blue)',
            border: '2px solid var(--border-pop)',
            boxShadow: '2px 2px 0px var(--border-pop)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            marginTop: '4px'
          }}>
            <Cpu size={22} />
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '6px' }}>
            Vision LLM & OpenCV
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600, lineHeight: 1.5, flex: 1 }}>
            Extracts event title, date, venue, & vibe while smart-cropping 1:1 Feed images automatically.
          </p>
        </div>

        {/* Folder 2: Pink Tab */}
        <div className="pop-folder-card" style={{ padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="pop-folder-tab pop-tab-pink">02 / CAMPAIGN</div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--pop-tab-pink)',
            border: '2px solid var(--border-pop)',
            boxShadow: '2px 2px 0px var(--border-pop)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            marginTop: '4px'
          }}>
            <Layers size={22} />
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '6px' }}>
            Dual Campaign Gen
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600, lineHeight: 1.5, flex: 1 }}>
            Crafts carousel scripts, emoji captions, and hashtags for Instagram + professional LinkedIn copy.
          </p>
        </div>

        {/* Folder 3: Green Tab */}
        <div className="pop-folder-card" style={{ padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="pop-folder-tab pop-tab-green">03 / TIMING</div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--pop-tab-green)',
            border: '2px solid var(--border-pop)',
            boxShadow: '2px 2px 0px var(--border-pop)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            marginTop: '4px'
          }}>
            <ShieldCheck size={22} />
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '6px' }}>
            Peak Hours Scheduler
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600, lineHeight: 1.5, flex: 1 }}>
            Schedule posts for immediate dispatch or peak student engagement hours automatically.
          </p>
        </div>

        {/* Folder 4: Purple Tab */}
        <div className="pop-folder-card" style={{ padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="pop-folder-tab pop-tab-purple">04 / TRACKING</div>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--pop-tab-purple)',
            border: '2px solid var(--border-pop)',
            boxShadow: '2px 2px 0px var(--border-pop)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            marginTop: '4px'
          }}>
            <BarChart3 size={22} />
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '6px' }}>
            Traction Oversight
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600, lineHeight: 1.5, flex: 1 }}>
            Monitors engagement metrics after publication and triggers dynamic AI auto-refresh if likes are low.
          </p>
        </div>
      </div>
    </div>
  );
}



