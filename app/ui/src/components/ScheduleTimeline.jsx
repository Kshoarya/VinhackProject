import React from 'react';
import { Calendar, Clock, Instagram, Linkedin, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function ScheduleTimeline({ postStatuses }) {
  const scheduleItems = postStatuses?.length > 0 ? postStatuses : [
    {
      post_id: 'ig_post_9876',
      platform: 'instagram',
      status: 'scheduled',
      published_at: '2026-09-20T18:00:00',
      likes_count: 0,
      needs_refresh: false
    },
    {
      post_id: 'li_post_5432',
      platform: 'linkedin',
      status: 'scheduled',
      published_at: '2026-09-20T18:00:00',
      likes_count: 0,
      needs_refresh: false
    },
    {
      post_id: 'ig_post_1102',
      platform: 'instagram',
      status: 'published',
      published_at: '2026-09-18T12:00:00',
      likes_count: 38,
      needs_refresh: false
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto', paddingRight: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Post Schedule Timeline ({scheduleItems.length})
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            List of scheduled publication times across student peak engagement hours.
          </p>
        </div>
        <span className="pill-badge pill-badge-emerald">
          <Calendar size={13} /> Peak Hours Queue Active
        </span>
      </div>

      {/* Schedule Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {scheduleItems.map((item, idx) => {
          const isIg = item.platform === 'instagram';
          const isSched = item.status === 'scheduled';
          const dateObj = new Date(item.published_at);
          const formattedDate = isNaN(dateObj.getTime()) ? item.published_at : dateObj.toLocaleString();

          return (
            <div
              key={idx}
              className={`curved-card ${isIg ? 'curved-card-coral' : 'curved-card-blue'}`}
              style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '14px',
                  background: 'var(--card-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-subtle)'
                }}>
                  {isIg ? <Instagram size={22} color="#ec4899" /> : <Linkedin size={22} color="#0a66c2" />}
                </div>

                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Post ID: {item.post_id} ({isIg ? 'Instagram' : 'LinkedIn'})
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <Clock size={13} color="var(--accent-blue)" /> Scheduled / Published: <strong>{formattedDate}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span className={`pill-badge ${isSched ? 'pill-badge-blue' : 'pill-badge-emerald'}`}>
                  {isSched ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                  {item.status.toUpperCase()}
                </span>

                <div style={{ textAlign: 'right', minWidth: '70px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-blue)' }}>
                    {item.likes_count} Likes
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
