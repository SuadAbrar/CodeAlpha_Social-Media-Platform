# 🌐 Mini Social Media Platform (MERN Stack)

A full-stack mini social media application built using the MERN stack. This project demonstrates core social media functionalities such as user authentication, profile management, posting content, commenting, liking posts, and following other users.

---

## 🚀 Features

### 🔐 Authentication

* User registration and login
* Secure password hashing
* JWT-based authentication

### 👤 User Profile

* View and update user profile
* Follow / Unfollow users
* Display followers and following count

### 📝 Posts

* Create and delete posts
* View all posts (global feed)
* View posts by specific users

### ❤️ Likes

* Like and unlike posts
* Real-time UI updates (planned)

### 💬 Comments

* Add comments to posts
* Delete comments
* View all comments for a post

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* Tailwind CSS
* JavaScript
* React.js

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📁 Project Structure

```
/client     → React frontend
/server     → Express backend

/server
  /controllers
  /models
  /routes
  /middleware
  /config

/client
  /components
  /pages
  /services
  /context
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/SuadAbrar/Social-Media-Platform.git
cd Social-Media-Platform
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📌 API Endpoints (Overview)

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Users

* GET `/api/users/:id`
* PUT `/api/users/update`
* PUT `/api/users/follow/:id`

### Posts

* POST `/api/posts`
* GET `/api/posts`
* DELETE `/api/posts/:id`
* PUT `/api/posts/like/:id`

### Comments

* POST `/api/comments`
* GET `/api/comments/:postId`
* DELETE `/api/comments/:id`

---

## 🎯 Project Goals

* Practice full-stack MERN development
* Implement RESTful API design
* Learn authentication and authorization
* Build scalable backend architecture
* Create a responsive and modern UI

---

## 🔥 Future Improvements

* Real-time notifications
* Image upload with cloud storage
* Chat/messaging system
* Advanced search and filtering
* Dark mode UI

---

## 🤝 Contributing

This project is part of an internship task. Contributions are welcome for learning purposes.

---

## 📜 License

This project is for educational purposes.

---

## 👨‍💻 Author

Developed by [Your Name]

---
