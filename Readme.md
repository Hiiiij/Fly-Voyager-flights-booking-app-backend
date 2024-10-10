```
/flight-booking-system
│
├── /src
│   │
│   ├── /flight-service
│   │   ├── flightController.ts
│   │   ├── flightRoutes.ts
│   │   ├── middleware.ts
│   │   ├── index.ts
│   │
│   ├── /user-service
│   │   ├── userController.ts
│   │   ├── userRoutes.ts
│   │   ├── middlewares.ts
│   │   ├── index.ts
│   │
│   └── /booking-service
│       ├── bookingController.ts
│       ├── bookingRoutes.ts
│       ├── middleware.ts
│       ├── index.ts
│
├── /models
│   ├── bookingModel.ts
│   ├── flightModel.ts
│   └── userModel.ts
│
├── .env
├── package.json
├── tsconfig.json
└── vercel.json


import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const App = () => {
  return (
    <DotLottieReact
      src="path/to/animation.lottie"
      loop
      autoplay
    />
  );
};

Lottie:
https://lottie.host/e30b2cd6-4e2c-4eb1-8bab-25ebbae9f87c/lZ8oHFkZQK.json

<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script><dotlottie-player src="https://lottie.host/e30b2cd6-4e2c-4eb1-8bab-25ebbae9f87c/lZ8oHFkZQK.json" background="transparent" speed="1" style="width: 300px; height: 300px" direction="1" playMode="normal" loop controls autoplay></dotlottie-player>
```

: Hybrid Model (Search + Mock Booking)

Search Flights: Show results from external APIs (like Amadeus or airline APIs).
Mock Booking: When the user selects a flight to book, simulate the booking process by letting the user provide their passenger details. These details, along with the selected flight info, would be stored in MongoDB.
However, instead of completing the booking directly, you could do one of the following:

Send Data to Airline API: If you want to complete the booking, you'd send the user’s booking request (including flight and passenger info) to the airline’s API, if it supports it. Airlines or GDS systems may allow this through their APIs.
Display Payment Option with Redirect: You could ask for customer information and then redirect to the airline’s website or payment platform to finalize the transaction.
This would give the user the illusion that they are booking on your platform, but the actual booking happens on the airline's side.

Advantages:
You can store user data for future analytics or loyalty programs (e.g., saved bookings, frequent flyers).
You maintain a more seamless user experience by simulating a booking process.

API token: 2bd8512a9c2d6066e186ff48e391a095

Just when creating a booking, copy the information from aviation and save it as a flight

User : do it like me

Flight:
GET => from Aviation
