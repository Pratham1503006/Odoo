# SkillSwap Platform

A comprehensive, user-friendly skill exchange platform built with Next.js and Node.js that facilitates seamless skill sharing between users while maintaining robust security, privacy controls, and an intuitive user experience.

## 🚀 Key Features

### Core Functionality
- **Ultra-simplified Profile Creation**: 3-step maximum setup with social login integration
- **AI-Powered Skill Matching**: Intelligent algorithm for finding compatible skill partners
- **Real-time Communication**: Instant messaging with file sharing and video call support
- **Seamless Swap Negotiation**: Built-in request and response system
- **Rating & Feedback System**: Community-driven quality assurance

### User Experience Priorities
1. **Easy Profile Creation**: Social media/Google login, minimal input fields, progressive completion
2. **Intuitive Skill Matching**: Visual tag-based selection, smart filtering, real-time suggestions
3. **Seamless Communication**: Low-friction messaging, instant notifications, swap request integration

### Security & Privacy
- End-to-end encryption for sensitive communications
- Verified user profiles and skill verification system
- Granular privacy controls with public/private profile settings
- Content moderation and user reporting mechanisms
- Rate limiting and anti-spam protection

## 🛠 Technology Stack

### Frontend
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Zustand** for state management
- **Socket.IO Client** for real-time features
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express.js
- **Socket.IO** for real-time communication
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **Rate limiting** with express-rate-limit

### Development Tools
- **ESLint** for code linting
- **Jest** for testing
- **Nodemon** for development
- **dotenv** for environment management

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd skill-swap-platform
npm install
```

### 2. Environment Configuration

Create environment files:

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Backend (server/.env)
NODE_ENV=development
PORT=3001
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Start MongoDB

Ensure MongoDB is running on your system:

```bash
# Using MongoDB service
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 4. Run the Application

Start both frontend and backend:

```bash
# Start the backend server
npm run dev:server

# In another terminal, start the frontend
npm run dev
```

Visit `http://localhost:3000` to access the application.

## 📁 Project Structure

```
skill-swap-platform/
├── src/                          # Frontend source code
│   ├── app/                      # Next.js App Router pages
│   │   ├── auth/                 # Authentication pages
│   │   ├── dashboard/            # User dashboard
│   │   ├── messages/             # Messaging interface
│   │   ├── profile/              # Profile management
│   │   └── explore/              # Skill exploration
│   ├── components/               # React components
│   │   ├── ui/                   # Base UI components
│   │   ├── forms/                # Form components
│   │   ├── layout/               # Layout components
│   │   └── landing/              # Landing page components
│   ├── hooks/                    # Custom React hooks
│   ├── store/                    # Zustand stores
│   ├── types/                    # TypeScript type definitions
│   ├── utils/                    # Utility functions
│   └── providers/                # Context providers
├── server/                       # Backend source code
│   ├── models/                   # MongoDB models
│   ├── routes/                   # API routes
│   ├── middleware/               # Express middleware
│   ├── socket/                   # Socket.IO handlers
│   ├── utils/                    # Utility functions
│   └── index.js                  # Server entry point
├── public/                       # Static assets
├── .github/                      # GitHub configuration
│   └── copilot-instructions.md   # Copilot guidelines
└── docs/                         # Documentation
```

## 🏗 System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│  - React UI     │    │  - REST API     │    │  - User Data    │
│  - Real-time    │    │  - Socket.IO    │    │  - Skills       │
│  - State Mgmt   │    │  - Auth         │    │  - Messages     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow

1. **User Registration/Login**
   - Frontend validates input using Zod schemas
   - Backend processes authentication with JWT
   - User data stored in MongoDB with bcrypt password hashing

2. **Skill Matching**
   - AI algorithm analyzes user skills and preferences
   - Real-time compatibility scoring
   - Location-based filtering and recommendations

3. **Real-time Communication**
   - Socket.IO handles instant messaging
   - Message persistence in MongoDB
   - Typing indicators and read receipts

4. **Swap Request Workflow**
   - Request creation with skill and time preferences
   - Real-time notifications to target user
   - Acceptance/decline with automatic calendar integration

## 🔒 Security Implementation

### Authentication & Authorization
- JWT-based stateless authentication
- Secure password hashing with bcrypt
- Role-based access control (User, Admin)
- Session management with automatic expiry

### Data Protection
- Input validation using Zod schemas
- XSS prevention with content sanitization
- CSRF protection with tokens
- Rate limiting to prevent abuse
- MongoDB injection prevention

### Privacy Controls
- Granular privacy settings per user
- Public/private profile options
- Selective skill visibility
- Message encryption for sensitive content

## 📊 API Documentation

### Authentication Endpoints

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
POST /api/auth/verify-email
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### User Management

```
GET    /api/users/profile
PATCH  /api/users/profile
GET    /api/users/search
GET    /api/users/:id
POST   /api/users/block
POST   /api/users/report
```

### Skills & Categories

```
GET    /api/skills
POST   /api/skills
GET    /api/skills/search
GET    /api/skills/categories
GET    /api/skills/popular
GET    /api/skills/trending
```

### Swap Requests

```
GET    /api/swaps
POST   /api/swaps
PATCH  /api/swaps/:id
GET    /api/swaps/pending
GET    /api/swaps/history
POST   /api/swaps/:id/accept
POST   /api/swaps/:id/decline
POST   /api/swaps/:id/complete
POST   /api/swaps/:id/rate
```

### Messaging

```
GET    /api/messages/conversations
GET    /api/messages/:conversationId
POST   /api/messages/:conversationId
PATCH  /api/messages/:messageId/read
POST   /api/messages/upload
```

## 🧪 Testing Strategy

### Frontend Testing
```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

### Backend Testing
```bash
# Run API tests
npm run test:api

# Run database tests
npm run test:db

# Run socket tests
npm run test:socket
```

## 🚀 Deployment

### Production Environment Setup

1. **Environment Variables**
   ```bash
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=strong_production_secret
   CLIENT_URL=https://your-domain.com
   ```

2. **Database Migration**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   npm run start:production
   ```

### Recommended Hosting

- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, AWS EC2
- **Database**: MongoDB Atlas
- **File Storage**: AWS S3, Cloudinary
- **CDN**: CloudFlare

## 📈 Performance Optimization

### Frontend Optimizations
- Next.js Image optimization
- Code splitting with dynamic imports
- Service Worker for offline functionality
- CSS optimization with Tailwind purging
- Bundle analysis and tree shaking

### Backend Optimizations
- MongoDB indexing strategy
- Redis caching for frequent queries
- Connection pooling
- Compression middleware
- API response pagination

### Monitoring
- Error tracking with Sentry
- Performance monitoring
- Database query optimization
- Real-time metrics dashboard

## 🤝 Contributing

### Development Workflow

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-fork/skill-swap-platform
   cd skill-swap-platform
   npm install
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Development Guidelines**
   - Follow TypeScript best practices
   - Write comprehensive tests
   - Use conventional commits
   - Update documentation

4. **Submit Pull Request**
   - Ensure all tests pass
   - Include detailed description
   - Reference related issues

### Code Standards
- ESLint configuration with strict rules
- Prettier for code formatting
- TypeScript for type safety
- Component documentation with JSDoc

## 📞 Support & Community

- **Documentation**: [docs.skillswap.com](https://docs.skillswap.com)
- **Discord**: [Join our community](https://discord.gg/skillswap)
- **Issues**: [GitHub Issues](https://github.com/skillswap/issues)
- **Email**: support@skillswap.com

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the flexible database solution
- Socket.IO for real-time capabilities
- Tailwind CSS for the design system
- All contributors and community members

---

**Built with ❤️ for the global learning community**
