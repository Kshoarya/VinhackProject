import React from 'react';
import { Zap, Cpu, Sparkles, ShieldCheck, ArrowRight, Layers, BarChart3, Lock, UserPlus } from 'lucide-react';

export default function IntroLanding({ onGoToLogin, onGoToSignup }) {
  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '10px 20px' }}>
      {/* Hero Banner Card */}
      <div className="curved-card curved-card-white" style={{ padding: '32px', textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 14px',
          boxShadow: '0 6px 20px rgba(37, 99, 235, 0.35)'
        }}>
          <Zap size={28} color="#ffffff" />
        </div>

        <span className="pill-badge pill-badge-blue" style={{ marginBottom: '12px', fontSize: '0.7rem' }}>
          <Sparkles size={12} /> Vinhack 20-Hour Hackathon Project
        </span>
        <h1 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px', lineHeight: 1.2 }}>
          CampusSync AI Engine
        </h1>
        <p style={{ color: 'var(--text-sub)', fontSize: '0.92rem', maxWidth: '740px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          Autonomous Event Social Marketing Pipeline for Campus Clubs. Convert raw poster images into multi-platform campaigns for Instagram and LinkedIn automatically.
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

      {/* Feature Grid (4 Distinct Colorful Curved Cards as requested) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {/* Box 1: Blue Card */}
        <div className="curved-card curved-card-blue" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(37, 99, 235, 0.15)',
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <Cpu size={22} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            1. Vision LLM & OpenCV
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', lineHeight: 1.5, flex: 1 }}>
            Extracts event title, date, venue, & vibe while smart-cropping 1:1 Feed images automatically.
          </p>
        </div>

        {/* Box 2: Purple Card */}
        <div className="curved-card curved-card-purple" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(124, 58, 237, 0.15)',
            color: '#7c3aed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <Layers size={22} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            2. Dual Campaign Generator
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', lineHeight: 1.5, flex: 1 }}>
            Crafts carousel scripts, emoji captions, and hashtags for Instagram + professional LinkedIn copy.
          </p>
        </div>

        {/* Box 3: Emerald Card */}
        <div className="curved-card curved-card-emerald" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <ShieldCheck size={22} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            3. Peak Hours Scheduler
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', lineHeight: 1.5, flex: 1 }}>
            Schedule posts for immediate dispatch or peak student engagement hours automatically.
          </p>
        </div>

        {/* Box 4: Amber Card */}
        <div className="curved-card curved-card-amber" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <BarChart3 size={22} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            4. 2-Hour Traction Oversight
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-sub)', lineHeight: 1.5, flex: 1 }}>
            Monitors engagement metrics after publication and triggers dynamic AI auto-refresh if likes are low.
          </p>
        </div>
      </div>
    </div>
  );
}

