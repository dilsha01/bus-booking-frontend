# RideWay Bus Booking - Frontend

React + TypeScript frontend with Material-UI for the RideWay bus booking platform.

## Features

- Modern, responsive UI with Material-UI
- Hero section with trip search and stats
- Trips list with sorting and full-width journey tiles
- Complete booking flow, linked to the logged-in user
- Login and signup with email verification
- Role-aware navigation and protected/admin routes
- Admin dashboard pages for buses, trips, users, and bookings
- About and Contact pages with polished layout
- Built with React 18 + TypeScript + Vite

## Prerequisites

- Node.js 20.19+ or 22.12+ (required for Vite 7)
- npm or yarn
- Backend API running (see bus-booking-backend)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` if your backend is not on localhost:4000:
   ```
   VITE_API_URL=http://localhost:4000/api
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will open on `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Footer)
├── pages/           # Page components (Home, Trips, Booking, etc.)
├── services/        # API service layer
├── theme.ts         # MUI theme configuration
└── App.tsx          # Main app with routing
```

## Pages

- **Home** – Hero section with search form, stats, and feature cards
- **Trips** – Filterable journeys list with sorting and booking CTAs
- **Booking** – Booking screen tied to the authenticated user
- **Login / Signup** – Authentication with JWT and email verification flow
- **Verify Email** – Handles post-signup verification links
- **Admin** – Dashboard plus Manage Buses, Trips, Users, and Bookings
- **About** – Company information
- **Contact** – Contact form and details

## Branding

**RideWay** - A Sri Lankan bus booking platform with:
- Deep ocean blue primary color (#1a4d7a)
- Vibrant orange secondary color (#ff6b35)
- Clean, modern design inspired by leading bus booking sites

## Build for Production

```bash
npm run build
```

Build output will be in the `dist/` folder.

## Deployment

Deploy to:
- **Vercel** (recommended for Vite apps)
- **Netlify**
- **AWS Amplify**
- **Azure Static Web Apps**

Make sure to set the `VITE_API_URL` environment variable to your production API URL.
