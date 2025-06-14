NB: THE PROJECT USES PNPM NOT NPM, USE PNPM ALWAYS UNLESS STRICTLY NECESSARY TO USE NPM 

Implementation Guide for Manicure and Pedicure Service Booking System
Setup

Initialize a NextJS project (App Router, no TypeScript).
Install dependencies: prisma, @prisma/client, next-auth, emailjs, jspdf, tailwindcss.
Configure PostgreSQL (Supabase) and set DATABASE_URL in .env.
Use Prisma with schema in schema.prisma.
Deploy on Vercel.

Authentication

Configure NextAuth in app/api/auth/[...nextauth]/route.js:
Use Credentials provider (email/password) and Google provider.
Extend User model with role, status, points, earnings, location.
Use Prisma adapter (@next-auth/prisma-adapter).


Protect routes with auth middleware where authentication is required.

Database

Run npx prisma generate and npx prisma db push with schema.prisma.
Ensure all relations (User, Service, Booking, etc.) are correctly linked.

API Routes (in app/api/)

/users:
GET: Fetch user profile (authenticated user).
PUT: Update profile (name, location for providers).


/services:
GET: List all services (public).
POST: Create service (provider only, fields: name, description, price, pointsCost, duration).
PUT /:id: Update service (provider only).
DELETE /:id: Delete service (provider only).


/schedules:
GET: Fetch provider’s schedule (authenticated).
POST: Set schedule (provider only, fields: dayOfWeek, startTime, endTime).
PUT /:id: Update schedule (provider only).


/bookings:
GET: List bookings (client/provider specific, authenticated).
POST: Create booking (client only, fields: serviceId, startTime, paymentMethod):
Validate startTime against provider’s Schedule and existing Bookings.
If points: Deduct pointsCost, create Payment (completed), set status: confirmed.
If money: Create Payment (pending), set status: pending.


PUT /:id/cancel: Set status: canceled (client/provider).


/bookings/[id]/confirm-payment:
POST: For money payments, set Payment.status: completed, Booking.status: confirmed.


/bookings/[id]/complete:
POST: Provider sets status: completed, updates earnings += service.price, awards client 20 points (PointsTransaction).


/ratings:
POST: Submit rating (client only, fields: bookingId, rating, comment), award 5 points.


/reports:
GET /client: Fetch client’s bookings/payments for PDF.
GET /provider: Fetch provider’s bookings/earnings for PDF.
GET /admin: Fetch all users/bookings (admin only).



Frontend (in app/)

Layout: Use Tailwind CSS, responsive design, Kenyan locale (KES currency).
Pages:
/: Public service list (provider name, location, avg rating, services).
/login: NextAuth sign-in page.
/dashboard/client: Bookings, points, reports.
/dashboard/provider: Services, schedules, bookings, reports.
/dashboard/admin: User management, reports.
/services/[id]: Service details, booking form (date, time, payment method).


Components:
ServiceCard: Display service details and “Book Now” button.
BookingForm: Form with date/time picker, payment method toggle (money/points).
STKPushSimulator: Modal for money payments, “Confirm” button calls /confirm-payment.
ReportButton: Generate and download PDF using jsPDF.



Features

Service Browsing: Public, no login required, show provider ratings (avg from Rating).
Booking:
Validate time slots server-side.
Points payment: Check User.points >= Service.pointsCost, deduct immediately.
Money payment: Simulate STK Push, confirm via API.


Notifications: Use EmailJS:
Booking confirmed: Send to client/provider.
Reminder: Send 24h before startTime.
Completion: Send to client.


Points: Log all transactions in PointsTransaction (e.g., “Booking completed”, “Rating submitted”).
Reports: Use jsPDF to generate PDFs from API data.

Security

Role checks: if (user.role !== 'provider') return 403 for provider routes.
Input validation: Sanitize all fields (e.g., startTime as DateTime).

Notes

Hardcode minimum points threshold (e.g., 50) in booking logic if needed.
Use dayjs for date/time handling.
Test all flows (booking, payment, completion) thoroughly.

