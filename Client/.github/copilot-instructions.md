# Copilot Instructions for Skill Swap Platform

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js and Node.js skill swap platform project focused on:

## Core Principles
1. **Ultra-simplified UX**: Every interaction should be frictionless and intuitive
2. **Security-first**: Implement robust authentication, privacy controls, and content moderation
3. **Real-time communication**: Seamless messaging and notifications
4. **AI-powered matching**: Smart skill recommendation algorithms
5. **Mobile-first design**: Responsive, fast-loading interfaces

## Technology Stack
- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS, App Router
- **Backend**: Node.js with Express.js, Socket.io for real-time features
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with social login (Google, GitHub)
- **Real-time**: Socket.io for instant messaging and notifications
- **State Management**: Zustand for client-side state
- **UI Components**: Headless UI with custom Tailwind styling
- **Validation**: Zod for schema validation
- **Testing**: Jest and React Testing Library

## Key Features to Implement
1. **3-step profile creation** with social login
2. **Visual skill matching** with tag-based interface
3. **Instant messaging** with swap request negotiation
4. **AI recommendations** for skill compatibility
5. **Admin dashboard** for content moderation
6. **Privacy controls** with granular settings
7. **Rating system** with feedback mechanisms

## Code Style Guidelines
- Use TypeScript for all components and API routes
- Implement proper error handling and loading states
- Follow React best practices with hooks and server components
- Use Tailwind CSS for styling with consistent design tokens
- Write clean, documented code with proper prop interfaces
- Implement proper SEO with Next.js metadata API

## Security Requirements
- Input validation on all forms
- Rate limiting on API endpoints
- CSRF protection
- XSS prevention
- Secure session management
- Content moderation tools
- User reporting and blocking features

When generating code, prioritize user experience, security, and maintainability.
