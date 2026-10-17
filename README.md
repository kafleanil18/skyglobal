# SkyGlobal — Global Tech Recruitment & Cross-Border Staffing

A modern, responsive web application for **SkyGlobal**, an international recruitment and talent acquisition agency specializing in overseas placement, IT & engineering staffing, cross-border visa facilitation, and turnkey talent mobility.

---

## 🌟 Key Features

- **High-Impact Brand Identity**: Deep Sky Navy & vibrant cyan/blue theme with polished typography and responsive glassmorphism.
- **Hero & Live Search Engine**: Search for roles, tech stacks (e.g. *Go*, *MLOps*, *Robotics*), and destination regions with synchronized scrolling and filter updates.
- **Dynamic Stats & Enterprise Partners**: Key metrics (52+ Countries, 14,500+ Placements, 98.2% Retention, 72h Shortlists) and trusted brand logos.
- **Specialized Practice Areas**:
  - Cross-Border Relocation & Visa Legal (EU Blue Card, UK Global Talent, Singapore COMPASS, Japan HSP, UAE Golden Visa, Canada GSS)
  - Software, Cloud & Distributed Systems Staffing
  - AI, LLMs & Deep Learning Architecture
  - Robotics & Embedded Hardware Engineering
  - Executive Tech Leadership Search (CTO, VP of Eng)
  - Compliant Global Payroll & Employer of Record (EOR)
- **Interactive Job Board**:
  - Live search by keyword, sector pills, region, and work mode
  - Toggle for verified visa sponsorship
  - Detailed modal view with technical requirements, relocation perks, and an interactive **Quick Apply** form
- **Employer "Hire Talent" Modal**:
  - Enterprise talent request workflow with headcount, destination requirements, timeline, and reference tracking
- **Candidate "Submit CV" Fast-Track**:
  - 1-click CV drop zone with destination preferences and confidential screening
- **Global Mobility & Visa Hub**:
  - Regional visa guides (Germany, UK, Singapore, Japan, UAE, Canada) and a 4-step turnkey mobility concierge roadmap
- **2026/2027 Global Tech Salary Guide**:
  - Interactive multi-region compensation comparison table and free PDF report email request
- **Client & Candidate Testimonials**:
  - Verified case studies from engineering leaders and relocated senior engineers
- **Global Office Directory & Job Alert Newsletter**:
  - London, Berlin, Singapore, San Francisco, and Dubai operating centers

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev) + [Vite 6](https://vite.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [Lucide React](https://lucide.dev)
- **Backend API**: [Express.js](https://expressjs.com) (Port 5001)
- **Local Database**: [MongoDB](https://www.mongodb.com) (`mongodb://127.0.0.1:27017/skyglobal`) via [Mongoose](https://mongoosejs.com)
- **Data Architecture**: Hybrid sync (connects to local MongoDB when backend is running; seamlessly falls back to localStorage cache if offline)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB running locally (`brew services start mongodb-community`)

### Starting Database & Application

To run both the **backend database API** (port 5001) and the **Vite frontend** (port 5173) together:

```bash
# Run both backend server & frontend concurrently
npm run dev:all
```

Or run them individually:

```bash
# Terminal 1: Backend MongoDB API Server (Port 5001)
npm run server:dev

# Terminal 2: Vite React Frontend (Port 5173)
npm run dev
```

Alternatively on macOS, double-click **`Launch-SkyGlobal.command`** in the project folder to start both services and open your browser automatically.

### Production Build

```bash
npm run build
npm run preview
```
