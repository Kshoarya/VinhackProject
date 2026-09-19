import React from 'react';
import { Zap, ArrowRight, Lock, UserPlus, Cpu, Layers, ShieldCheck, BarChart3 } from 'lucide-react';

export default function IntroLanding({ onGoToLogin, onGoToSignup }) {
  return (
    <div style={{ maxWidth: '960px', margin: '30px auto 0', padding: '10px 20px', position: 'relative' }}>
      
      {/* Decorative Outer Corner Colorful Circles */}
      <div style={{
        position: 'absolute',
        top: '-18px',
        left: '-12px',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'var(--pop-tab-pink)',
        border: '2.5px solid var(--border-pop)',
        boxShadow: '3px 3px 0px var(--border-pop)',
        zIndex: 10
      }} />

      <div style={{
        position: 'absolute',
        top: '-18px',
        right: '-12px',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        background: 'var(--pop-tab-blue)',
        border: '2.5px solid var(--border-pop)',
        boxShadow: '3px 3px 0px var(--border-pop)',
        zIndex: 10
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-12px',
        left: '-15px',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'var(--pop-tab-green)',
        border: '2.5px solid var(--border-pop)',
        boxShadow: '2.5px 2.5px 0px var(--border-pop)',
        zIndex: 10
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-12px',
        right: '-15px',
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: 'var(--pop-tab-purple)',
        border: '2.5px solid var(--border-pop)',
        boxShadow: '3px 3px 0px var(--border-pop)',
        zIndex: 10
      }} />

      {/* Main Hero Banner Card */}
      <div className="curved-card curved-card-white" style={{ padding: '44px 36px 36px', textAlign: 'center', marginBottom: '28px', position: 'relative' }}>
        
        {/* Floating Mini Accent Circles inside Hero Card */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '24px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: 'var(--pop-tab-yellow)',
          border: '2px solid var(--border-pop)',
          boxShadow: '2px 2px 0px var(--border-pop)'
        }} />

        <div style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'var(--pop-tab-orange)',
          border: '2px solid var(--border-pop)',
          boxShadow: '2px 2px 0px var(--border-pop)'
        }} />

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

        <h1 style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '14px', lineHeight: 1.1 }}>
          SocialFlow_Club AI Engine
        </h1>
        <p style={{ color: 'var(--text-sub)', fontSize: '1.05rem', fontWeight: 700, maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.6 }}>
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

      {/* Feature Text Boxes with Pop Theme Borders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
        {/* Box 1: Blue Tab */}
        <div className="pop-folder-card" style={{ padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
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
            Extracts event title, date, venue, & vibe while auto-cropping 1:1 Feed & 9:16 Story images automatically.
          </p>
        </div>

        {/* Box 2: Pink Tab */}
        <div className="pop-folder-card" style={{ padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
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
            Generates custom Instagram captions & carousel scripts + live LinkedIn copy using Club Vault tone guidelines.
          </p>
        </div>

        {/* Box 3: Green Tab */}
        <div className="pop-folder-card" style={{ padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          <div className="pop-folder-tab pop-tab-green">03 / DISPATCH</div>
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
            Peak Hours Dispatch
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600, lineHeight: 1.5, flex: 1 }}>
            Dispatches live posts directly to LinkedIn via Unipile API or schedules for peak student engagement hours.
          </p>
        </div>

        {/* Box 4: Purple Tab */}
        <div className="pop-folder-card" style={{ padding: '22px 18px 18px', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
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
            Monitors real-time reach & engagement metrics across platforms with automated AI traction oversight.
          </p>
        </div>
      </div>
    </div>
  );
}
