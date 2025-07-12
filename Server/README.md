# Skill Swap Platform - Backend API

A comprehensive Node.js/Express backend for the Skill Swap Platform that enables users to exchange skills and knowledge.

## 🚀 Features

### User Management
- User registration and authentication
- Profile management with photos
- Privacy controls (public/private profiles)
- Availability settings
- User search and discovery

### Skills Management
- Add/edit/delete offered skills
- Add/edit/delete wanted skills
- Skill categorization
- Search and browse skills
- Popular skills tracking

### Swap System
- Create swap requests
- Accept/reject swap offers
- Real-time messaging between users
- Swap status tracking
- Feedback and rating system

### Admin Panel
- User management and moderation
- Content moderation
- Platform analytics
- Broadcast messaging
- Comprehensive reporting

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: helmet, bcryptjs, rate limiting
- **File Upload**: multer
- **Environment**: dotenv

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Odoo/Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb skillswap_db
   
   # Run schema
   psql -d skillswap_db -f database/schema.sql
   ```

5. **Create uploads directory**
   ```bash
   mkdir -p uploads/avatars
   ```

## 🚀 Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-avatar` - Upload profile photo
- `GET /api/users/:id` - Get public user profile
- `PUT /api/users/privacy` - Update privacy settings
- `PUT /api/users/availability` - Update availability

### Skills Endpoints
- `GET /api/skills/offered` - Get user's offered skills
- `POST /api/skills/offered` - Add offered skill
- `PUT /api/skills/offered/:id` - Update offered skill
- `DELETE /api/skills/offered/:id` - Delete offered skill
- `GET /api/skills/wanted` - Get user's wanted skills
- `POST /api/skills/wanted` - Add wanted skill
- `PUT /api/skills/wanted/:id` - Update wanted skill
- `DELETE /api/skills/wanted/:id` - Delete wanted skill
- `GET /api/skills/search` - Search skills
- `GET /api/skills/categories` - Get skill categories
- `GET /api/skills/popular` - Get popular skills

### Swap Endpoints
- `GET /api/swaps` - Get user's swaps
- `POST /api/swaps/request` - Create swap request
- `PUT /api/swaps/:id/accept` - Accept swap
- `PUT /api/swaps/:id/reject` - Reject swap
- `PUT /api/swaps/:id/cancel` - Cancel swap
- `PUT /api/swaps/:id/complete` - Complete swap
- `POST /api/swaps/:id/feedback` - Submit feedback
- `GET /api/swaps/:id/messages` - Get messages
- `POST /api/swaps/:id/messages` - Send message
- `GET /api/swaps/history` - Get swap history

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/ban` - Ban/unban user
- `GET /api/admin/skills/pending` - Get pending skills
- `PUT /api/admin/skills/:type/:id/approve` - Approve skill
- `PUT /api/admin/skills/:type/:id/reject` - Reject skill
- `GET /api/admin/swaps` - Monitor swaps
- `POST /api/admin/broadcast` - Send broadcast
- `GET /api/admin/analytics` - Get analytics
- `GET /api/admin/reports/users` - User report

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting
- Input validation and sanitization
- CORS protection
- Helmet security headers
- File upload restrictions

## 📁 Project Structure

```
Server/
├── database/
│   └── schema.sql          # Database schema
├── middleware/
│   ├── auth.js            # Authentication middleware
│   └── validation.js      # Validation middleware
├── routes/
│   ├── auth.route.js      # Authentication routes
│   ├── user.route.js      # User management routes
│   ├── skill.route.js     # Skills management routes
│   ├── swap.route.js      # Swap management routes
│   └── admin.route.js     # Admin panel routes
├── uploads/
│   └── avatars/           # User profile photos
├── DataBase_Client/
│   └── client.js          # Database connection
├── .env.example           # Environment template
├── server.js              # Main server file
└── package.json           # Dependencies
```

## 🔧 Configuration

Key environment variables:

- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 5000)
- `POSTGRES_*`: Database connection details
- `JWT_SECRET`: Secret for JWT tokens
- `FRONTEND_URL`: Frontend URL for CORS

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/health
```

### Database Test
```bash
curl http://localhost:5000/test-db
```

## 📊 Monitoring

The server includes:
- Health check endpoint
- Database connection testing
- Comprehensive error logging
- Request rate monitoring

## 🚀 Deployment

1. Set `NODE_ENV=production`
2. Configure production database
3. Set secure JWT_SECRET
4. Configure CORS for production frontend
5. Set up reverse proxy (nginx)
6. Enable SSL/TLS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
