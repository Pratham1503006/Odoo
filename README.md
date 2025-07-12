# Odoo - Skill Swap Platform

## Project Overview
Develop a Skill Swap Platform — a mini application that enables users to list their skills and request others in return.

## Team Members
- pkg15006@gmail.com
- Jaintirth2705@gmail.com
- KalpinkumarPatel.cse23@adaniuni.ac.in
- modharyan973@gmail.com

## Features

### User Profile Management
- **Basic Info**: Name, location (optional), profile photo (optional)
- **Skills Management**: 
  - List of skills offered
  - List of skills wanted
- **Availability**: Set availability (e.g., weekends, evenings)
- **Privacy Control**: Users can make their profile public or private

### Skill Discovery & Search
- Browse or search other users by skill (e.g., "Photoshop" or "Excel")
- Filter users based on availability and location

### Swap Management
- **Request & Accept Swaps**:
  - Send swap requests to other users
  - Accept or reject incoming swap offers
  - View current and pending swap requests
- **Request Management**: Users can delete swap requests if not accepted
- **Feedback System**: Ratings or feedback after completing a swap

### Admin Panel
- **Content Moderation**: Reject inappropriate or spammy skill descriptions
- **User Management**: Ban users who violate platform policies
- **Swap Monitoring**: Monitor pending, accepted, or cancelled swaps
- **Communication**: Send platform-wide messages (e.g., feature updates, downtime alerts)
- **Analytics**: Download reports of user activity, feedback logs, and swap statistics

## Technology Stack
- **Frontend**: Next.js with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: (To be determined)
- **Authentication**: (To be determined)

## 📁 Project Structure
```
Skill-Swap-Platform/
├── README.md                   # Main project documentation
├── .gitignore                  # Git ignore rules
├── Client/                     # Frontend Application (Next.js)
│   ├── src/                   # Source code
│   │   ├── app/              # Next.js App Router
│   │   ├── components/       # Reusable React components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   ├── providers/        # Context providers
│   │   ├── store/            # State management
│   │   └── types/            # TypeScript definitions
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   ├── next.config.js        # Next.js configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── tsconfig.json         # TypeScript config
│   └── middleware.ts         # Next.js middleware
└── Server/                    # Backend Application (Node.js)
    ├── package.json          # Backend dependencies
    ├── server.js             # Main server file
    ├── routes/               # API routes
    └── DataBase_Client/      # Database configurations
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pratham1503006/Odoo.git
   cd Odoo
   ```

2. **Install Client dependencies**
   ```bash
   cd Client
   npm install
   ```

3. **Install Server dependencies**
   ```bash
   cd ../Server
   npm install
   ```

4. **Start development servers**
   
   **Frontend (Client):**
   ```bash
   cd Client
   npm run dev
   ```
   
   **Backend (Server):**
   ```bash
   cd Server
   npm start
   ```

## Development Workflow
1. Frontend runs on `http://localhost:3000`
2. Backend API runs on `http://localhost:5000` (or as configured)
3. Make sure both servers are running for full functionality

## Project Status
🚧 **In Development** - Project setup and initial planning phase