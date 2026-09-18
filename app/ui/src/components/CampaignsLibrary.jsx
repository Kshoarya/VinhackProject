import React from 'react';
import { Layers, Instagram, Linkedin, Calendar, MapPin, Sparkles, Hash } from 'lucide-react';

export default function CampaignsLibrary({ campaignData, posterData, postStatuses }) {
  const campaignsList = campaignData ? [
    {
      id: 'cmp-1001',
      title: posterData?.event_title || 'CampusSync 2026 Hackathon',
      date: posterData?.event_date || 'Sept 20, 2026 • 09:00 AM',
      venue: posterData?.event_venue || 'Main Auditorium',
      vibe: posterData?.vibe || 'High Energy & Technical',
      instagram_caption: campaignData.instagram_caption,
      linkedin_post: campaignData.linkedin_post,
      slides: campaignData.instagram_carousel_slides,
      hashtags: campaignData.instagram_hashtags
    }
  ] : [
    {
      id: 'cmp-1001',
      title: 'CampusSync 2026 Hackathon',
      date: 'Sept 20, 2026 • 09:00 AM',
      venue: 'Main Auditorium & Innovation Lab',
      vibe: 'High Energy, Technical & Competitive',
      instagram_caption: '🔥 CampusSync 2026 Hackathon is here! Join us for an adrenaline-fueled 20-hour building sprint.',
      linkedin_post: 'We are thrilled to announce CampusSync 2026 Hackathon, designed to foster rapid prototyping and engineering excellence.',
      slides: ['Slide 1: Overview', 'Slide 2: Schedule', 'Slide 3: Prizes & Perks', 'Slide 4: Venue Map'],
      hashtags: ['#CampusSync', '#Hackathon2026', '#BuildWithAI']
    },
    {
      id: 'cmp-1002',
      title: 'AI & Robotics Tech Expo',
      date: 'Oct 05, 2026 • 02:00 PM',
      venue: 'Engineering Block Plaza',
      vibe: 'Inspiring & Futuristic',
      instagram_caption: '🤖 Calling all tech enthusiasts! Experience live AI robotics demonstrations and hands-on workshops.',
      linkedin_post: 'Announcing the Annual AI & Robotics Tech Expo. Network with industry experts and student innovators.',
      slides: ['Slide 1: Expo Intro', 'Slide 2: Keynote Speakers', 'Slide 3: Demos'],
      hashtags: ['#RoboticsExpo', '#AITechnology', '#Innovation']
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto', paddingRight: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
            Campaigns Library ({campaignsList.length})
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Overview of created social media campaigns, carousel slide decks, and AI prompt outputs.
          </p>
        </div>
        <span className="pill-badge pill-badge-blue">
          <Layers size={13} /> Active Campaign Storage
        </span>
      </div>

      {/* Asymmetrical Curved Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {campaignsList.map((cmp, idx) => {
          const cardClass = idx % 2 === 0 ? 'curved-card-blue' : 'curved-card-purple';
          return (
            <div key={cmp.id} className={`curved-card ${cardClass}`} style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="pill-badge pill-badge-emerald" style={{ fontSize: '0.65rem' }}>
                  <Sparkles size={11} /> {cmp.vibe}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>ID: {cmp.id}</span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
                {cmp.title}
              </h3>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} color="var(--accent-blue)" /> {cmp.date}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} color="var(--accent-purple)" /> {cmp.venue}
                </div>
              </div>

              {/* Instagram Copy Snippet */}
              <div style={{ background: 'var(--card-white)', padding: '10px', borderRadius: '12px', marginBottom: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ec4899', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Instagram size={12} /> Instagram Caption
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {cmp.instagram_caption}
                </div>
              </div>

              {/* LinkedIn Copy Snippet */}
              <div style={{ background: 'var(--card-white)', padding: '10px', borderRadius: '12px', marginBottom: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0a66c2', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Linkedin size={12} /> LinkedIn Copy
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {cmp.linkedin_post}
                </div>
              </div>

              {/* Hashtag Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {cmp.hashtags?.map((t, i) => (
                  <span key={i} style={{ fontSize: '0.65rem', color: 'var(--accent-blue)', fontWeight: 700 }}>{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
