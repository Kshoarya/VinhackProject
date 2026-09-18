import React, { useState } from 'react';
import { Lock, User, Building2, Sparkles, LogIn, UserPlus, KeyRound, ArrowLeft } from 'lucide-react';

export default function Login({ initialMode = 'login', onLoginSuccess, onBackToIntro }) {
  const [authMode] = useState(initialMode);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clubName, setClubName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fillDemoCredentials = () => {
    setUsername('campustech');
    setPassword('tech2026pass');
    setClubName('Campus Tech Club');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg("Please fill in username and password!");
      return;
    }

    if (authMode === 'signup' && !clubName) {
      setErrorMsg("Please enter your official Club Name!");
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          club_name: clubName || username
        })
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setIsLoading(false);
        setErrorMsg(resData.detail || resData.error || "Authentication failed! Please check your credentials.");
        return;
      }

      setIsLoading(false);
      onLoginSuccess(resData.club);
    } catch (err) {
      setIsLoading(false);
      setErrorMsg("Could not connect to authentication server. Please check backend.");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
      <div className="curved-card curved-card-white" style={{ width: '100%', maxWidth: '440px', padding: '24px', position: 'relative' }}>
        {/* Back to Intro Button */}
        <button
          type="button"
          onClick={onBackToIntro}
          className="btn-secondary-pill"
          style={{ padding: '4px 12px', fontSize: '0.75rem', marginBottom: '14px' }}
        >
          <ArrowLeft size={14} /> Back to Intro
        </button>

        {/* Title Block in Curved Purple Card */}
        <div className="curved-card curved-card-purple" style={{ textAlign: 'center', padding: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>
            <KeyRound size={22} color="#ffffff" />
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            {authMode === 'login' ? 'Club Account Login' : 'Register New Club Account'}
          </h2>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.75rem', marginTop: '2px' }}>
            {authMode === 'login' ? 'Enter existing credentials verified against Supabase DB' : 'Create & store new club credentials in Supabase DB'}
          </p>
        </div>

        {errorMsg && (
          <div className="curved-card curved-card-coral" style={{ padding: '10px 14px', fontSize: '0.8rem', marginBottom: '14px', textAlign: 'center', color: '#e11d48', fontWeight: 700 }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {authMode === 'signup' && (
            <div className="curved-card curved-card-emerald" style={{ padding: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px', color: 'var(--text-main)' }}>
                Official Club Name *
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 size={16} color="var(--accent-purple)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="e.g. Campus Tech Club"
                  style={{
                    width: '100%',
                    background: 'var(--card-white)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '9px 12px 9px 38px',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div className="curved-card curved-card-blue" style={{ padding: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px', color: 'var(--text-main)' }}>
              Username *
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="var(--accent-blue)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. campustech"
                style={{
                  width: '100%',
                  background: 'var(--card-white)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '9px 12px 9px 38px',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div className="curved-card curved-card-amber" style={{ padding: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px', color: 'var(--text-main)' }}>
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#d97706" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  background: 'var(--card-white)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '9px 12px 9px 38px',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {authMode === 'login' && (
            <div className="curved-card curved-card-emerald" style={{ padding: '12px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px', color: 'var(--text-main)' }}>
                Club Name Override (Optional)
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 size={16} color="var(--accent-purple)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="e.g. Campus Tech Club"
                  style={{
                    width: '100%',
                    background: 'var(--card-white)',
                    color: 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '9px 12px 9px 38px',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={fillDemoCredentials}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-blue)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={12} /> Auto-Fill Demo Credentials
            </button>
          </div>

          <button
            type="submit"
            className="btn-primary-pill"
            disabled={isLoading}
            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem', marginTop: '4px' }}
          >
            {authMode === 'login' ? <LogIn size={16} /> : <UserPlus size={16} />}
            {isLoading ? "Authenticating..." : authMode === 'login' ? "Login to Dashboard" : "Register & Save Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
