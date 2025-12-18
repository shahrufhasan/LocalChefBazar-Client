# 🍽️ LocalChefBazaar — Marketplace for Local Home-Cooked Meals

LocalChefBazaar is a **full-stack MERN marketplace platform** that connects **local home chefs** with customers looking for **fresh, homemade meals**. The platform supports **real-time ordering**, **secure payments**, **role-based dashboards**, and a smooth user experience for Admins, Chefs, and Customers.

This project was built as part of **B12-A11 Category-15** evaluation to demonstrate real-world application development skills using modern technologies.

---

## 🚀 Live Links

- **Live Client:** https://localchefbazar-5d073.web.app/
- **Live Server:** https://localchefbazar-theta.vercel.app/

---

## 🔐 Demo Login Credentials

### Admin

- **Email:** [shahrufhassan@gmail.com](mailto:shahrufhassan@gmail.com)
- **Password:** 123456

### Chef

- **Email:** [sabrinaakter@gmail.com](mailto:sabrinaakter@gmail.com)
- **Password:** 123456

📌 **Testing Real-Time Orders:**
To see live order updates and payment flow:

- Log in as **Chef** in one browser
- Log in as **User** in another browser
- Place an order and observe **live status & payment updates**

---

## 🎯 Project Purpose

The goal of LocalChefBazaar is to:

- Empower **home cooks** to earn from their kitchen
- Provide customers with **affordable, healthy homemade meals**
- Demonstrate **secure, scalable, real-world MERN stack development**

---

## 🧑‍🤝‍🧑 User Roles & Permissions

### 👑 Admin

- Manage users & fraud status
- Approve/reject chef & admin requests
- View platform statistics
- Monitor orders and payments

### 👨‍🍳 Chef

- Create & manage meals
- Accept / cancel / deliver orders
- View live order requests
- Cannot create meals if marked as fraud

### 👤 User (Customer)

- Browse meals & details
- Place orders & make payments
- Add reviews & favorite meals
- Track live order status

---

## 🔐 Authentication & Security

- Firebase Email/Password Authentication
- JWT-based authentication (httpOnly cookies)
- Role-based route protection
- MongoDB & Firebase credentials secured using **environment variables**

---

## 🧩 Core Features

### 🌐 Public Pages

- Home (Animated Hero, Daily Meals, Reviews)
- Meals (Sorting + Pagination)
- Login / Register

### 🔒 Private Pages

- Meal Details (Reviews + Favorites)
- Order & Payment (Stripe)
- Dashboards (User / Chef / Admin)

---

## 📊 Dashboards Overview

### User Dashboard

- My Profile
- My Orders
- My Reviews
- Favorite Meals

### Chef Dashboard

- My Profile
- Create Meal
- My Meals (Update/Delete)
- Order Requests (Live Updates)

### Admin Dashboard

- My Profile
- Manage Users
- Manage Requests
- Platform Statistics (Recharts)

---

## 💳 Payment Integration

- Stripe payment gateway
- Payment enabled only after chef accepts order
- Payment history stored in MongoDB
- Auto update order payment status

---

## ⭐ Reviews & Favorites

- Users can submit, update, and delete reviews
- Real-time review updates
- Favorite meals stored uniquely per user
- Toast/SweetAlert feedback

---

## 📈 Platform Statistics

Admin can view:

- Total Payments
- Total Users
- Pending Orders
- Delivered Orders

Displayed using **Recharts** with cards & charts.

---

## ⚙️ Tech Stack

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Framer Motion
- React Hook Form
- Axios (with interceptors)
- Recharts
- SweetAlert / Toast

### Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Stripe

### Authentication & Hosting

- Firebase Authentication
- Client: Netlify / Vercel
- Server: Render / Vercel

---

## 📦 NPM Packages Used

- react-hook-form
- axios
- jsonwebtoken
- stripe
- cors
- dotenv
- firebase
- recharts
- framer-motion

---

## 🧪 Additional Implementations

- Dynamic page titles for every route
- Pagination (10 meals per page)
- Mobile-responsive design
- Global loading screen
- Custom error page
- JWT protected APIs
- Axios interceptors

---

## 📂 GitHub Repositories

- **Client Repo:** https://github.com/shahrufhasan/LocalChefBazar-Client
- **Server Repo:** https://github.com/shahrufhasan/LocaChefBazar-server

---

## ✅ Submission Summary

- Admin Email: [shahrufhassan@gmail.com](mailto:shahrufhassan@gmail.com)
- Admin Password: 123456
- Live Client URL: ✅
- GitHub Client Repo: ✅
- GitHub Server Repo: ✅

---

## 🙌 Final Note

LocalChefBazaar is a **complete production-ready MERN application** following best practices in security, UI/UX, scalability, and real-time interaction. This project reflects strong problem-solving ability and real-world system design.

Thank you for reviewing! 🚀
