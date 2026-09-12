# MAITRI 2.0 — Single Window Investor & Compliance Operating System
### Smart India Hackathon 2026 | Problem Statement ID: 26130
**Directorate of Industries, Government of Maharashtra**

---

## 🌟 Executive Summary
**MAITRI 2.0** is an AI-powered, single-window statutory approval, document reuse, and regulatory compliance operating system developed for the Government of Maharashtra. It simplifies the end-to-end industrial lifecycle for entrepreneurs while giving government officers and policymakers real-time visibility, SLA tracking, and simulation tools.

---

## 🚀 Key Features

### 👤 1. Entrepreneur Portal (`/entrepreneur`)
- **Project Passport & Health Index**: Single consolidated identity for industrial establishments.
- **7-Stage Business Journey**: Interactive linear & parallel approval sequence.
- **Next Best Actions & Blocker System**: Actionable guidance highlighting what is stalling statutory clearance.
- **Document Locker**: Single-upload vault with instant reuse across MIDC, MPCB, Fire, DISH, and SEIAA.
- **Joint Inspection Scheduling**: Automated site visit coordination.
- **Incentive & Subsidy Matcher**: Algorithmic discovery of PSI 2019 and agro-processing state grants.
- **Bilingual & Plain Language Mode**: Instant Marathi (मराठी) translation and simplified legal clause explanations.

### 🏛️ 2. Government Officer Review Workdesk (`/officer`)
- **Scrutiny Queue**: Real-time statutory SLA countdowns under the Maharashtra Right to Public Services Act.
- **Interactive Objection / Query System**: Formal clarification requests with direct applicant resubmission workflows.
- **Inspection Management**: Schedule, reschedule, and file field inspection audit findings on-site.
- **Analytics & Throughput KPIs**: Department-level clearance velocities and processing times.

### 📊 3. State Oversight & Policy Lab (`/admin`)
- **Interactive 36-District Maharashtra Map**: District-wise industrial density, SLA adherence, and pending application counters.
- **Policy 'What-If' Simulation Lab**: Interactive sliders to model the impact of reducing inspection days, increasing automated validation, and boosting parallel clearance ratios.
- **Cryptographic Audit Trail**: Immutable SHA-256 block-linked transaction logs with future Hyperledger Fabric architecture.
- **Regulatory Rules Engine**: SLA configuration, sequence dependency editor, and scheme policy catalog.

---

## 🏗️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: Vanilla CSS & [Tailwind CSS](https://tailwindcss.com/) (Maharashtra Government Theme Palette: Deep Navy, Saffron, Teal & Sand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visualizations**: [Recharts](https://recharts.org/)
- **State Management**: React Context with LocalStorage persistence & SSR hydration guards

---

## 📂 Project Structure

```
sih2026-130/
├── frontend/                     # Next.js TypeScript Frontend Application
│   ├── public/                   # Favicons, vector graphics & static assets
│   ├── src/
│   │   ├── app/                  # Next.js App Router (Public, Entrepreneur, Officer, Admin)
│   │   ├── components/
│   │   │   ├── ai/               # AI Assistant & Plain Language components
│   │   │   ├── cards/            # Application, Approval, Scheme & Notification Cards
│   │   │   ├── common/           # Button, Input, Modal, DataTable, StatCard, Timeline
│   │   │   ├── journey/          # Passport, BusinessJourney, DependencyMap, MaharashtraMap
│   │   │   └── layout/           # Navbar, Sidebar, Role Layout wrappers
│   │   ├── context/              # LanguageContext (EN/MR) & PortalContext (CRUD State)
│   │   ├── data/                 # Master datasets (36 districts, rules, schemes, projects)
│   │   ├── i18n/                 # English and Marathi translation dictionaries
│   │   └── types/                # Strict TypeScript interfaces
├── backend/                      # Backend services and API scaffold
├── docs/                         # System architecture & Problem Statement documentation
├── .gitignore                    # Root git ignore rules
└── README.md                     # Project overview & documentation
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation & Local Run

1. Clone the repository:
```bash
git clone https://github.com/Sarthak-patil123/sih2026-130.git
cd sih2026-130
```

2. Install dependencies & run frontend:
```bash
cd frontend
npm install
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏆 Smart India Hackathon 2026
- **Problem Statement ID**: 26130
- **Theme**: Smart Automation / Ease of Doing Business (EoDB)
- **Organization**: Directorate of Industries, Government of Maharashtra
