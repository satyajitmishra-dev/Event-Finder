# EventFinder

A modern, AI-powered event discovery platform built with the MERN stack.

## Features

- 🎯 **Event Discovery**: Find amazing events happening around you
- 🤖 **AI Assistant**: Get personalized event recommendations
- 👥 **Connect**: Meet like-minded people at events
- 🌍 **Local & Global**: Events from your city to worldwide
- 🔐 **Secure Authentication**: Email + OTP verification
- 🎨 **Premium UI**: Modern glassmorphic design with animations

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS v4
- Framer Motion
- React Router DOM
- Zustand (State Management)
- React Toastify
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer (Email Service)
- bcrypt

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Gmail account for email service

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/satyajitmishra-dev/Event-Finder.git
cd Event-Finder
```

2. **Install dependencies**

Server:
```bash
cd server
npm install
```

Client:
```bash
cd client
npm install
```

3. **Environment Variables**

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

4. **Run the application**

Server (from server directory):
```bash
npm run dev
```

Client (from client directory):
```bash
npm run dev
```

The client will run on `http://localhost:5173` and the server on `http://localhost:5000`.

## Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect your repository to the deployment platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Update API base URL in `client/src/api/axios.js` to your deployed backend URL
5. Deploy

## Environment Setup for Production

Update `client/src/api/axios.js`:
```javascript
const api = axios.create({
    baseURL: process.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
});
```

Add to `client/.env.production`:
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Features Implemented

✅ User Authentication (Email + OTP)  
✅ Event Management  
✅ AI Chat Assistant  
✅ Premium UI/UX with Glassmorphism  
✅ Toast Notifications  
✅ Responsive Design  
✅ Form Validation  

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Author

Satyajit Mishra
- GitHub: [@satyajitmishra-dev](https://github.com/satyajitmishra-dev)