```# Fly-Voyager Flights Booking App Backend

## Overview

Fly-Voyager is a microservices-based backend for a flight booking application. The architecture is designed to handle user management, flight details, and booking operations, leveraging MongoDB for data storage and deployed on Vercel for scalability and reliability.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Endpoints](#endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```
/flight-booking-system
│
├── /src
│   │
│   ├── /flight-service
│   │   ├── flightController.ts     # Business logic for flights
│   │   ├── flightRoutes.ts         # Routing for flight-related APIs
│   │   ├── middleware.ts           # Middleware for flight service
│   │   ├── index.ts                # Flight service entry point
│   │
│   ├── /user-service
│   │   ├── userController.ts       # Business logic for users
│   │   ├── userRoutes.ts           # Routing for user-related APIs
│   │   ├── middlewares.ts          # Middleware for user service
│   │   ├── index.ts                # User service entry point
│   │
│   └── /booking-service
│       ├── bookingController.ts    # Business logic for bookings
│       ├── bookingRoutes.ts        # Routing for booking-related APIs
│       ├── middleware.ts           # Middleware for booking service
│       ├── index.ts                # Booking service entry point
│
├── /models
│   ├── bookingModel.ts             # Schema for bookings in MongoDB
│   ├── flightModel.ts              # Schema for flights in MongoDB
│   └── userModel.ts                # Schema for users in MongoDB
│
├── .env                            # Environment variables configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── vercel.json                     # Vercel deployment configuration
```

---

## Features

- **User Service**: User registration, authentication, and management.
- **Flight Service**: Manage flights, search flights, and retrieve flight details.
- **Booking Service**: Create, view, and manage flight bookings.
- **Microservices Architecture**: Independent services for better scalability and maintainability.
- **Database**: MongoDB for efficient and scalable data storage.
- **Deployment**: Fully deployed on Vercel with environment-specific configurations.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/Fly-Voyager.git
   cd Fly-Voyager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the environment variables**:
   Create a `.env` file in the root directory and define the following variables:
   ```env
   MONGO_URI=<Your MongoDB connection string>
   JWT_SECRET=<Your JWT secret key>
   PORT=<Port number>
   ```

4. **Run the application**:
   ```bash
   npm run dev
   ```

---

## Environment Variables

| Variable       | Description                                      |
|----------------|--------------------------------------------------|
| `MONGO_URI`    | MongoDB connection string                       |
| `JWT_SECRET`   | Secret key for JSON Web Token authentication    |
| `PORT`         | Port number for the backend server              |

---

## Scripts

| Script       | Description                                   |
|--------------|-----------------------------------------------|
| `dev`        | Run the application in development mode       |
| `build`      | Build the application for production          |
| `start`      | Start the application in production mode      |
| `lint`       | Run ESLint to check for code quality issues   |

---

## Endpoints

### User Service
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in a user
- `GET /api/users/profile` - Get user profile (requires authentication)

### Flight Service
- `GET /api/flights` - Get all flights
- `GET /api/flights/:id` - Get details of a specific flight
- `POST /api/flights` - Add a new flight (admin only)

### Booking Service
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:userId` - Get all bookings for a user
- `DELETE /api/bookings/:id` - Cancel a booking

---

## Deployment

1. **Vercel Configuration**:
   - Ensure the `vercel.json` file is correctly configured for each microservice.
   - Specify the root directory of each microservice in the `builds` and `routes` fields, if applicable.

2. **Deploy to Vercel**:
   - Push the repository to a GitHub/GitLab repository.
   - Connect the repository to Vercel.
   - Configure environment variables for each microservice in the Vercel dashboard.
     - For example:
       ```
       MONGO_URI=<Your MongoDB connection string>
       JWT_SECRET=<Your JWT secret key>
       PORT=<Port number>
       ```

3. **Verify Deployment**:
   - Test the APIs using tools like Postman or cURL to ensure they work as expected.
   - Use Vercel's deployment logs to debug issues, if any.

```
