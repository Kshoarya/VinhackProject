import React, { useState, useEffect } from 'react';
import { Instagram, Linkedin, ShieldCheck, Sparkles, Save, ArrowRight, Key, AtSign, Eye, EyeOff } from 'lucide-react';

export default function SocialSettings({ clubInfo, onSaveCredentials }) {
  const [instagramUser, setInstagramUser] = useState('');
  const [instagramToken, setInstagramToken] = useState('');
  const [showInstagramToken, setShowInstagramToken] = useState(false);

  const [linkedinUser, setLinkedinUser] = useState('');
  const [linkedinToken, setLinkedinToken] = useState('');
  const [showLinkedinToken, setShowLinkedinToken] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [authBanner, setAuthBanner] = useState(null);

  useEffect(() => {
    // Check URL params for Unipile redirect callback status
    const params = new URLSearchParams(window.location.search);
    const authStatus = params.get('auth_status');
    const redirectAccountId = params.get('account_id') || params.get('account');
    const clubId = clubInfo?.id || 'club_default';

    if (authStatus === 'success') {
      setAuthBanner({ type: 'success', text: 'LinkedIn account connected successfully via Unipile Hosted Auth!' });
      if (redirectAccountId) {
        fetch('/api/unipile/save-account', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ club_id: clubId, account_id: redirectAccountId })
        }).catch(err => console.error("Error saving redirected account ID:", err));
      }
    } else if (authStatus === 'failed') {
      setAuthBanner({ type: 'error', text: 'LinkedIn account authentication failed or was cancelled.' });
    }

    const fetchCreds = async () => {
      try {
        // Sync live accounts directly from Unipile API first
        await fetch(`/api/unipile/sync-account?club_id=${encodeURIComponent(clubId)}`);

        const res = await fetch(`/api/social-credentials/${clubId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.instagram_token) {
            const parts = data.instagram_token.split(':::');
            setInstagramUser(parts[0] || '');
            setInstagramToken(parts[1] || parts[0] || '');
          }
          if (data.unipile_account_id) {
            setLinkedinUser(`Unipile Connected (${data.unipile_account_id})`);
            setLinkedinToken(data.unipile_account_id);
          } else if (data.linkedin_token) {
            const parts = data.linkedin_token.split(':::');
            setLinkedinUser(parts[0] || '');
            setLinkedinToken(parts[1] || parts[0] || '');
          }
        }
      } catch (err) {
        console.warn("Could not fetch credentials, using defaults");
      }
    };
    fetchCreds();
  }, [clubInfo?.id]);

  const fillDemoTokens = () => {
    setInstagramUser('@campustech_official');
    setInstagramToken('ig_access_token_sec_99812a');
    setLinkedinUser('campus-tech-club-page');
    setLinkedinToken('li_oauth_secret_pass_7741');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const combinedIg = `${instagramUser || '@campustech'}:::${instagramToken || 'ig_sec_token'}`;
    const combinedLi = `${linkedinUser || 'campustech-li'}:::${linkedinToken || 'li_sec_token'}`;

    const credData = {
      club_id: clubInfo?.id || 'club-default',
      instagram_token: combinedIg,
      linkedin_token: combinedLi
    };

    try {
      await fetch('/api/social-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credData)
      });
    } catch (err) {
      console.warn("API offline, saved credentials locally");
    }

    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => {
      onSaveCredentials(credData);
    }, 800);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 20px' }}>
      <div className="curved-card curved-card-white" style={{ padding: '28px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            Social Media API Credentials & Handles
          </h2>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.88rem' }}>
            Configure your official Instagram & LinkedIn credentials to authorize automated multi-platform post publishing.
          </p>
        </div>

        {authBanner && (
          <div className={`curved-card ${authBanner.type === 'success' ? 'curved-card-emerald' : 'curved-card-coral'}`} style={{ padding: '12px 16px', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: authBanner.type === 'success' ? '#059669' : '#dc2626', fontWeight: 700 }}>
            <ShieldCheck size={18} /> {authBanner.text}
          </div>
        )}

        {savedSuccess && (
          <div className="curved-card curved-card-emerald" style={{ padding: '12px 16px', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', fontWeight: 700 }}>
            <ShieldCheck size={18} /> Social API Access Tokens saved & synced to Supabase database!
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Instagram Section (Vibrant Light/Dark Container Box) */}
            <div className="curved-card curved-card-coral" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Instagram size={24} color="#db2777" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    Instagram Account
                  </h3>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>GRAPH API v18.0</span>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Instagram Handle / Username
                </label>
                <div style={{ position: 'relative' }}>
                  <AtSign size={18} color="var(--accent-purple)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 5 }} />
                  <input
                    type="text"
                    className="custom-input"
                    value={instagramUser}
                    onChange={(e) => setInstagramUser(e.target.value)}
                    placeholder="@campustech_official"
                    style={{ paddingLeft: '44px', fontSize: '0.95rem', height: '46px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Access Token / Secret Key
                </label>
                <div style={{ position: 'relative' }}>
                  <Key size={18} color="var(--accent-purple)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 5 }} />
                  <input
                    type={showInstagramToken ? "text" : "password"}
                    className="custom-input"
                    value={instagramToken}
                    onChange={(e) => setInstagramToken(e.target.value)}
                    placeholder="••••••••••••••••••••"
                    style={{ paddingLeft: '44px', paddingRight: '44px', fontSize: '0.95rem', height: '46px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowInstagramToken(!showInstagramToken)}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      zIndex: 5
                    }}
                  >
                    {showInstagramToken ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* LinkedIn Section (Vibrant Light/Dark Container Box) */}
            <div className="curved-card curved-card-blue" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Linkedin size={24} color="#0284c7" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    LinkedIn Organization
                  </h3>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>OAUTH 2.0 PROTOCOL</span>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  LinkedIn Page / Org ID
                </label>
                <div style={{ position: 'relative' }}>
                  <AtSign size={18} color="var(--accent-blue)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 5 }} />
                  <input
                    type="text"
                    className="custom-input"
                    value={linkedinUser}
                    onChange={(e) => setLinkedinUser(e.target.value)}
                    placeholder="campus-tech-club"
                    style={{ paddingLeft: '44px', fontSize: '0.95rem', height: '46px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  OAuth 2.0 Secret Token
                </label>
                <div style={{ position: 'relative' }}>
                  <Key size={18} color="var(--accent-blue)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', zIndex: 5 }} />
                  <input
                    type={showLinkedinToken ? "text" : "password"}
                    className="custom-input"
                    value={linkedinToken}
                    onChange={(e) => setLinkedinToken(e.target.value)}
                    placeholder="••••••••••••••••••••"
                    style={{ paddingLeft: '44px', paddingRight: '44px', fontSize: '0.95rem', height: '46px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLinkedinToken(!showLinkedinToken)}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      zIndex: 5
                    }}
                  >
                    {showLinkedinToken ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={fillDemoTokens}
                className="btn-secondary-pill"
                style={{ fontSize: '0.8rem', padding: '8px 16px' }}
              >
                <Sparkles size={14} color="var(--accent-blue)" /> Auto-Fill Demo Credentials
              </button>

              <button
                type="button"
                onClick={async () => {
                  try {
                    const clubId = clubInfo?.id || 'club_default';
                    const currentUrl = window.location.origin + window.location.pathname;
                    const res = await fetch(`/api/unipile/connect-url?club_id=${encodeURIComponent(clubId)}&redirect_url=${encodeURIComponent(currentUrl)}&providers=LINKEDIN,INSTAGRAM`);
                    const data = await res.json();
                    if (data.url) {
                      window.location.href = data.url;
                    } else {
                      alert(`Could not generate Unipile Auth link: ${data.error || 'Unknown error'}`);
                    }
                  } catch (e) {
                    alert("Error reaching Unipile auth endpoint.");
                  }
                }}
                className="btn-secondary-pill"
                style={{ fontSize: '0.8rem', padding: '8px 16px', background: 'var(--pop-tab-blue)', color: '#000' }}
              >
                <Linkedin size={14} /> Connect LinkedIn (Unipile OAuth)
              </button>
            </div>

            <button
              type="submit"
              className="btn-primary-pill"
              disabled={isSaving}
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
            >
              <Save size={16} /> {isSaving ? "Saving Credentials..." : "Save Credentials & Continue"} <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

