# EventFinder ✨🔍

**Discover events, meet people & explore experiences — powered by AI.**

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-blue?style=for-the-badge" />
  <img src="https://img.shields.io/github/stars/satyajitmishra-dev/Event-Finder?style=for-the-badge&color=yellow" />
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" />
</p>

<p align="center">
  <a href="https://eventfinder-2pko.onrender.com/" target="_blank">🚀 Live Demo</a> •
  <a href="https://github.com/satyajitmishra-dev/Event-Finder">📦 Repository</a> •
  <a href="#features">✨ Features</a> •
  <a href="#tech-stack">🛠️ Tech Stack</a> •
  <a href="#installation">⚙️ Installation</a>
</p>

---

## 🎯 Problem Statement

Discovering relevant events—whether academic conferences, tech meetups, cultural festivals, or networking opportunities—is surprisingly difficult. Students and young professionals face critical challenges:

- **Information Fragmentation**: Events scattered across college boards, social media, and multiple platforms
- **Lack of Personalization**: Generic listings don't consider your interests, location, or academic background
- **Discovery Friction**: Manual searching across dozens of sources wastes valuable time
- **Limited Context**: Most platforms don't explain why events matter to you

**EventFinder solves this** by creating a unified, AI-powered platform that brings personalized events to you, not the other way around.

---

## 🤖 Why AI Agents?

Traditional event platforms use basic filtering (date, category, location). **AI agents are the perfect solution** because they provide:

### 🎯 Intelligent Personalization
- Analyzes your college, stream, location, and interests to build a comprehensive preference model
- Understands context beyond keywords—knows a CS student needs hackathons, not just "tech events"

### 💬 Conversational Discovery
- Natural language queries: *"Find tech meetups in Kolkata next weekend"*
- Iterative refinement through back-and-forth conversations

### 🔮 Proactive Intelligence
- Suggests events you might not have searched for but align with your interests
- Identifies emerging event categories based on your behavior

### 🌐 Multi-Source Aggregation
- Seamlessly combines local user-created events with global Ticketmaster data
- Intelligently blends results based on relevance

### 📈 Learning & Adaptation
- Tracks which events you view, join, or skip to refine recommendations
- Learns from feedback to improve future suggestions

**Powered by Google Gemini 2.5 Flash** for fast responses, rich context understanding, and cost-efficient high-volume queries.

---

## ✨ Features

### 🔐 **Authentication & Security**
- Email/password registration with OTP verification
- JWT-based authentication (access + refresh tokens)
- Secure password reset flow
- Guest session with inactivity prompts

### 📅 **Event Discovery**
- **Dual-Tab Interface**: Local (user-created) + Global (Ticketmaster API)
- Real-time search and filtering
- Category-based organization
- Join/leave events functionality
- Event creation with comprehensive details

### 🤖 **AI Chat Assistant**
- Context-aware conversations using user profile
- Personalized event recommendations
- Voice input support (speech-to-text)
- Natural language understanding

### 👤 **User Profile Management**
- Avatar upload (Cloudinary) or random generation
- Bio, interests, and social links
- College, stream, and location details
- Change password functionality

### 🎨 **Premium UI/UX**
- Glassmorphism design with gradient backgrounds
- Smooth animations (Framer Motion)
- Mouse-following spotlight effects
- Skeleton loaders for better perceived performance
- Fully responsive (mobile-first)

### 📧 **Communication**
- Contact form with email delivery
- Premium HTML email templates
- OTP delivery system

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Frontend (React 19 + Vite)                 │
│  • Tailwind CSS 4 • Framer Motion • Zustand            │
└─────────────────────────────────────────────────────────┘
                        ↕ REST API
┌─────────────────────────────────────────────────────────┐
│           Backend (Node.js + Express 5)                 │
│  • JWT Auth • Bcrypt • Multer • CORS                   │
└─────────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────────┐
│         Database (MongoDB + Mongoose)                   │
│  • User Collection • Event Collection • OTP Collection  │
└─────────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────────┐
│              External Services                          │
│  • Gemini AI • Ticketmaster • Cloudinary • SendGrid    │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest version with improved performance
- **Vite 7** - Lightning-fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Smooth animations and transitions
- **Zustand 5** - Lightweight state management (1KB)
- **React Router DOM 7** - Client-side routing
- **Axios 1.13** - HTTP client with interceptors
- **React Toastify 11** - Beautiful toast notifications
- **Lucide React** - Icon library

### **Backend**
- **Node.js 18+** - JavaScript runtime
- **Express 5** - Web framework
- **MongoDB + Mongoose 9** - Database and ODM
- **JWT (jsonwebtoken 9)** - Token-based authentication
- **Bcrypt 6** - Password hashing
- **Nodemailer 7 + SendGrid** - Email service
- **Cloudinary 2.8** - Image hosting and optimization
- **Multer 2** - File upload handling
- **Google Generative AI 0.24** - Gemini 2.5 Flash integration

### **External APIs**
- **Google Gemini 2.5 Flash** - AI chat and recommendations
- **Ticketmaster API** - Global event data
- **Cloudinary** - Image storage and CDN
- **SendGrid** - Email delivery

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](https://github.com/user-attachments/assets/b8e6ec41-41a8-4ca1-85da-d44459646662)
*Modern hero section with rotating text and spotlight effects*

### 🤖 AI Assistant
![AI Assistant](https://github.com/user-attachments/assets/5d85ed4c-9e51-4b6a-a961-91dd72496fa4)
*Conversational AI for personalized event recommendations*

### 🌍 Event Discovery
![Event Discovery](https://github.com/user-attachments/assets/572be6e3-0034-4db5-ab3b-f060e784567b)
*Dual-tab interface for local and global events*

---

## ⚙️ Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)
- Git

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/satyajitmishra-dev/Event-Finder.git
cd Event-Finder
```

### 2️⃣ Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
```

### 3️⃣ Environment Variables

**Backend (`server/.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
GEMINI_API_KEY=your_gemini_api_key
EVENT_API_KEY=your_ticketmaster_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
SENDGRID_API_KEY=your_sendgrid_key
EMAIL_FROM=your_email@example.com
NODE_ENV=development
```

**Frontend (`client/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 4️⃣ Run the Application

**Backend (Terminal 1):**
```bash
cd server
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

**Access the app at:** `http://localhost:5173`

---

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy automatically

### Backend (Render)
1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Database (MongoDB Atlas)
1. Create cluster
2. Add database user
3. Whitelist IP addresses
4. Copy connection string to `MONGO_URI`

---

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-register-otp` - Verify registration OTP
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify-login-otp` - Verify login OTP
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/change-password` - Change password

### Event Endpoints
- `GET /api/events` - Get all local events (with filters)
- `GET /api/events/global` - Get global events from Ticketmaster
- `GET /api/events/my` - Get user's created events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event
- `POST /api/events/:id/join` - Join event
- `POST /api/events/:id/leave` - Leave event
- `DELETE /api/events/:id` - Delete event

### AI Endpoints
- `POST /api/ai/chat` - Send message to AI
- `GET /api/ai/recommendations` - Get personalized recommendations

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Email Endpoints
- `POST /api/email/contact` - Send contact form email

---

## 🗺️ Roadmap

### 🔥 High Priority
- [ ] Enhanced AI with persistent chat history
- [ ] Social features (follow users, comments, ratings)
- [ ] Real-time notifications (WebSocket + Push)
- [ ] Mobile app (React Native + PWA)

### 📊 Medium Priority
- [ ] Event editing and cancellation
- [ ] Ticketing system (Stripe/Razorpay)
- [ ] Calendar integration (Google, Apple, Outlook)
- [ ] Advanced search (Elasticsearch, map view)
- [ ] Performance optimizations (Redis, CDN)

### 💡 Low Priority
- [ ] Gamification (badges, points, leaderboards)
- [ ] Business features (analytics, premium listings)
- [ ] Testing suite (Jest, Playwright)
- [ ] Accessibility (WCAG compliance, i18n)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 🐛 Known Issues

- Email delivery may be slow on free Render tier
- Ticketmaster API has rate limits (5 requests/second)
- First load on Render may take 30-60 seconds (cold start)

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Satyajit Mishra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## ✉️ Author

**Satyajit Mishra**

- 🔗 LinkedIn: [linkedin.com/in/satyajitmishra1](https://www.linkedin.com/in/satyajitmishra1/)
- 🐙 GitHub: [github.com/satyajitmishra-dev](https://github.com/satyajitmishra-dev)
- 📧 Email: Contact via [EventFinder](https://eventfinder-2pko.onrender.com/)

---

## 🙏 Acknowledgments

- **Google Gemini** for AI capabilities
- **Ticketmaster** for global event data
- **Cloudinary** for image hosting
- **SendGrid** for email delivery
- **MongoDB Atlas** for database hosting
- **Vercel & Render** for deployment platforms

---

## 🎉 Thank You for Checking Out EventFinder!

*Discover more. Meet more. Experience more.* 🌍✨

<p align="center">
  <a href="https://eventfinder-2pko.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Try%20It%20Live-EventFinder-purple?style=for-the-badge&logo=rocket" />
  </a>
</p>

---

**⭐ Star this repo if you find it helpful!**
