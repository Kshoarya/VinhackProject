import React, { useState } from 'react';
import {
  BarChart3, RefreshCw, CheckCircle2, Instagram, Linkedin,
  Download, TrendingUp, TrendingDown, ExternalLink, FileText
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
      {/* Dashboard Top Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Social Media Overview
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Real-time analytics across Instagram, LinkedIn & Facebook with automated AI traction oversight.
          </p>
        </div>

        <div>
          <button className="btn-primary-pill" style={{ padding: '8px 18px', fontSize: '0.82rem', borderRadius: '14px' }}>
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Top Stats Metric Row (4 Cards) */}
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

      {/* Main Grid Section: Top Performing Posts + Reports & Traction Oversight */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '16px' }}>
        {/* Top Performing Posts Table Card (Instagram, LinkedIn, Facebook only) */}
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
              <tr style={{ borderBottom: '1.5px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 700 }}>
                <th style={{ padding: '8px 4px' }}>Post</th>
                <th style={{ padding: '8px 4px' }}>Platform</th>
                <th style={{ padding: '8px 4px' }}>Reach</th>
                <th style={{ padding: '8px 4px' }}>Engagement</th>
                <th style={{ padding: '8px 4px' }}>CTR</th>
                <th style={{ padding: '8px 4px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Instagram */}
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontWeight: 600 }}>
                <td style={{ padding: '14px 4px', color: 'var(--text-main)', fontWeight: 700 }}>CampusSync Hackathon Reel</td>
                <td style={{ padding: '14px 4px' }}><span className="platform-badge platform-badge-ig"><Instagram size={12} /> Instagram</span></td>
                <td style={{ padding: '14px 4px', color: 'var(--text-sub)' }}>248K</td>
                <td style={{ padding: '14px 4px', color: 'var(--text-sub)' }}>14.2K</td>
                <td style={{ padding: '14px 4px', color: 'var(--accent-blue)', fontWeight: 700 }}>4.8%</td>
                <td style={{ padding: '14px 4px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginRight: '6px' }}><TrendingUp size={14} /></button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ExternalLink size={14} /></button>
                </td>
              </tr>
              {/* LinkedIn */}
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.82rem', fontWeight: 600 }}>
                <td style={{ padding: '14px 4px', color: 'var(--text-main)', fontWeight: 700 }}>Club President Thought Post</td>
                <td style={{ padding: '14px 4px' }}><span className="platform-badge platform-badge-li"><Linkedin size={12} /> LinkedIn</span></td>
                <td style={{ padding: '14px 4px', color: 'var(--text-sub)' }}>122K</td>
                <td style={{ padding: '14px 4px', color: 'var(--text-sub)' }}>6.3K</td>
                <td style={{ padding: '14px 4px', color: 'var(--accent-blue)', fontWeight: 700 }}>3.9%</td>
                <td style={{ padding: '14px 4px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginRight: '6px' }}><TrendingUp size={14} /></button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ExternalLink size={14} /></button>
                </td>
              </tr>
              {/* Facebook */}
              <tr style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                <td style={{ padding: '14px 4px', color: 'var(--text-main)', fontWeight: 700 }}>Robotics Showcase Video</td>
                <td style={{ padding: '14px 4px' }}><span className="platform-badge platform-badge-fb">Facebook</span></td>
                <td style={{ padding: '14px 4px', color: 'var(--text-sub)' }}>176K</td>
                <td style={{ padding: '14px 4px', color: 'var(--text-sub)' }}>8.9K</td>
                <td style={{ padding: '14px 4px', color: 'var(--accent-blue)', fontWeight: 700 }}>3.2%</td>
                <td style={{ padding: '14px 4px', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginRight: '6px' }}><TrendingUp size={14} /></button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><ExternalLink size={14} /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reports & 2-Hour Traction Oversight Card */}
        <div className="curved-card curved-card-white" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <FileText size={18} color="var(--accent-purple)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Traction Oversight
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {defaultStatuses.map((post) => (
                <div key={post.post_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--card-purple)', padding: '10px 14px', borderRadius: '12px', border: '1.5px solid var(--border-pop)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {post.platform === 'instagram' ? <Instagram size={15} color="#db2777" /> : <Linkedin size={15} color="#0284c7" />}
                    <div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>{post.post_id}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>{post.likes_count.toLocaleString()} Likes</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRefresh(post.post_id)}
                    className="btn-secondary-pill"
                    disabled={isRefreshing}
                    style={{ padding: '5px 10px', fontSize: '0.68rem' }}
                  >
                    <RefreshCw size={11} className={isRefreshing ? 'spin' : ''} /> Refresh
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-sub)', fontWeight: 700 }}>
            <span>Automated Performance Report</span>
            <button className="btn-secondary-pill" style={{ padding: '4px 10px', fontSize: '0.7rem' }}>
              <Download size={12} /> PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


