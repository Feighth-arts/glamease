# Project Report: Glamease

## 1. Project Overview

**Name:** Glamease
**Description:** A Next.js application that serves as a marketplace for beauty services. It connects clients with beauty service providers, allowing them to book appointments, pay with money or points, and rate services.
**Tech Stack:**
- **Framework:** Next.js (with App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth (Credentials and Google providers)
- **Database:** PostgreSQL (via Supabase) with Prisma ORM
- **Deployment:** Vercel

## 2. Key Features

- **Dual User Roles:** The platform supports two main user roles:
    - **Clients:** Can browse services, book appointments, pay with money or points, and rate providers.
    - **Providers:** Can list their services, set their schedules, manage bookings, and track their earnings.
- **Service Marketplace:** A public-facing page where users can browse and discover beauty services offered by various providers.
- **Booking System:** Clients can book services based on the provider's availability. The system handles time slot validation to prevent double bookings.
- **Dual Payment System:**
    - **Money:** A simulated STK push mechanism for mobile payments.
    - **Points:** A loyalty system where clients can earn points for activities like booking and rating services, and then redeem them for services.
- **User Dashboards:** Separate dashboards for clients and providers to manage their respective activities.
- **Provider Onboarding:** A dedicated flow for new providers to set up their profiles and services.
- **Email Notifications:** The application uses EmailJS to send notifications for booking confirmations, reminders, and service completions.
- **Reporting:** Users can generate PDF reports of their bookings, payments, and earnings.

## 3. Project Structure

The project follows a standard Next.js App Router structure.

- **`app/`**: Contains the core application logic, including pages, components, and context.
    - **`app/api/`**: API routes for handling backend logic like user management, services, bookings, and payments.
    - **`app/components/`**: Reusable React components used throughout the application (e.g., `Navigation`, `AuthForm`, `ServiceCard`).
    - **`app/context/`**: Contains the `AuthContext.jsx`, which manages user authentication state across the application.
    - **`app/dashboard/`**: Pages for the client and provider dashboards.
    - **`app/(auth)/`**: Pages for login, signup, and other authentication-related flows.
- **`prisma/`**: Contains the `schema.prisma` file, which defines the database schema.
- **`public/`**: Static assets like images and icons.
- **Configuration Files:**
    - `next.config.mjs`: Next.js configuration.
    - `tailwind.config.js`: Tailwind CSS configuration.
    - `package.json`: Project dependencies and scripts.

## 4. Database Schema

The database schema is defined in `schema.prisma` and includes the following models:

- **`User`**: Stores user information, including their role (client, provider, admin), points, and earnings.
- **`Service`**: Represents the services offered by providers, including price, duration, and points cost.
- **`Booking`**: Represents a booking made by a client for a specific service. It includes the status of the booking (pending, confirmed, completed, canceled).
- **`Payment`**: Stores payment information for each booking, including the payment method (money or points) and status.
- **`Schedule`**: Allows providers to define their weekly availability.
- **`Rating`**: Allows clients to rate and review completed bookings.
- **`PointsTransaction`**: Logs all points earned and used by clients.
- **NextAuth Models**: `Account`, `Session`, `VerificationToken` for authentication.

## 5. Authentication Flow

- **`AuthContext.jsx`** is the central point for managing authentication. It provides the `user` object and `login`, `logout`, and `signup` functions to the rest of the application.
- The application uses a mock authentication system with hardcoded user data in `AuthContext.jsx`. This is intended for development and should be replaced with a real authentication backend.
- **NextAuth** is configured to use both `Credentials` (email/password) and `Google` providers.
- Protected routes are enforced using middleware to ensure that only authenticated users can access certain pages.

## 6. Potential Improvements & Recommendations

- **Replace Mock Authentication:** The current mock authentication system in `AuthContext.jsx` is a security risk and should be replaced with a robust backend authentication system using the NextAuth configuration.
- **Secure Hardcoded Credentials:** Any hardcoded credentials, such as API keys or database URLs, should be moved to environment variables (`.env` file) and not committed to version control.
- **Input Validation:** Implement comprehensive server-side validation for all API routes to prevent invalid data from being saved to the database.
- **Error Handling:** Enhance error handling throughout the application to provide better feedback to the user and log errors for debugging.
- **Testing:** The `implementationGuide.md` mentions testing, but no test files are present. Adding unit and integration tests would significantly improve the quality and reliability of the application.
- **Implement Email and PDF Functionality:** The `implementationGuide.md` outlines plans for email notifications (EmailJS) and PDF reports (jsPDF), but the implementation is not yet present in the codebase.
