import React, { useState, useEffect } from 'react';
import LeftSidebar from './components/LeftSidebar';
import IntroLanding from './components/IntroLanding';
import Login from './components/Login';
import SocialSettings from './components/SocialSettings';
import PosterUpload from './components/PosterUpload';
import ProcessingOverlay from './components/ProcessingOverlay';
import CampaignReview from './components/CampaignReview';
import CampaignsLibrary from './components/CampaignsLibrary';
import ScheduleTimeline from './components/ScheduleTimeline';
import PerformanceTracker from './components/PerformanceTracker';
import { RefreshCw, Sun, Moon } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'
  const [activeTab, setActiveTab] = useState('creator'); // 'creator' | 'campaigns' | 'schedule' | 'account'
  const [creatorStep, setCreatorStep] = useState(0); // 0: Intro, 1: Auth, 2: Social Setup, 3: Upload, 4: AI Process, 5: Review & Schedule, 6: Oversight

  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [clubInfo, setClubInfo] = useState(null);
  const [socialCreds, setSocialCreds] = useState(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [rawNotes, setRawNotes] = useState('');
  const [posterData, setPosterData] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const [postStatuses, setPostStatuses] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleGoToLogin = () => {
    setAuthInitialMode('login');
    setCreatorStep(1);
    setActiveTab('creator');
  };

  const handleGoToSignup = () => {
    setAuthInitialMode('signup');
    setCreatorStep(1);
    setActiveTab('creator');
  };

  const handleLoginSuccess = (club) => {
    setClubInfo(club);
    setCreatorStep(2);
  };

  const handleSaveCredentials = (creds) => {
    setSocialCreds(creds);
    setCreatorStep(3);
  };

  const handleStartProcess = async (filesArray, notes) => {
    setUploadedFiles(filesArray);
    setRawNotes(notes);
    setIsProcessing(true);
    setCreatorStep(4);

    try {
      const formData = new FormData();
      filesArray.forEach((f) => formData.append('files', f));
      formData.append('raw_notes', notes);

      let pData;
      try {
        const resIngest = await fetch('/api/ingest', { method: 'POST', body: formData });
        if (resIngest.ok) pData = await resIngest.json();
      } catch (err) {
        console.warn("Backend API offline, using fallback poster data");
      }

      if (!pData) {
        const primaryName = filesArray[0]?.name || "poster.png";
        pData = {
          cropped_square_path: `uploads/cropped/${primaryName}_square.png`,
          cropped_story_path: `uploads/cropped/${primaryName}_story.png`,
          extracted_text: notes || "CAMPUSSYNC HACKATHON 2026 - Building Sprint",
          raw_notes: notes,
          event_title: "CampusSync 2026 Hackathon",
          event_date: "September 20, 2026 • 09:00 AM IST",
          event_venue: "Main Auditorium & Innovation Lab",
          vibe: "High Energy, Technical & Competitive"
        };
      }
      setPosterData(pData);

      let cData;
      try {
        const resGen = await fetch(`/api/generate?club_name=${encodeURIComponent(clubInfo?.club_name || "Campus Tech Club")}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pData)
        });
        if (resGen.ok) cData = await resGen.json();
      } catch (err) {
        console.warn("Backend API offline, using fallback campaign data");
      }

      if (!cData) {
        const hashtags = ["#CampusSync", "#Hackathon2026", "#BuildWithAI", "#CampusTech"];
        cData = {
          instagram_caption:
            `🔥 ${pData.event_title} IS FINALLY HERE!\n\n` +
            `Get ready for an adrenaline-fueled building experience. ` +
            `Join us at ${pData.event_venue} on ${pData.event_date}.\n\n` +
            `⚡ Highlights:\n${notes ? `• ${notes}\n` : ''}` +
            `⚡ Vibe: ${pData.vibe}\n` +
            `📌 Save this post & tag your team members below!\n\n` +
            `${hashtags.join(' ')}`,
          instagram_carousel_slides: [
            `Slide 1: ${pData.event_title} Overview`,
            `Slide 2: Schedule & Tracks (${pData.event_date})`,
            `Slide 3: Perks (${notes.slice(0, 40) || 'Free Pizza & Swag'})`,
            `Slide 4: Venue (${pData.event_venue})`
          ],
          instagram_hashtags: hashtags,
          linkedin_post:
            `📢 Announcement: ${pData.event_title}\n\n` +
            `We are excited to host ${pData.event_title}, designed to foster innovation, rapid prototyping, and engineering leadership.\n\n` +
            `Event Details:\n` +
            `🗓️ Date & Time: ${pData.event_date}\n` +
            `📍 Location: ${pData.event_venue}\n` +
            `${notes ? `💡 Notes: ${notes}\n` : ''}\n` +
            `Whether you are a developer, designer, or problem solver, come build future-ready solutions with us.\n\n` +
            `#CampusSync #Innovation #TechCommunity #Hackathon`,
          media_paths: [pData.cropped_square_path, pData.cropped_story_path]
        };
      }
      setCampaignData(cData);

      setTimeout(() => {
        setIsProcessing(false);
        setCreatorStep(5);
      }, 3500);

    } catch (error) {
      console.error("Error processing campaign:", error);
      setIsProcessing(false);
    }
  };

  const handleConfirmPublish = async (finalCampaign) => {
    setIsPublishing(true);
    try {
      let statuses;
      try {
        const res = await fetch('/api/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalCampaign)
        });
        if (res.ok) statuses = await res.json();
      } catch (e) {
        console.warn("Publish API offline, using mock statuses");
      }

      if (!statuses) {
        const isSched = Boolean(finalCampaign.scheduled_at);
        statuses = [
          {
            post_id: `ig_post_${Math.floor(1000 + Math.random() * 9000)}`,
            platform: 'instagram',
            status: isSched ? 'scheduled' : 'published',
            published_at: isSched ? finalCampaign.scheduled_at : new Date().toISOString(),
            likes_count: isSched ? 0 : 24,
            needs_refresh: false
          },
          {
            post_id: `li_post_${Math.floor(1000 + Math.random() * 9000)}`,
            platform: 'linkedin',
            status: isSched ? 'scheduled' : 'published',
            published_at: isSched ? finalCampaign.scheduled_at : new Date().toISOString(),
            likes_count: isSched ? 0 : 12,
            needs_refresh: false
          }
        ];
      }

      setPostStatuses(statuses);
      setIsPublishing(false);
      setCreatorStep(6);
    } catch (err) {
      console.error("Publish error:", err);
      setIsPublishing(false);
    }
  };

  const handleTriggerCheck = async (postId) => {
    try {
      const res = await fetch(`/api/tracker/${postId}`);
      if (res.ok) {
        const updated = await res.json();
        setPostStatuses((prev) => prev.map((p) => (p.post_id === postId ? updated : p)));
      }
    } catch (e) {
      console.warn("Tracker API offline");
    }
  };

  const handleLogout = () => {
    setClubInfo(null);
    setCreatorStep(0);
  };

  const showSidebar = Boolean(clubInfo) && creatorStep !== 0 && creatorStep !== 1;

  return (
    <div style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden', display: 'flex' }}>
      {/* Left Navigation Sidebar Dock (ONLY shows after login) */}
      {showSidebar && (
        <LeftSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          toggleTheme={toggleTheme}
          clubInfo={clubInfo}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, height: '100vh', display: 'flex', flexDirection: 'column', padding: '16px', overflowY: 'auto', position: 'relative' }}>
        {/* Floating Theme Switcher Button when logged out on Intro/Login */}
        {!showSidebar && (
          <div style={{ position: 'absolute', top: '16px', right: '20px', zIndex: 50 }}>
            <button
              onClick={toggleTheme}
              className="btn-secondary-pill"
              style={{ padding: '6px 14px', fontSize: '0.75rem' }}
            >
              {theme === 'light' ? <Sun size={14} color="#f59e0b" /> : <Moon size={14} color="#8b5cf6" />}
              <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        )}

        {/* Creator Tab Flow */}
        {activeTab === 'creator' && (
          <div style={{ margin: 'auto 0', width: '100%' }}>
            {creatorStep === 0 && (
              <IntroLanding onGoToLogin={handleGoToLogin} onGoToSignup={handleGoToSignup} />
            )}
            {creatorStep === 1 && (
              <Login initialMode={authInitialMode} onLoginSuccess={handleLoginSuccess} onBackToIntro={() => setCreatorStep(0)} />
            )}
            {creatorStep === 2 && (
              <SocialSettings clubInfo={clubInfo} onSaveCredentials={handleSaveCredentials} />
            )}
            {creatorStep === 3 && (
              <PosterUpload onStartProcess={handleStartProcess} isProcessing={isProcessing} />
            )}
            {creatorStep === 4 && (
              <ProcessingOverlay />
            )}
            {creatorStep === 5 && campaignData && (
              <CampaignReview
                posterData={posterData}
                campaignData={campaignData}
                uploadedFiles={uploadedFiles}
                onConfirmPublish={handleConfirmPublish}
                isPublishing={isPublishing}
              />
            )}
            {creatorStep === 6 && (
              <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                <PerformanceTracker postStatuses={postStatuses} onTriggerCheck={handleTriggerCheck} />
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <button onClick={() => setCreatorStep(3)} className="btn-primary-pill" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                    <RefreshCw size={14} /> Create Another Campaign
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Campaigns Library Page */}
        {activeTab === 'campaigns' && (
          <CampaignsLibrary campaignData={campaignData} posterData={posterData} postStatuses={postStatuses} />
        )}

        {/* Tab 3: Post Schedule Timeline Page */}
        {activeTab === 'schedule' && (
          <ScheduleTimeline postStatuses={postStatuses} />
        )}

        {/* Tab 4: Overview Dashboard Page */}
        {activeTab === 'dashboard' && (
          <div style={{ maxWidth: '1150px', margin: '0 auto', width: '100%', height: '100%' }}>
            <PerformanceTracker postStatuses={postStatuses} onTriggerCheck={handleTriggerCheck} />
          </div>
        )}

        {/* Tab 5: Social API Auth Settings Page */}
        {(activeTab === 'settings' || activeTab === 'account') && (
          <div style={{ margin: 'auto 0', width: '100%' }}>
            {!clubInfo ? (
              <Login initialMode="login" onLoginSuccess={handleLoginSuccess} onBackToIntro={() => setActiveTab('creator')} />
            ) : (
              <SocialSettings clubInfo={clubInfo} onSaveCredentials={handleSaveCredentials} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

