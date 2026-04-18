# 🌐 CodeAlpha Social Media Platform

A modern **full-stack social media application** built with the **MERN Stack (MongoDB, Express, React, Node.js)** and **Tailwind CSS** for a polished, responsive interface.

This platform enables users to **register, log in, publish posts, like content, leave comments, follow other users, and explore profiles** through a clean feed and search experience.

This project demonstrates **professional full-stack architecture**, **RESTful API design**, **secure authentication**, and **modern UI/UX patterns** with animated loading states and feedback.

---

# 📛 Badges

### 🖥️ Core Stack

![Stack](https://img.shields.io/badge/Stack-MERN-3C873A?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge)
![Express.js](https://img.shields.io/badge/Backend-Express.js-000000?style=for-the-badge)
![React.js](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge)

### 🎨 UI / UX

![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38BDF8?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Responsive-Design-FF6F61?style=for-the-badge)
![Modern UI](https://img.shields.io/badge/UI-Modern%20Interface-8A2BE2?style=for-the-badge)
![Animations](https://img.shields.io/badge/Animations-Framer%20Motion-7B68EE?style=for-the-badge)

### 🔐 Security & Authentication

![JWT](https://img.shields.io/badge/Auth-JWT-FFB400?style=for-the-badge)
![BCrypt](https://img.shields.io/badge/Password-BCrypt-0A66C2?style=for-the-badge)

### 🧰 Developer Tools

![Postman](https://img.shields.io/badge/API%20Testing-Postman-F76935?style=for-the-badge)
![VSCode](https://img.shields.io/badge/Editor-VSCode-007ACC?style=for-the-badge)
![Git](https://img.shields.io/badge/Version%20Control-Git-F1502F?style=for-the-badge)
![npm](https://img.shields.io/badge/Package%20Manager-npm-CB0000?style=for-the-badge)

---

# 📑 Table of Contents

- Overview
- Key Objectives
- Core Features
- Technology Stack
- System Architecture
- Project Structure
- API Endpoints
- Getting Started
- Development Roadmap
- Future Improvements
- License

---

# 📌 Overview

This project is a **full-stack social media platform** designed to showcase modern web development practices using the **MERN stack**.

The system provides essential social networking capabilities such as:

- user registration and login
- protected authenticated routes
- publishing posts
- liking and commenting
- following and unfollowing other users
- search and profile exploration

The application follows a **clean client-server architecture**, separating frontend presentation from backend business logic and database management.

---

# 🎯 Key Objectives

The goal of this project is to:

- Implement a **complete full-stack application**
- Design a **RESTful API architecture**
- Demonstrate **secure authentication workflows**
- Build a **modern responsive UI**
- Implement **core social media functionality**
- Maintain a **clean and scalable project structure**

---

# 🧩 Core Features

## 👤 User Authentication

Secure authentication system including:

- User registration
- User login
- Password hashing with **bcrypt**
- **JWT-based authentication**
- Protected API routes

---

## 📝 Social Feed & Publishing

Users can:

- Create new posts
- View a global feed of posts
- See post content, author, and timestamp
- Like and unlike posts
- Delete their own posts

---

## 💬 Comments

Users can:

- Add comments to posts
- View comments on posts
- Delete comments they created
- See comments in a responsive animated list

---

## 👥 Profiles & Followers

Users can:

- View user profiles
- Follow and unfollow other users
- See follower and following counts
- View posts by a specific user
- Open follower / following lists in a modal

---

## 🔎 Search Experience

The search page allows users to:

- Search for other users
- Navigate to user profiles
- Discover users with live trending behavior

---

# 🧰 Technology Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- React Icons

---

## Development Tools

- Git & GitHub
- Postman (API Testing)
- Visual Studio Code
- ESLint

---

# 🏗 System Architecture

The application follows a **client-server architecture**.

```
React Frontend
      │
      │ HTTP Requests
      ▼
Express.js REST API
      │
      │ Database Queries
      ▼
MongoDB Database
```

---

# 🗂 Project Structure

## Backend Structure

```
backend/

├─ src/
│  ├─ config/
│  │   └─ db.js
│  │
│  ├─ controllers/
│  │   ├─ authController.js
│  │   ├─ postController.js
│  │   ├─ commentController.js
│  │   └─ userController.js
│  │
│  ├─ routes/
│  │   ├─ authRoutes.js
│  │   ├─ postRoutes.js
│  │   ├─ commentRoutes.js
│  │   └─ userRoutes.js
│  │
│  ├─ middleware/
│  │   └─ auth.middleware.js
│  │
│  ├─ models/
│  │   ├─ User.js
│  │   ├─ Post.js
│  │   └─ Comment.js
│  │
│  ├─ utils/
│  │   └─ generateToken.js
│  │
│  └─ server.js

├─ .env
├─ package.json
└─ README.md
```

---

## Frontend Structure

```
frontend/

├─ src/
│  ├─ components/
│  │   ├─ Layout.jsx
│  │   ├─ Navbar.jsx
│  │   ├─ UI.jsx
│  │   └─ ToastContext.jsx
│  │
│  ├─ context/
│  │   └─ AuthContext.jsx
│  │
│  ├─ features/
│  │   ├─ auth/
│  │   │   └─ authService.js
│  │   ├─ comment/
│  │   │   ├─ CommentSection.jsx
│  │   │   └─ commentService.js
│  │   ├─ post/
│  │   │   ├─ PostList.jsx
│  │   │   ├─ CreatePostModal.jsx
│  │   │   └─ postService.js
│  │   └─ user/
│  │       └─ userService.js
│  │
│  ├─ pages/
│  │   ├─ Home.jsx
│  │   ├─ Login.jsx
│  │   ├─ Profile.jsx
│  │   ├─ Register.jsx
│  │   └─ Search.jsx
│  │
│  ├─ routes/
│  │   └─ ProtectedRoute.jsx
│  │
│  ├─ services/
│  │   └─ api.js
│  │
│  ├─ App.jsx
│  └─ main.jsx
│
├─ package.json
├─ vite.config.js
└─ README.md
```

---

# 🔗 API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Users

```
GET /api/users/:id
PUT /api/users/update
PUT /api/users/follow/:id
```

## Posts

```
GET /api/posts
POST /api/posts
DELETE /api/posts/:id
PUT /api/posts/like/:id
```

## Comments

```
GET /api/comments/:postId
POST /api/comments
DELETE /api/comments/:id
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js (LTS)
- npm
- MongoDB

---

## Clone the Repository

```bash
git clone https://github.com/SuadAbrar/Social-Media-Platform.git
cd CodeAlpha_Social-Media-Platform
```

---

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Run the Application

### Start Backend

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

### Start Frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🛣 Development Roadmap

### Phase 1 — Backend Foundation

- Express server setup
- MongoDB connection
- Authentication system

### Phase 2 — Post System

- Post API
- Global feed
- Post creation and deletion

### Phase 3 — Social Features

- Like and comment workflows
- Follow / unfollow flows
- Profile pages and follower lists

### Phase 4 — UI/UX Polish

- Skeleton loaders
- Toast notifications
- Page transitions
- Responsive design

---

# 🚀 Future Improvements

Possible future enhancements include:

- Image upload support
- Real-time chat or notifications
- Dark mode theme
- Advanced search and discovery
- Infinite scroll and pagination
- Admin dashboard

---

# 📜 License

This project is developed for **educational and internship purposes** and demonstrates full-stack development using the MERN stack.
