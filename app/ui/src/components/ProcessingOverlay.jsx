import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle2, Loader2, Database, Crop, Sparkles } from 'lucide-react';

export default function ProcessingOverlay() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const pipelineStages = [
    { title: 'OpenCV Smart Cropper', desc: 'Generating 1:1 Feed Smart Crops', icon: Crop },
    { title: 'Vision LLM Parser', desc: 'Extracting Title, Date, Venue & Vibe', icon: Cpu },
    { title: 'MCP Club Memory Query', desc: 'Fetching Brand Tone & Audience Guidelines', icon: Sparkles },
    { title: 'Dual Caption Generator', desc: 'Crafting Instagram & LinkedIn Posts', icon: Sparkles },
    { title: 'Supabase DB Sync', desc: 'Persisting Ingestion & Campaign Records', icon: Database },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev < pipelineStages.length - 1 ? prev + 1 : prev));
    }, 700);

    return () => clearInterval(interval);
  }, [pipelineStages.length]);

  return (
    <div className="curved-card curved-card-white" style={{ maxWidth: '680px', margin: '40px auto', padding: '36px', textAlign: 'center' }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)'
      }}>
        <Loader2 size={32} color="#ffffff" style={{ animation: 'spin 1.5s linear infinite' }} />
      </div>

      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>

      <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
        AI Campaign Pipeline Processing...
      </h3>
      <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginBottom: '28px' }}>
        Running OpenCV Smart Crop, Vision LLM Extraction, and Multi-Platform Prompting
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        {pipelineStages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < activeStepIndex;
          const isCurrent = idx === activeStepIndex;

          return (
            <div
              key={idx}
              className={`curved-card ${isCurrent ? 'curved-card-blue' : isDone ? 'curved-card-emerald' : 'curved-card-white'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 18px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                color: isDone ? '#059669' : isCurrent ? 'var(--accent-blue)' : 'var(--text-muted)'
              }}>
                {isDone ? <CheckCircle2 size={22} /> : <Icon size={22} />}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: 'var(--text-main)'
                }}>
                  {stage.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>
                  {stage.desc}
                </div>
              </div>

              {isCurrent && (
                <span className="pill-badge pill-badge-blue">
                  Processing
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

