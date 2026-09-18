# CampusSync — 20-Hour Hackathon Project

CampusSync is an autonomous AI-driven event marketing and social media automation engine for campus clubs.

---

## 1. Balanced Workload Division & Folder Ownership

To ensure **zero code merge conflicts** during the 20-hour hackathon, each member operates with **strict directory isolation**.

```
                      ┌─────────────────────────────────┐
                      │    Shared Data Model Contract   │
                      │        (app/schemas.py)         │
                      └────────────────┬────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌─────────────────┐           ┌─────────────────┐           ┌─────────────────┐
│    PERSON 1     │           │    PERSON 2     │           │    PERSON 3     │
│  UI & Pipeline  │           │  AI & Vision    │           │ Dispatch & Loop │
└────────┬────────┘           └────────┬────────┘           └────────┬────────┘
         │                             │                             │
         │ • React Web Dashboard       │ • OpenCV Smart Cropper      │ • Social Media Posting  │
         │ • User Upload Form          │ • Vision LLM Poster Parser  │   API Integration       │
         │ • End-to-End Orchestrator   │ • MCP Club Memory Server    │ • 2-Hour Traction Check │
         │ • Live Status Tracking UI   │ • Dual Caption Generator    │ • Dynamic Auto-Refresh  │
         │                             │   (Instagram & LinkedIn)    │   Social Caption Updater│
         └─────────────────────────────┴─────────────────────────────┴─────────────────┘
```

| Member | Primary Focus | Folder / File Ownership | Estimated Effort |
| :--- | :--- | :--- | :--- |
| **Person 1** | UI & Pipeline Lead | `app/ui/` (React App), `app/orchestrator.py` | 33% |
| **Person 2** | AI Engine & Vision Lead | `app/ingestion/`, `app/reasoning/` | 33% |
| **Person 3** | APIs & Automation Lead | `app/dispatch/`, `app/monitor/` | 34% |

---

## 2. Project File Structure

```plaintext
VinhackProject/
├── README.md                   <-- Project Documentation & Team Guide
├── requirements.txt            <-- Backend Python Dependencies
├── .gitignore                  <-- Git Exclusion Rules
└── app/
    ├── schemas.py              <-- SHARED (Locked at Hour 1)
    ├── orchestrator.py         <-- PERSON 1 ONLY (FastAPI Backend + Pipeline Hub)
    ├── ui/                     <-- PERSON 1 ONLY (React Web Dashboard)
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── index.html
    │   └── src/
    │       ├── App.jsx
    │       ├── main.jsx
    │       └── index.css
    ├── ingestion/              <-- PERSON 2 ONLY
    │   ├── cropper.py          (OpenCV Smart Image Resizing)
    │   └── vision.py           (Poster Visual Extraction)
    ├── reasoning/              <-- PERSON 2 ONLY
    │   ├── mcp_server.py       (Club History & Tone Memory)
    │   └── generator.py        (Instagram & LinkedIn Prompts)
    ├── dispatch/               <-- PERSON 3 ONLY
    │   └── publisher.py        (Ayrshare / Social Platform APIs)
    └── monitor/                <-- PERSON 3 ONLY
        └── tracker.py          (2-Hour Analytics & Refresh Trigger)
```

---

## 3. Git Branching Workflow

Before starting feature work, each team member should create and checkout their dedicated branch:

```bash
# Person 1 (UI & Pipeline Lead)
git checkout -b feature/person1-ui-orchestrator

# Person 2 (AI Engine & Vision Lead)
git checkout -b feature/person2-ai-vision

# Person 3 (APIs & Automation Lead)
git checkout -b feature/person3-dispatch-monitor
```

### Merging at the End of Hackathon
Because each member only modifies files in their assigned directory, merging back into `main` will happen seamlessly without merge conflicts:

```bash
git checkout main
git pull origin main
git merge feature/person1-ui-orchestrator
git merge feature/person2-ai-vision
git merge feature/person3-dispatch-monitor
git push origin main
```

---

## 4. How to Run Locally

### Backend (FastAPI Orchestrator)
```bash
# Install Python dependencies
pip install -r requirements.txt

# Launch FastAPI server
uvicorn app.orchestrator:app --reload --port 8000
```
API Documentation available at: `http://localhost:8000/docs`

### Frontend (React Dashboard)
```bash
# Navigate to UI directory
cd app/ui

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
React App running at: `http://localhost:3000`