import React, { useState } from 'react';
import {
  BarChart3, RefreshCw, CheckCircle2, AlertTriangle, Instagram, Linkedin,
  Clock, Bell, Settings, Download, TrendingUp, TrendingDown, Share2, ExternalLink,
  Users, Eye, PieChart, FileText, Sparkles, Layers
} from 'lucide-react';

export default function PerformanceTracker({ postStatuses, onTriggerCheck }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const defaultStatuses = postStatuses?.length > 0 ? postStatuses : [
    {
      post_id: 'ig_post_9876',
      platform: 'instagram',
      status: 'published',
      published_at: new Date().toISOString(),
      likes_count: 14200,
      needs_refresh: false
    },
    {
      post_id: 'li_post_5432',
      platform: 'linkedin',
      status: 'published',
      published_at: new Date().toISOString(),
      likes_count: 6300,
      needs_refresh: true
    }
  ];

  const handleRefresh = async (postId) => {
    setIsRefreshing(true);
    if (onTriggerCheck) await onTriggerCheck(postId);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <div style={{ maxWidth: '1150px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto', paddingRight: '4px' }}>
      {/* Dashboard Top Header Bar (Image 4 Style) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Social Media Overview
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Real-time analytics, top performing campaign posts, and automated AI traction oversight.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn-secondary-pill" style={{ padding: '8px 12px', borderRadius: '12px' }}>
            <Bell size={16} />
          </button>
          <button className="btn-secondary-pill" style={{ padding: '8px 12px', borderRadius: '12px' }}>
            <Settings size={16} />
          </button>
          <button className="btn-primary-pill" style={{ padding: '8px 18px', fontSize: '0.82rem', borderRadius: '14px' }}>
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Top Stats Metric Row (4 Cards inspired by Image 4) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        {/* Metric 1 */}
        <div className="curved-card curved-card-white" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            Total Followers
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>393K</span>
            <span className="pill-badge pill-badge-emerald" style={{ fontSize: '0.7rem' }}>
              <TrendingUp size={12} /> 3.6%
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="curved-card curved-card-white" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            Total Reach
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>2.91M</span>
            <span className="pill-badge pill-badge-emerald" style={{ fontSize: '0.7rem' }}>
              <TrendingUp size={12} /> 14.2%
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="curved-card curved-card-white" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            Engagement Rate
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>5.92%</span>
            <span className="pill-badge pill-badge-coral" style={{ fontSize: '0.7rem' }}>
              <TrendingDown size={12} /> -2.1%
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="curved-card curved-card-white" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
            Total Impressions
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>7.43M</span>
            <span className="pill-badge pill-badge-emerald" style={{ fontSize: '0.7rem' }}>
              <TrendingUp size={12} /> 19.5%
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Section (Image 4 Bento Grid Layout) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '16px', marginBottom: '16px' }}>
        {/* Top Performing Posts Table Card */}
        <div className="curved-card curved-card-white" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Top Performing Posts
            </h3>
            <button className="btn-secondary-pill" style={{ padding: '5px 12px', fontSize: '0.72rem' }}>
              <Download size={12} /> Export Data
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>
                <th style={{ padding: '8px 4px' }}>Post</th>
                <th style={{ padding: '8px 4px' }}>Platform</th>
                <th style={{ padding: '8px 4px' }}>Reach</th>
                <th style={{ padding: '8px 4px' }}>Engagement</th>
                <th style={{ padding: '8px 4px' }}>CTR</th>
                <th style={{ padding: '8px 4px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontWeight: 600 }}>
                <td style={{ padding: '12px 4px', color: 'var(--text-main)', fontWeight: 700 }}>CampusSync Hackathon Reel</td>
                <td style={{ padding: '12px 4px' }}><span className="platform-badge platform-badge-ig"><Instagram size={12} /> Instagram</span></td>
                <td style={{ padding: '12px 4px', color: 'var(--text-sub)' }}>248K</td>
                <td style={{ padding: '12px 4px', color: 'var(--text-sub)' }}>14.2K</td>
                <td style={{ padding: '12px 4px', color: 'var(--accent-blue)', fontWeight: 700 }}>4.8%</td>
                <td style={{ padding: '12px 4px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginRight: '6px' }}><TrendingUp size={14} /></button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ExternalLink size={14} /></button>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontWeight: 600 }}>
                <td style={{ padding: '12px 4px', color: 'var(--text-main)', fontWeight: 700 }}>Club President Thought Post</td>
                <td style={{ padding: '12px 4px' }}><span className="platform-badge platform-badge-li"><Linkedin size={12} /> LinkedIn</span></td>
                <td style={{ padding: '12px 4px', color: 'var(--text-sub)' }}>122K</td>
                <td style={{ padding: '12px 4px', color: 'var(--text-sub)' }}>6.3K</td>
                <td style={{ padding: '12px 4px', color: 'var(--accent-blue)', fontWeight: 700 }}>3.9%</td>
                <td style={{ padding: '12px 4px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginRight: '6px' }}><TrendingUp size={14} /></button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ExternalLink size={14} /></button>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontWeight: 600 }}>
                <td style={{ padding: '12px 4px', color: 'var(--text-main)', fontWeight: 700 }}>AI Tech Expo Announcement</td>
                <td style={{ padding: '12px 4px' }}><span className="platform-badge platform-badge-x">X(Twitter)</span></td>
                <td style={{ padding: '12px 4px', color: 'var(--text-sub)' }}>98K</td>
                <td style={{ padding: '12px 4px', color: 'var(--text-sub)' }}>4.1K</td>
                <td style={{ padding: '12px 4px', color: 'var(--accent-blue)', fontWeight: 700 }}>2.6%</td>
                <td style={{ padding: '12px 4px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginRight: '6px' }}><TrendingUp size={14} /></button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ExternalLink size={14} /></button>
                </td>
              </tr>
              <tr style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                <td style={{ padding: '12px 4px', color: 'var(--text-main)', fontWeight: 700 }}>Robotics Showcase Video</td>
                <td style={{ padding: '12px 4px' }}><span className="platform-badge platform-badge-fb">Facebook</span></td>
                <td style={{ padding: '12px 4px', color: 'var(--text-sub)' }}>176K</td>
                <td style={{ padding: '12px 4px', color: 'var(--text-sub)' }}>8.9K</td>
                <td style={{ padding: '12px 4px', color: 'var(--accent-blue)', fontWeight: 700 }}>3.2%</td>
                <td style={{ padding: '12px 4px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginRight: '6px' }}><TrendingUp size={14} /></button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ExternalLink size={14} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Audience Demographics / Interaction Distribution Donut Card */}
        <div className="curved-card curved-card-white" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px' }}>
              Audience Demographics
            </h3>

            {/* Donut Visual Representation */}
            <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="130" height="130" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border-subtle)" strokeWidth="3.8" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3b82f6" strokeWidth="3.8" strokeDasharray="45, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f43f5e" strokeWidth="3.8" strokeDasharray="35, 100" strokeDashoffset="-45" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" strokeWidth="3.8" strokeDasharray="20, 100" strokeDashoffset="-80" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>34.5K</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Total</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '0.72rem', color: 'var(--text-sub)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> Social Media</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }}></span> Paid Ads</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Referral</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid Row (Campaign Performance, Competitor Benchmark, Traction Reports) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.1fr', gap: '16px' }}>
        {/* Card 1: Campaign Performance Progress Card */}
        <div className="curved-card curved-card-white" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>Campaign Performance</h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', fontWeight: 700, cursor: 'pointer' }}>View All</span>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>CampusSync 2026</span>
              <span className="pill-badge pill-badge-emerald" style={{ fontSize: '0.62rem', padding: '2px 8px' }}>Active</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '8px' }}>
              <div>
                <span style={{ fontWeight: 800, display: 'block', color: 'var(--text-main)' }}>890K</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Reach</span>
              </div>
              <div>
                <span style={{ fontWeight: 800, display: 'block', color: 'var(--text-main)' }}>890K</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Engagement</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 800, display: 'block', color: 'var(--accent-blue)' }}>3.7%</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Conversion Rate</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Progress</span>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>68%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border-subtle)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: '10px' }}></div>
            </div>
          </div>
        </div>

        {/* Card 2: Competitor Benchmark Card */}
        <div className="curved-card curved-card-white" style={{ padding: '18px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
            Competitor Benchmark
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', textAlign: 'left' }}>
                <th style={{ paddingBottom: '6px' }}>Brand</th>
                <th style={{ paddingBottom: '6px' }}>Followers</th>
                <th style={{ paddingBottom: '6px' }}>Engagement</th>
                <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 0', fontWeight: 700 }}>Brand A</td>
                <td style={{ color: 'var(--text-sub)' }}>512K</td>
                <td style={{ color: 'var(--text-sub)' }}>4.9%</td>
                <td style={{ color: '#059669', fontWeight: 700, textAlign: 'right' }}>+2.3%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '8px 0', fontWeight: 700 }}>Brand B</td>
                <td style={{ color: 'var(--text-sub)' }}>438K</td>
                <td style={{ color: 'var(--text-sub)' }}>5.1%</td>
                <td style={{ color: '#059669', fontWeight: 700, textAlign: 'right' }}>+3.0%</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 800, color: 'var(--accent-blue)' }}>Your Club</td>
                <td style={{ color: 'var(--text-main)', fontWeight: 700 }}>384K</td>
                <td style={{ color: 'var(--text-main)', fontWeight: 700 }}>3.9%</td>
                <td style={{ color: '#059669', fontWeight: 700, textAlign: 'right' }}>+3.1%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Card 3: Reports & 2-Hour Traction Oversight Card */}
        <div className="curved-card curved-card-white" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <FileText size={18} color="var(--accent-purple)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Reports & Traction Oversight
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {defaultStatuses.map((post) => (
              <div key={post.post_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--card-purple)', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--card-purple-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {post.platform === 'instagram' ? <Instagram size={14} color="#db2777" /> : <Linkedin size={14} color="#0284c7" />}
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>{post.post_id}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{post.likes_count} Likes</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRefresh(post.post_id)}
                  className="btn-secondary-pill"
                  disabled={isRefreshing}
                  style={{ padding: '4px 8px', fontSize: '0.68rem' }}
                >
                  <RefreshCw size={11} className={isRefreshing ? 'spin' : ''} /> Refresh
                </button>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px', fontSize: '0.75rem', color: 'var(--text-sub)' }}>
              <span>Weekly Performance Report</span>
              <button style={{ background: 'transparent', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer' }}><Download size={13} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

