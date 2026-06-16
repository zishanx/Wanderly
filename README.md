# 🌍 Wanderly — Travel Booking App

A full-stack travel agency web app where users can explore packages, book trips, and pay securely via Razorpay. Admins can manage packages and bookings through a dedicated dashboard.

🔗 **Live Demo**: https://wanderly-cfqb.vercel.app/

---

## ✨ Features

**User**
- Browse and explore travel packages
- View detailed itineraries with timelines
- Book packages with departure date and traveler count
- Secure payment via Razorpay (with HMAC verification)
- View personal bookings

**Admin**
- Create, update, and delete travel packages
- Manage all bookings
- Dynamic nested-field modal for package editing

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), Tailwind CSS, GSAP |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Payments | Razorpay |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📸 Screenshots

<img width="1897" height="899" alt="image" src="https://github.com/user-attachments/assets/99da26a6-4d6c-4bb5-97bd-e4cbdd6195b0" />
> <img width="1894" height="909" alt="image" src="https://github.com/user-attachments/assets/84d0d74e-38fd-475f-827b-d7472618fb36" />


---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB URI
- Razorpay Key ID & Secret

### Clone the repo

```bash
git clone https://github.com/zishanx/wanderly.git
cd wanderly
```

### Backend setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

```bash
npm run dev
```

### Frontend setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT signing |
| `RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |

---

## 👤 Author

**MD Zishan Ali Khan**
- GitHub: [@zishanx](https://github.com/zishanx)
- LinkedIn: [linkedin.com/in/zizzy07](https://linkedin.com/in/zizzy07)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
