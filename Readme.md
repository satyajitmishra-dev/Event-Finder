# **EventFinder ✨🔍**

**Discover events, meet people & explore experiences — powered by AI.**

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-Welcome-blue?style=for-the-badge" />
  <img src="https://img.shields.io/github/stars/satyajitmishra-dev/Event-Finder?style=for-the-badge&color=yellow" />
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Build-React%20%7C%20Next.js-61DAFB?style=for-the-badge" />
</p>

EventFinder is a sleek, AI-assisted platform designed to help you browse events, explore experiences, and get personalized recommendations—instantly.

---

## 🚀 **Features**

* 🔎 **Smart event discovery** — search by category, location, date
* 🤖 **AI Assistant** — personalized event recommendations & chat
* 📍 **Local + global data aggregation**
* 🖥️ **Interactive UI** with responsive cards & filters
* 🧩 **Modular architecture** for developers
* 📱 **Mobile-friendly, clean layout**
* 🔐 **Secure environment config** for deployments

---

## 📸 **Screenshots / Demo**

- 💬 Clean, modern UI with interactive dashboard and listings
<img width="1920" height="1080" alt="Screenshot (96)" src="https://github.com/user-attachments/assets/b8e6ec41-41a8-4ca1-85da-d44459646662" />
- 🤖 AI Assistant for personalized recommendations and Q&A  
<img width="1920" height="1080" alt="Screenshot (80)" src="https://github.com/user-attachments/assets/5d85ed4c-9e51-4b6a-a961-91dd72496fa4" />
- 📍 Local & global event aggregation  
<img width="1920" height="1080" alt="Screenshot (81)" src="https://github.com/user-attachments/assets/572be6e3-0034-4db5-ab3b-f060e784567b" />


---

## 🛠️ **Tech Stack**

**Frontend:** React / Next.js
**Styling:** Tailwind CSS
**Backend:** Node.js / Express / Serverless Functions
**AI:** OpenAI API / LLM Integration
**Database (Optional):** PostgreSQL / MongoDB
**Deployment:** Vercel / Docker / Render / Railway

---

# ⚙️ **Local Development**

## 📦 **Prerequisites**

* Node.js 18+
* npm / yarn
* Git
* (Optional) Docker
* (Optional) Database engine (Postgres/MongoDB)

---

## 🚀 **Setup (Step-by-Step)**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/satyajitmishra-dev/Event-Finder.git
cd Event-Finder
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Environment variables

Create a file named **`.env.local`**:

```
NEXT_PUBLIC_API_URL=https://api.example.com
EVENT_API_KEY=your_event_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=postgres://user:pass@localhost:5432/eventfinder
PORT=3000
```

✔️ `EVENT_API_KEY` — Eventbrite / Meetup / custom APIs
✔️ `OPENAI_API_KEY` — AI assistant integration
✔️ `DATABASE_URL` — required only if using a DB

---

## ▶️ **Running the App**

### Development mode

```bash
npm run dev
```

### Production build

```bash
npm run build
npm start
```

Your app runs at: **[http://localhost:3000/](http://localhost:3000/)**

---

# 🧪 **Tests & Quality**

Run tests:

```bash
npm run test
```

Lint code:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

---

# 🐳 **Docker Support**

### Build Docker image

```bash
docker build -t eventfinder .
```

### Run container

```bash
docker run -p 3000:3000 --env-file .env.local eventfinder
```

---

# 💡 **Troubleshooting**

| Issue                     | Solution                            |
| ------------------------- | ----------------------------------- |
| Port already in use       | Change `PORT` in `.env.local`       |
| Env variables not loading | Restart dev server                  |
| AI not responding         | Check `OPENAI_API_KEY`              |
| Event API errors          | Verify API key & API quota          |
| Database not connecting   | Confirm `DATABASE_URL` & migrations |

---

# 🎯 **Usage Tips**

Try asking the AI Assistant:

> "Find tech meetups in Kolkata next weekend"
> "Suggest concerts happening in Bangalore today"
> "What events are trending in India this month?"

---

# 🤝 **Contributing**

<p align="center">
  <img src="https://img.shields.io/badge/Contributions-Welcome-brightgreen?style=for-the-badge" />
</p>

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Submit a pull request

---

# 📄 **License**
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

---

# ✉️ **Author**

**Satyajit Mishra**
🔗 Linkedin: [[https://www.linkedin.com/in/satyajitmishra1/](https://www.linkedin.com/in/satyajitmishra1/)]

---

# 🎉 **Thank You for Checking Out EventFinder!**

*Discover more. Meet more. Experience more.* 🌍✨
