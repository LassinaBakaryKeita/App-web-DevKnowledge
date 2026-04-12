<div align="center">

# ⚡ DevKnowledge

**A modern full-stack blog platform built for software engineers**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Author](#-author)

---

## 🧠 About the Project

**DevKnowledge** is a full-stack blogging platform where software engineers can publish technical articles, interact with the community through likes and comments, and manage their own content. The platform was built from scratch with a clean, modern UI and a robust REST API backend.

> Built as a personal project to practice full-stack development with React, Node.js, Express, and MongoDB.

---

## ✨ Features

### 👤 Authentication
- User registration and login with JWT
- Persistent sessions via localStorage
- Protected routes (write, comment, like)

### 📝 Articles
- Create, read, update, and delete articles
- Rich article detail page with hero image
- Author-only edit/delete permissions
- "My Articles" personal dashboard

### 💬 Comments
- Add, edit, and delete comments per article
- Owner-only edit/delete (verified by userId comparison)
- Real-time comment count on article cards
- Populated author names via Mongoose populate

### ❤️ Likes
- Toggle like/dislike on articles
- Persistent like state across sessions
- Live like counter synced with backend

### 🔍 Search (Coming Soon)
- Full-text article search by title (UI ready, feature in progress)

### 🎨 UI/UX
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and hover effects
- Editorial-style article detail page
- "Coming Soon" popup for upcoming features

---

## 🛠 Tech Stack

### Frontend
| Technology | Usage |
|---|---|
| React 18 | UI library |
| React Router v6 | Client-side routing |
| CSS Modules | Component-scoped styling |
| Fetch API | HTTP requests |
| Google Fonts | Typography (Sora, DM Sans, Lora, Playfair Display) |

### Backend
| Technology | Usage |
|---|---|
| Node.js | Runtime |
| Express.js | REST API framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM / schema validation |
| JWT (jsonwebtoken) | Authentication |
| bcrypt | Password hashing |
| Multer | Image uploads |
| dotenv | Environment variables |
| CORS | Cross-origin resource sharing |

---

## 📁 Project Structure

```
devknowledge/
│
├── frontend/                    # React application
│   ├── public/
│   └── src/
│       ├── components/          # Reusable components
│       │   ├── Article.jsx      # Article card component
│       │   ├── Header.jsx       # Navigation bar
│       │   └── Footer.jsx       # Footer
│       ├── pages/               # Route-level pages
│       │   ├── Home.jsx
│       │   ├── Blog.jsx
│       │   ├── Login.jsx
│       │   ├── CreateArticle.jsx
│       │   ├── MyArticles.jsx
│       │   ├── commentArticle.jsx
│       │   └── detailedInformationArticle.jsx
│       ├── sections/            # Home page sections
│       │   ├── HeroSection.jsx
│       │   ├── About.jsx
│       │   ├── Features.jsx
│       │   └── LatestArticles.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css            # Global design system
│
└── backend/                     # Node.js / Express API
    ├── config/
    │   ├── db.js                # MongoDB connection
    │   └── .env                 # Environment variables
    ├── controllers/
    │   ├── userController.js
    │   ├── articleController.js
    │   ├── commentController.js
    │   └── likeController.js
    ├── models/
    │   ├── userModel.js
    │   ├── articleModel.js
    │   ├── commentModel.js
    │   └── likeModel.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── articleRoutes.js
    │   ├── commentRoutes.js
    │   └── likeRoutes.js
    ├── uploads/                 # Uploaded article images
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn
- A MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/devknowledge.git
cd devknowledge
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `config/.env` file (see [Environment Variables](#-environment-variables))

```bash
nodemon server.js
# Server running on http://localhost:5000
```

### 3. Setup the Frontend

```bash
cd frontend
npm install
npm run dev
# App running on http://localhost:5173
```

---

## 🔐 Environment Variables

Create a file at `backend/config/.env` with the following:

```env
PORT=5000
PASS=your_mongodb_atlas_password
JWT_SECRET=your_jwt_secret_key
```

> ⚠️ Never commit your `.env` file. Make sure it's listed in `.gitignore`.

---

## 📡 API Reference

### Auth — `/api/user`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive JWT |
| POST | `/logout` | Logout user |

### Articles — `/api/article`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create a new article (+ image upload) |
| GET | `/all` | Get all articles |
| GET | `/mine/:userId` | Get articles by a specific user |
| PUT | `/update/:articleId` | Update an article |
| DELETE | `/delete/:articleId` | Delete an article |

### Comments — `/api/comment`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add` | Add a comment |
| GET | `/get/:articleId` | Get all comments for an article |
| GET | `/count/:articleId` | Get comment count for an article |
| PUT | `/update/:commentId` | Update a comment |
| DELETE | `/delete/:commentId` | Delete a comment |

### Likes — `/api/like`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/toggle` | Like or unlike an article |
| GET | `/check` | Check if a user liked an article |

---

## 🗺 Roadmap

- [x] User authentication (JWT)
- [x] Article CRUD
- [x] Comment system (CRUD + owner check)
- [x] Like/dislike system
- [x] Dynamic comment count on cards
- [x] Responsive design
- [ ] Article search by title
- [ ] User profile page
- [ ] Article tags & filtering
- [ ] Rich text / Markdown editor
- [ ] Email notifications
- [ ] Admin dashboard

---

## 👤 Author

**Lassina Bakary Keïta**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/lassina-bakary-ke%C3%AFta-b28626370/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/LassinaBakaryKeita)
[![TikTok](https://img.shields.io/badge/TikTok-Follow-000000?style=flat-square&logo=tiktok)](https://www.tiktok.com/@lassina.bakary.ke)

---

<div align="center">

Made with ❤️ by Lassina Bakary Keïta

⭐ If you found this project useful, please give it a star!

</div>
