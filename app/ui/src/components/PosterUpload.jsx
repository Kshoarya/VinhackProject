import React, { useState } from 'react';
import { UploadCloud, Sparkles, Image as ImageIcon, X, FileText, ArrowRight } from 'lucide-react';

export default function PosterUpload({ onStartProcess, isProcessing }) {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [rawNotes, setRawNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(f => f.type.startsWith('image/'));
    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      const newUrls = validFiles.map(f => URL.createObjectURL(f));
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) addFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const fillSampleNotes = () => {
    setRawNotes(
      "🚀 CampusSync Hackathon 2026 this Saturday, Sept 20 at 09:00 AM IST in Innovation Hall B!\n" +
      "• $500 total cash prizes & official certificates for top 3 teams\n" +
      "• Free pizza, snacks, and Red Bull all day. Registration closes Friday night!"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please upload at least one event poster image!");
      return;
    }
    onStartProcess(files, rawNotes);
  };

  return (
    <div className="curved-card curved-card-white" style={{ maxWidth: '920px', margin: '0 auto', padding: '28px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
          Upload Poster & Event Details
        </h2>
        <p style={{ color: 'var(--text-sub)', fontSize: '0.88rem' }}>
          Our AI Vision Engine extracts event titles, dates, venues, and vibe automatically while smart-cropping images.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Step 1: Distinct Colorful Container Box for Poster Upload */}
        <div className="curved-card curved-card-blue" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(37, 99, 235, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageIcon size={22} color="#2563eb" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  1. Event Poster Images (Select Multiple)
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Supports PNG, JPG, WEBP formats</span>
              </div>
            </div>

            {files.length > 0 && (
              <span className="pill-badge pill-badge-blue">
                {files.length} Poster{files.length > 1 ? 's' : ''} Uploaded
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: previewUrls.length > 0 ? '1.2fr 0.8fr' : '1fr', gap: '16px', alignItems: 'center' }}>
            {/* Interactive Dropzone Box */}
            <div
              className={`upload-dropzone ${isDragging ? 'active' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('poster-multi-file-input').click()}
              style={{
                border: '2px dashed var(--accent-blue)',
                borderRadius: '16px',
                padding: '28px 16px',
                textAlign: 'center',
                background: 'var(--card-white)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              <input
                id="poster-multi-file-input"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'rgba(37, 99, 235, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px'
              }}>
                <UploadCloud size={30} color="var(--accent-blue)" />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
                Drag & Drop Multiple Poster Images
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                or click to browse local files on your computer
              </p>
            </div>

            {/* Multiple Image Preview Thumbnails */}
            {previewUrls.length > 0 && (
              <div style={{
                background: 'var(--card-white)',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid var(--border-subtle)'
              }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px' }}>
                  Uploaded Gallery ({files.length})
                </label>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))',
                  gap: '8px',
                  maxHeight: '130px',
                  overflowY: 'auto'
                }}>
                  {previewUrls.map((url, idx) => (
                    <div
                      key={idx}
                      style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '1.5px solid var(--border-subtle)',
                        height: '70px',
                        background: '#000',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img src={url} alt={`Uploaded ${idx + 1}`} style={{ height: '70px', width: 'auto', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        style={{
                          position: 'absolute',
                          top: '3px',
                          right: '3px',
                          background: 'rgba(0,0,0,0.75)',
                          border: 'none',
                          color: '#ef4444',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Distinct Colorful Container Box for Raw Notes */}
        <div className="curved-card curved-card-purple" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(124, 58, 237, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={22} color="#7c3aed" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  2. Club President Raw Notes (Optional)
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Additional guidelines, prizes, or pizza details</span>
              </div>
            </div>

            <button
              type="button"
              onClick={fillSampleNotes}
              className="btn-secondary-pill"
              style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            >
              <Sparkles size={13} color="var(--accent-purple)" /> Auto-Fill Demo Notes
            </button>
          </div>

          <textarea
            rows={3}
            className="custom-input"
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            placeholder="e.g. Hackathon this Saturday at 10 AM in Hall B, $500 prizes, free pizza, Red Bull..."
            style={{
              width: '100%',
              fontSize: '0.92rem',
              lineHeight: 1.5,
              resize: 'none'
            }}
          />
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
          <button
            type="submit"
            className="btn-primary-pill"
            disabled={files.length === 0 || isProcessing}
            style={{ fontSize: '0.98rem', padding: '12px 30px' }}
          >
            <Sparkles size={18} /> Process & Generate AI Campaign ({files.length} Image{files.length > 1 ? 's' : ''}) <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}

