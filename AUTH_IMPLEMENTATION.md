# Authentication & Authorization Implementation

## Overview
Implemented role-based access control (RBAC) to manage user privileges across the application.

## Architecture

### 1. **Authentication Hook** (`src/hooks/useAuth.ts`)
- Manages authentication state globally
- Checks user authentication on app load
- Provides user info, role, and logout functionality
- Returns:
  - `user`: Current logged-in user object
  - `isAuthenticated`: Boolean flag
  - `isAdmin`: Boolean flag for admin role
  - `logout()`: Function to log out user

### 2. **Protected Routes**

#### PrivateRoute (`src/components/PrivateRoute.tsx`)
- Protects routes that require authentication
- Used for: Booking page (`/booking/:tripId`)
- Redirects unauthenticated users to `/login`

#### AdminRoute (`src/components/AdminRoute.tsx`)
- Protects routes that require admin role
- Used for: All `/admin/*` routes
- Redirects non-admins to home page
- Redirects unauthenticated users to login

### 3. **Access Control Map**

#### Public Routes (No Login Required)
- `/` - Home
- `/trips` - Browse trips
- `/about` - About page
- `/contact` - Contact page
- `/login` - Login page
- `/signup` - Sign up page
- `/verify-email` - Email verification

#### Protected Routes (Login Required)
- `/booking/:tripId` - Book a trip (customers only)

#### Admin Routes (Admin Login Required)
- `/admin` - Dashboard
- `/admin/buses` - Manage buses
- `/admin/trips` - Manage trips
- `/admin/bookings` - View bookings
- `/admin/users` - Manage users

### 4. **Navbar Updates**

#### For Non-Authenticated Users
- Shows: Login button, Sign Up button

#### For Authenticated Customers
- Shows: User avatar with profile menu
- Menu includes: User name, email, Logout button

#### For Authenticated Admins
- Shows: User avatar with profile menu (same as customers)
- Shows: Admin button (highlighted orange) to access admin panel
- Menu includes: User name, email, Logout button

#### Mobile Drawer (Responsive)
- Shows all navigation items
- Shows admin panel button if logged in as admin
- Shows user profile info if authenticated
- Shows logout button if authenticated
- Shows login/signup buttons if not authenticated

## Flow Examples

### User Booking a Trip
1. User clicks "Book Now" on a trip
2. App checks if user is authenticated via `PrivateRoute`
3. If not logged in → redirects to `/login`
4. If logged in → allows booking

### Accessing Admin Panel
1. Admin user clicks "Admin" button in navbar
2. App checks if user has admin role via `AdminRoute`
3. If not admin → redirects to home
4. If admin → shows admin dashboard

## Implementation Details

### Token Management
- Auth token stored in `localStorage` as `authToken`
- Token automatically added to all API requests via axios interceptor
- Expired/invalid tokens trigger logout

### User Detection
- On app load, `useAuth` hook calls `/auth/me` endpoint
- Server returns current user info and role
- If no token or invalid token, user is set to null

### Role Detection
- User role comes from backend (`'customer'` or `'admin'`)
- `isAdmin` property checks if `user.role === 'admin'`

## Files Modified/Created
- ✅ `src/hooks/useAuth.ts` - New
- ✅ `src/components/PrivateRoute.tsx` - New
- ✅ `src/components/AdminRoute.tsx` - New
- ✅ `src/App.tsx` - Updated with route protection
- ✅ `src/components/Navbar.tsx` - Updated with auth UI
