# AI Study Assistant

AI Study Assistant is a full-stack web application that helps students generate structured study notes using Gemini, organize note history, and export content as PDF. It includes secure authentication (email/password + Google), a credit-based usage model, and Stripe-powered purchases.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [UI Screenshots](#ui-screenshots)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Credit System](#credit-system)
- [Deployment Notes](#deployment-notes)
- [Contributing](#contributing)

## Overview

This platform is designed for faster exam preparation and revision. A student can enter a topic, generate AI-based notes, visualize diagrams/charts where needed, save generated notes, and download them as PDF for offline study.

## Key Features

- JWT-based authentication with protected routes
- Google Sign-In with token verification
- AI-powered note generation via Gemini API
- Structured output including sub-topics, revision points, and questions
- Note history and per-note detail view
- PDF export for generated content
- Stripe checkout for credit purchase
- Credit gating to control AI generation usage

## UI Screenshots

### Landing Page

![Landing Page](UI%20screenshots/Landing.png)

### Main Workspace

![Main Workspace](UI%20screenshots/Main.png)

### Notes History

![Notes History](UI%20screenshots/History.png)

### Purchase Credits

![Purchase Credits](UI%20screenshots/Purchase%20Credits.png)

## Project Structure

```
AI-Study-Assistant/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── context/
        ├── hooks/
        ├── pages/
        └── utils/
```

## Tech Stack

### Frontend

- React 19 + Vite
- Tailwind CSS
- React Router
- Axios
- Mermaid + Recharts
- React Markdown

### Backend

- Node.js + Express 5
- MongoDB + Mongoose
- JWT + bcryptjs
- Google Auth Library
- Stripe
- PDFKit

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB connection URI
- Stripe account (test keys are fine for local dev)
- Google OAuth Client ID
- Gemini API Key

### 1. Clone and Install

```bash
git clone https://github.com/premshuksaha/AI-Study-Assistant.git
cd AI-Study-Assistant

cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure Environment Variables

Create `.env` files in both `backend/` and `frontend/` using the templates below.

### 3. Run Development Servers

Open two terminals:

```bash
# Terminal 1
cd backend
npm run dev
```

```bash
# Terminal 2
cd frontend
npm run dev
```

Frontend runs on Vite default port (usually `5173`) and backend runs on `5000` unless changed.

## Environment Variables

### backend/.env

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
CLIENT_URL=http://localhost:5173
```

### frontend/.env

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## API Overview

Base URL: `http://localhost:5000`

### Auth

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google authentication
- `GET /api/auth/profile` - Get current profile (protected)

### Notes and Generation

- `POST /api/generate` - Generate notes (protected)
- `GET /api/notes` - Get current user notes (protected)
- `GET /api/notes/:id` - Get single note detail (protected)
- `POST /api/download` - Download notes as PDF (protected)

### Payments

- `POST /api/stripe/create-order` - Create Stripe checkout session (protected)
- `POST /api/stripe/webhook` - Stripe webhook endpoint

## Credit System

- New users start with `100` credits.
- Each note generation consumes `10` credits.
- If credits are below `10`, note generation is blocked.
- Stripe plans add credits:
  - `INR 199` -> `250` credits
  - `INR 499` -> `800` credits
  - `INR 999` -> `1800` credits

## Deployment Notes

- Set `CLIENT_URL` in backend to your deployed frontend domain.
- Set `VITE_API_BASE_URL` in frontend to your deployed backend API URL.
- Keep Stripe webhook configured with the deployed backend webhook URL.
- Ensure CORS allows your frontend origin.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request with a clear description

---
