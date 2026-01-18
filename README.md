# 🚗 VehicleHub

**VehicleHub** is a comprehensive vehicle management and rental platform designed to streamline the experience of listing, exploring, and booking vehicles. It serves as a bridge between vehicle owners and users looking for premium transportation solutions, offering a seamless, secure, and visually stunning experience.

---

## 📑 Table of Contents

1. [Short Description](#-short-description)
2. [Technologies Used](#-technologies-used)
3. [Features](#-features)
4. [The Development Process](#-the-development-process)
5. [Challenges Faced](#-challenges-faced)
6. [Key Learnings](#-key-learnings)
7. [Areas for Improvement](#-areas-for-improvement)
8. [Future Roadmap](#-future-roadmap)
9. [How to Run the Project](#-how-to-run-the-project)

---

## 📝 Short Description

VehicleHub works as a centralized dashboard and marketplace for vehicle rentals. It separates concerns between **Admins** (who manage the fleet and listings) and **Users** (who browse, book, and review vehicles). The platform emphasizes a modern, responsive user interface with robust backend validation and secure payment processing.

---

## 🛠 Technologies Used

The project is built using a modern **MERN-like** stack, leveraging Next.js for the frontend and a strongly typed Node.js back-end.

| Category | Technology | Usage | Why Used? |
|----------|------------|-------|-----------|
| **Frontend** | **Next.js 14 (App Router)** | Main Framework | Offers server-side rendering (SSR) for SEO and fast initial loads. |
| | **TypeScript** | Language | Ensures type safety and reduces runtime errors across the app. |
| | **TailwindCSS** | Styling | Rapid UI development with utility-first classes and consistent design tokens. |
| | **Framer Motion / GSAP** | Animations | Delivers high-performance, complex animations for a premium feel. |
| | **Redux / Context API** | State Management | Manages complex global states like User Auth and Booking Data. |
| | **React Hook Form + Zod** | Forms | Efficient form handling with schema-based validation. |
| **Backend** | **Node.js + Express** | Server | Scalable, event-driven architecture perfect for handling concurrent API requests. |
| | **Mongoose (MongoDB)** | Database | Flexible NoSQL schema design ideal for evolving vehicle data structures. |
| | **Firebase Admin** | Auth Support | Verifies ID tokens to ensure secure, role-based access control. |
| | **Stripe** | Payments | Secure, industry-standard payment processing integration. |
| **Tools** | **Version Control** | Git | Managed code history and feature branching. |

---

## 🚀 Features

### **1. Advanced Vehicle Discovery**
* **Problem:** Users struggle to find the right vehicle across unorganized lists.
* **Solution:** A powerful **Explore Page** with dynamic filtering (Price, Category, Rating) and search functionality, backed by optimized backend queries.

### **2. Secure Authentication & Authorization**
* **Problem:** Unverified users and lack of role boundaries.
* **Solution:** Integrated **Firebase Auth** with custom JWT verification. Roles (`Admin`, `User`) are strictly enforced via middleware to protect sensitive routes like the Dashboard.

### **3. Role-Based Dashboards**
* **Problem:** Different users need different tools.
* **Solution:** 
    * **User Dashboard:** View booking history, manage profile, and check payment status.
    * **Admin Dashboard:** CRUD operations for vehicles, user management, and booking oversight with data visualization (Recharts).

### **4. Booking & Payments**
* **Problem:** Manual booking is slow and prone to error.
* **Solution:** Automated booking flow with real-time availability checks and secure **Stripe** payment integration.

---

## 🏗 The Development Process

The project followed a structured **Agile-inspired workflow**:

1. **Planning & Design:** Defined the database schema (ER Diagram) and created high-fidelity wireframes for critical pages (Home, Dashboard, Details).
2. **Backend Development:** Built the RESTful API with Express.js, setting up Models (Vehicle, User, Booking) and Controllers first to ensure data flow readiness.
3. **Frontend Integration:** Developed the Next.js application, integrating UI components with backend endpoints using `axios`.
4. **State Management & Logic:** Implemented Authentication flows and complex state logic for filters and forms.
5. **Polishing & Optimization:** Added Framer Motion animations, optimized images, and conducted responsiveness testing.

---

## 🛑 Challenges Faced

1. **Hydration Errors in Next.js:** 
   * *Issue:* Mismatch between server-rendered HTML and client-side React hydration, especially with `localStorage`.
   * *Solution:* Used `useEffect` to ensure certain components only render after mounting on the client.

2. **Complex Filtering Logic:**
   * *Issue:* creating a flexible filter system that handles multiple optional parameters efficiently.
   * *Solution:* Built a dynamic query builder in the backend controller to handle various permutations of query strings.

3. **Vercel Deployment Issues:** 
   * *Issue:* Build failures caused by strict type checking and environment variable misconfigurations.
   * *Solution:* Rigorous implementation of TypeScript interfaces and ensuring all `.env` variables were correctly set in the Vercel dashboard.

---

## 🧠 Key Learnings

* **TypeScript Dominance:** Using strict types saved countless hours of debugging by catching data structure mismatches early.
* **Next.js App Router:** Gained deep operational knowledge of Server Components vs. Client Components and when to use each for maximum performance.
* **State Management:** Learned that not everything needs Redux; local state combined with Server State (via React Query or similar patterns) is often cleaner.

---

## 🛠 Areas for Improvement

* **Test Coverage:** Currently lacks comprehensive Unit and Integration tests (Jest/Cypress).
* **Error Handling:** While present, error messages could be more user-friendly and granular in some edge cases.

---

## 🔮 Future Roadmap

* **Real-time Chat:** Implement Socket.io to allow direct communication between renters and owners.
* **AI Recommendations:** Use machine learning to suggest vehicles based on user booking history and preferences.
* **Mobile Application:** Port the functionality to a React Native mobile app for on-the-go booking.

---

## 🏃‍♂️ How to Run the Project

Follow these steps to set up the project locally.

### Prerequisites
* Node.js (v18+)
* MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/VehicleHub.git
cd VehicleHub
```

### 2. Backend Setup
```bash
cd backend
npm install
```
* Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```
* Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```
* Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```
* Run the client:
```bash
npm run dev
```

### 4. Access the App
Open [http://localhost:3000](http://localhost:3000) in your browser.
