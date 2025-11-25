# 🎉 EventFinder

> **Discover, connect, and never miss an event that matters to you.**

EventFinder is a modern, AI-powered event discovery platform built with the MERN stack. Whether you're looking for local meetups, global conferences, or personalized recommendations, EventFinder has you covered with a sleek, responsive interface and intelligent assistance.

---

## ✨ Key Features

- 🔍 **Smart Event Discovery** — Find amazing events happening around you or anywhere in the world.
- 🤖 **AI-Powered Assistant** — Get personalized event recommendations tailored to your interests.
- 👥 **Community Connection** — Meet like-minded people and expand your network.
- 🔐 **Secure Authentication** — Email + OTP verification keeps your account safe.
- 🎨 **Premium UI/UX** — Modern glassmorphic design with smooth animations.
- 📱 **Fully Responsive** — Works beautifully on desktop, tablet, and mobile.

---

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React 19 | Node.js |
| Vite | Express |
| Tailwind CSS v4 | MongoDB + Mongoose |
| Framer Motion | JWT Authentication |
| React Router DOM | Nodemailer (Email Service) |
| Zustand (State Management) | bcrypt |
| React Toastify | |
| Axios | |

---

## 📸 Demo / Screenshots

Take a look at EventFinder in action:

### Event Discovery
![Event Discovery](image1)
*Browse and discover events with an intuitive, visually appealing interface.*

### AI Chat Assistant
![AI Chat Assistant](image2)
*Get smart, personalized event recommendations from our AI-powered assistant.*

### User Dashboard
![User Dashboard](image3)
*Manage your events and profile with a clean, modern dashboard.*

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance
- Gmail account (for email service)

### Installation

```bash
# Clone the repository
git clone https://github.com/satyajitmishra-dev/Event-Finder.git
cd Event-Finder

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### ⚙️ Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### Run the App

```bash
# Start the server (from /server)
npm run dev

# Start the client (from /client)
npm run dev
```

- **Client:** [http://localhost:5173](http://localhost:5173)
- **Server:** [http://localhost:5000](http://localhost:5000)

---

## 💡 Usage Tips

1. **Sign Up** — Create an account using your email and verify with OTP.
2. **Explore Events** — Browse events by category, location, or date.
3. **Ask the AI** — Use the chat assistant for personalized suggestions.
4. **Save & Share** — Bookmark your favorite events and share with friends.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve EventFinder:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Satyajit Mishra**

- GitHub: [@satyajitmishra-dev](https://github.com/satyajitmishra-dev)

---

<p align="center">
  Made with ❤️ by Satyajit Mishra
</p>