# 🍽️ LocalChefBazar

A full-stack MERN marketplace platform connecting local home chefs with customers looking for fresh, homemade meals.

![LocalChefBazar Screenshot](https://i.ibb.co/8Df83wbc/Screenshot-2025-12-31-at-12-47-30-AM.png)

---

## 🔗 Live Links

| | |
|---|---|
| 🌐 **Live Site** | [https://localchefbazar-5d073.web.app/](https://localchefbazar-5d073.web.app/) |
| 🖥️ **Live Server** | [https://localchefbazar-theta.vercel.app/](https://localchefbazar-theta.vercel.app/) |
| 📂 **Client Repo** | [https://github.com/shahrufhasan/LocalChefBazar-Client](https://github.com/shahrufhasan/LocalChefBazar-Client) |
| 📂 **Server Repo** | [https://github.com/shahrufhasan/LocaChefBazar-server](https://github.com/shahrufhasan/LocaChefBazar-server) |

---

## 📖 Project Overview

**LocalChefBazar** is a full-stack MERN marketplace that connects local home chefs with customers looking for fresh, homemade meals. The platform supports real-time ordering, secure Stripe payments, role-based dashboards (Admin, Chef, User), and a seamless user experience.

### 🎯 Project Purpose

- Empower **home cooks** to earn from their kitchen
- Provide customers with **affordable, healthy homemade meals**
- Demonstrate **secure, scalable, real-world MERN stack development**

---

## 🛠️ Technologies Used

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Payment & Auth
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

### Deployment
![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Core Features

### 🔐 Authentication & Security
- 🔑 Firebase Email/Password Authentication
- 🛡️ JWT-based authentication with httpOnly cookies
- 🚫 Role-based route protection
- 🔒 Environment variables for sensitive data

### 🧑‍🤝‍🧑 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **👑 Admin** | Manage users, approve/reject requests, view platform statistics, monitor orders |
| **👨‍🍳 Chef** | Create & manage meals, accept/cancel/deliver orders, view live order requests |
| **👤 User** | Browse meals, place orders, make payments, add reviews & favorites |

### 💳 Payment Integration
- ✅ Stripe payment gateway
- ✅ Payment enabled only after chef accepts order
- ✅ Payment history stored in MongoDB
- ✅ Auto update order payment status

### 📊 Platform Statistics (Admin)
- Total Payments
- Total Users
- Pending Orders
- Delivered Orders
- Displayed using **Recharts**

### ⭐ Reviews & Favorites
- Submit, update, and delete reviews
- Real-time review updates
- Favorite meals stored per user

---

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "firebase": "^10.x",
  "tailwindcss": "^3.x",
  "framer-motion": "^10.x",
  "react-hook-form": "^7.x",
  "recharts": "^2.x",
  "sweetalert2": "^11.x",
  "react-hot-toast": "^2.x",
  "@stripe/react-stripe-js": "^2.x",
  "@tanstack/react-query": "^5.x"
}
```

### Backend Dependencies
```json
{
  "express": "^4.x",
  "mongoose": "^7.x",
  "cors": "^2.x",
  "dotenv": "^16.x",
  "jsonwebtoken": "^9.x",
  "cookie-parser": "^1.x",
  "stripe": "^14.x"
}
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Firebase account
- Stripe account

### Step 1: Clone the Repository
```bash
git clone https://github.com/shahrufhasan/LocalChefBazar-Client.git
cd LocalChefBazar-Client
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_API_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Step 4: Run the Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
```
http://localhost:5173
```

---

## 📸 Screenshots

### Home Page
![Home Page](https://i.ibb.co/8Df83wbc/Screenshot-2025-12-31-at-12-47-30-AM.png)

### All Meals Page
![All Meals](https://i.ibb.co/23JkSg4K/Screenshot-2025-12-31-at-12-49-45-AM.png)

### Meal Details Page
![Meal Details](https://i.ibb.co/hxDt1JGd/Screenshot-2025-12-31-at-12-50-51-AM.png)

### Dashboard
![Dashboard](https://i.ibb.co/LDHd7Y75/Screenshot-2025-12-31-at-12-51-31-AM.png)

---

## 🔐 Demo Login Credentials

### Admin
| Email | Password |
|-------|----------|
| shahrufhassan@gmail.com | 123456 |

### Chef
| Email | Password |
|-------|----------|
| sabrinaakter@gmail.com | 123456 |

📌 **Testing Real-Time Orders:**
- Log in as **Chef** in one browser
- Log in as **User** in another browser
- Place an order and observe **live status & payment updates**

---

## 🧪 Additional Implementations

- ✅ Dynamic page titles for every route
- ✅ Pagination (10 meals per page)
- ✅ Mobile-responsive design
- ✅ Global loading screen
- ✅ Custom error page
- ✅ JWT protected APIs
- ✅ Axios interceptors

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

**Shahruf Hasan**

- 📧 Email: [info.shahrufhasan@gmail.com](mailto:info.shahrufhasan@gmail.com)
- 💼 LinkedIn: [shahrufhasan](https://www.linkedin.com/in/shahrufhasan/)
- 🌐 Portfolio: [shahruf-portfolio.netlify.app](https://shahruf-portfolio.netlify.app/)
- 🐙 GitHub: [shahrufhasan](https://github.com/shahrufhasan)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/shahrufhasan">Shahruf Hasan</a>
</p>
