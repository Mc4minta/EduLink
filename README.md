# EduLink 🎓

EduLink is a modern web platform designed to bridge the gap between students and professors. It facilitates connections for research opportunities, mentorship, and academic collaboration. Built with performance and user experience in mind, it utilizes a cutting-edge React stack.

## 🚀 Features

- **Smart Matching**: Find professors that align with your research interests.
- **Profile Management**: Comprehensive profiles for students and professors.
- **Research Interests**: Tag-based system to highlight academic focus areas.
- **Dashboard**: Centralized hub for managing connections and activities.
- **Responsive Design**: Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/)
- **Backend/Auth**: [Supabase](https://supabase.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🏁 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mc4minta/Edulink.git
   cd Edulink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory. You can use the template below:
   
   ```env
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
   # Optional: Only required if using ngrok for testing
   VITE_ALLOWED_HOSTS="your-ngrok-id.ngrok-free.app"
   VITE_API_URL=
   ```

# EduLink 🎓

EduLink connects students with professors for research, mentorship, and academic collaboration. This repository contains the frontend (Vite + React + TypeScript) and a companion backend service located in `EduLink-Backend`.

**Status:** Active development — frontend is a Vite TypeScript app; backend is a Python API (see `EduLink-Backend`).

**Quick Links**
- Frontend: [Mc4minta/EduLink](https://github.com/Mc4minta/EduLink)
- Backend: [Mc4minta/EduLink-Backend](https://github.com/Mc4minta/EduLink-backend)

## Features

- Smart matching between students and professors
- Rich profiles for students and faculty
- Tag-based research interests and search
- Responsive dashboard and mobile-friendly UI

## Tech Stack

- Frontend: React + TypeScript + Vite
- Styling: Tailwind CSS + shadcn/ui
- Data & Auth: Supabase (client-side integration)
- Backend: Python (FastAPI-style project in `EduLink-Backend`)
- State & Data Fetching: TanStack Query

## Quick Start (Frontend)

1. Install dependencies (choose one):

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the app in your browser at the URL shown by Vite (commonly `http://localhost:8080`).

Notes:
- If you see PowerShell execution errors on Windows, run PowerShell as Administrator and:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## Backend Quick Start (Please read more on [Mc4minta/EduLink-Backend](https://github.com/Mc4minta/EduLink-backend))

1. Install dependencies:

```bash
pip install -r EduLink-Backend/requirements.txt
```

2. Run the backend

```bash
python -m uvicorn EduLink-Backend.main:app --reload --lifespan off
```

3. (optional) Exposed via ngrok

```bash
ngrok http --domain=<custom-domain> 8000
```

Environment variables (examples):

- `VITE_SUPABASE_URL` — Supabase project URL (frontend)
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase public key (frontend)
- Backend-specific DB and API keys: check `EduLink-Backend/config.py`
