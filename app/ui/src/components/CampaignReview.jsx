import React, { useState } from 'react';
import { Instagram, Linkedin, Copy, Check, Send, Crop, Calendar, Clock, MapPin, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function CampaignReview({ posterData, campaignData, uploadedFiles, onConfirmPublish, isPublishing }) {
  const [platformTab, setPlatformTab] = useState('instagram'); // 'instagram' | 'linkedin'
  const [copiedField, setCopiedField] = useState(null);

  // Editable Copy State
  const [instagramCaption, setInstagramCaption] = useState(campaignData?.instagram_caption || '');
  const [linkedinPost, setLinkedinPost] = useState(campaignData?.linkedin_post || '');

  // Scheduler State
  const [postMode, setPostMode] = useState('immediate'); // 'immediate' | 'scheduled'
  
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  const [scheduledDate, setScheduledDate] = useState(tomorrowStr);
  const [scheduledTime, setScheduledTime] = useState('18:00');

  // Preview Image URL
  const imagePreviewUrl = uploadedFiles && uploadedFiles.length > 0 && uploadedFiles[0] instanceof File
    ? URL.createObjectURL(uploadedFiles[0])
    : null;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePublish = () => {
    const scheduledISO = postMode === 'scheduled' ? `${scheduledDate}T${scheduledTime}:00` : '';
    const updatedCampaign = {
      ...campaignData,
      instagram_caption: instagramCaption,
      linkedin_post: linkedinPost,
      scheduled_at: scheduledISO
    };
    onConfirmPublish(updatedCampaign);
  };

  return (
    <div className="curved-card curved-card-white" style={{ maxWidth: '980px', margin: '0 auto', padding: '24px' }}>
      {/* Header Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Campaign Customizer & Automated Scheduler
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Review AI-generated caption copy, preview final poster artwork, and schedule post dispatch timing.
          </p>
        </div>

        {/* Platform Toggle Pills */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--card-blue)', padding: '4px', borderRadius: '14px', border: '1.5px solid var(--card-blue-border)' }}>
          <button
            onClick={() => setPlatformTab('instagram')}
            style={{
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: 800,
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: platformTab === 'instagram' ? '#db2777' : 'transparent',
              color: platformTab === 'instagram' ? '#ffffff' : 'var(--text-main)',
              boxShadow: platformTab === 'instagram' ? '0 2px 8px rgba(219, 39, 119, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Instagram size={15} color={platformTab === 'instagram' ? '#ffffff' : '#db2777'} /> Instagram Content
          </button>
          <button
            onClick={() => setPlatformTab('linkedin')}
            style={{
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: 800,
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: platformTab === 'linkedin' ? '#0284c7' : 'transparent',
              color: platformTab === 'linkedin' ? '#ffffff' : 'var(--text-main)',
              boxShadow: platformTab === 'linkedin' ? '0 2px 8px rgba(2, 132, 199, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Linkedin size={15} color={platformTab === 'linkedin' ? '#ffffff' : '#0284c7'} /> LinkedIn Post
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTAINER: Image Poster on Left, Caption Editor on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', marginBottom: '18px' }}>
        {/* Left Side: Final Poster Image Card */}
        <div className="curved-card curved-card-blue" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ImageIcon size={16} color="var(--accent-blue)" /> Final Event Poster
              </label>
              <span className="pill-badge pill-badge-blue" style={{ fontSize: '0.68rem' }}>
                <Crop size={11} /> 1:1 Smart Cropped
              </span>
            </div>

            {/* Poster Image Frame */}
            <div style={{
              borderRadius: '14px',
              overflow: 'hidden',
              background: 'var(--card-white)',
              border: '1px solid var(--border-subtle)',
              height: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)'
            }}>
              {imagePreviewUrl ? (
                <img
                  src={imagePreviewUrl}
                  alt="Final Smart Cropped Poster"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <ImageIcon size={40} color="var(--accent-blue)" style={{ marginBottom: '8px' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {posterData?.event_title || 'CampusSync Hackathon 2026'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    OpenCV Smart Crop 1:1 Feed Ready
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Extracted Parameters Pill Details */}
          <div style={{ background: 'var(--card-white)', padding: '10px 12px', borderRadius: '12px', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-sub)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Sparkles size={12} color="var(--accent-purple)" /> {posterData?.event_title || 'CampusSync 2026 Hackathon'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} color="var(--accent-blue)" /> {posterData?.event_date || 'Sept 20, 2026 • 09:00 AM IST'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} color="var(--accent-purple)" /> {posterData?.event_venue || 'Innovation Hall B'}
            </div>
          </div>
        </div>

        {/* Right Side: Caption Editor (Instagram or LinkedIn depending on tab) */}
        {platformTab === 'instagram' ? (
          <div className="curved-card curved-card-coral" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Instagram Caption Copy (Editable)
                </label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(instagramCaption, 'caption')}
                  className="btn-secondary-pill"
                  style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                >
                  {copiedField === 'caption' ? <Check size={12} color="#059669" /> : <Copy size={12} color="var(--accent-blue)" />}
                  {copiedField === 'caption' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <textarea
                rows={9}
                className="custom-input"
                value={instagramCaption}
                onChange={(e) => setInstagramCaption(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  resize: 'none',
                  marginBottom: '10px'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {(campaignData?.instagram_hashtags || ['#CampusSync', '#Hackathon', '#BuildWithAI', '#CampusTech']).map((tag, idx) => (
                <span key={idx} className="pill-badge pill-badge-blue" style={{ fontSize: '0.7rem' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="curved-card curved-card-blue" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  LinkedIn Announcement Copy (Editable)
                </label>
                <button
                  type="button"
                  onClick={() => copyToClipboard(linkedinPost, 'linkedin')}
                  className="btn-secondary-pill"
                  style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                >
                  {copiedField === 'linkedin' ? <Check size={12} color="#059669" /> : <Copy size={12} color="var(--accent-blue)" />}
                  {copiedField === 'linkedin' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <textarea
                rows={11}
                className="custom-input"
                value={linkedinPost}
                onChange={(e) => setLinkedinPost(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  resize: 'none'
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* POST SCHEDULER CONTROL BOX */}
      <div className="curved-card curved-card-amber" style={{ padding: '18px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: postMode === 'scheduled' ? '14px' : '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="#d97706" />
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Publication Timing:
            </span>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <input type="radio" name="sch_mode" checked={postMode === 'immediate'} onChange={() => setPostMode('immediate')} style={{ accentColor: 'var(--accent-blue)', width: '16px', height: '16px' }} />
              Post Immediately
            </label>

            <label style={{ fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
              <input type="radio" name="sch_mode" checked={postMode === 'scheduled'} onChange={() => setPostMode('scheduled')} style={{ accentColor: 'var(--accent-blue)', width: '16px', height: '16px' }} />
              Schedule for Peak Student Hours
            </label>
          </div>
        </div>

        {/* Dropdown Calendar Date & Time Selectors */}
        {postMode === 'scheduled' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: 'var(--card-white)',
            padding: '14px 18px',
            borderRadius: '14px',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <Calendar size={18} color="var(--accent-blue)" />
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Select Date:</label>
              <input
                type="date"
                className="custom-input"
                min={todayStr}
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.85rem', cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <Clock size={18} color="var(--accent-purple)" />
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Select Peak Time:</label>
              <select
                className="custom-input"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                <option value="09:00">09:00 AM — Morning Announcement</option>
                <option value="12:00">12:00 PM — Lunch Break Peak</option>
                <option value="15:00">03:00 PM — Afternoon Class Break</option>
                <option value="18:00">06:00 PM — Evening Campus Peak ⭐</option>
                <option value="21:00">09:00 PM — Night Student Engagement</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="pill-badge pill-badge-blue" style={{ fontSize: '0.78rem', padding: '6px 14px' }}>
          <Sparkles size={14} /> {postMode === 'scheduled' ? `Scheduled for ${scheduledDate} at ${scheduledTime}` : 'Immediate Social Dispatch Mode'}
        </span>

        <button
          onClick={handlePublish}
          className="btn-primary-pill"
          disabled={isPublishing}
          style={{ padding: '12px 30px', fontSize: '0.98rem' }}
        >
          <Send size={18} /> {isPublishing ? 'Publishing Post...' : postMode === 'scheduled' ? 'Schedule Campaign' : 'Confirm & Publish Now'}
        </button>
      </div>
    </div>
  );
}


