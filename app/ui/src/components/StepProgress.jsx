import React from 'react';
import { Upload, Cpu, Eye, Send } from 'lucide-react';

export default function StepProgress({ currentStep, setStep }) {
  const steps = [
    { number: 1, title: 'Upload & Input', desc: 'Poster + Raw Notes', icon: Upload },
    { number: 2, title: 'AI Processing', desc: 'OpenCV & Vision Parsing', icon: Cpu },
    { number: 3, title: 'Review & Edit', desc: 'Instagram & LinkedIn Copy', icon: Eye },
    { number: 4, title: 'Dispatch & Track', desc: 'Social Post & Analytics', icon: Send },
  ];

  return (
    <div style={{ margin: '24px auto', maxWidth: '1000px', padding: '0 20px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '12px',
        borderRadius: '16px',
        border: '1px solid var(--border-muted)'
      }}>
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.number;
          const isCompleted = currentStep > s.number;

          return (
            <div
              key={s.number}
              onClick={() => { if (isCompleted) setStep(s.number); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '12px',
                background: isActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
                cursor: isCompleted ? 'pointer' : 'default',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: isActive ? 'linear-gradient(135deg, var(--primary-blue), var(--bright-blue))' : isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#ffffff' : isCompleted ? '#34d399' : 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700
              }}>
                <Icon size={18} />
              </div>

              <div>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--text-white)' : isCompleted ? '#34d399' : 'var(--text-muted)'
                }}>
                  {s.number}. {s.title}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {s.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
