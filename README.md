# LibaraQuantum Library Management System 📚

**Live Demo:** [https://libraquantum.web.app/](https://libraquantum.web.app/)

LibaraQuantum is a clean, minimal, and fully functional Library Management System built using **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, **Node.js**, **Express.js**, and **MongoDB**.

Designed to simplify library operations with intuitive book and borrowing management features, wrapped in a responsive UI.

---

## 🚀 Features

### 📘 Book Management

- List all books in table or grid views
- Add, edit, and delete books
- Pagination support
- Confirmation modals for destructive actions
- Real-time availability tracking

### 📚 Borrowing System

- Borrow books with quantity and due date validation
- Prevent over-borrowing based on available stock
- View aggregated borrow summary by title and quantity

### 💻 UI & UX

- Fully responsive layout for mobile, tablet, and desktop
- Minimalist design using Tailwind CSS
- User feedback with toast notifications
- Type-safe, validated forms using React Hook Form

---

## 🧱 Tech Stack

| Layer      | Technology                |
| ---------- | ------------------------- |
| Frontend   | React + TypeScript        |
| State Mgmt | Redux Toolkit + RTK Query |
| Backend    | Node.js + Express.js      |
| Database   | MongoDB + Mongoose        |
| Hosting    | Firebase                  |
| Styling    | Tailwind CSS              |

---

## 🖥️ Frontend Setup

## Clone the repository

git clone https://github.com/simantabarua/LibriX.git
cd libraquantum/client

## Install dependencies

npm install

## Start the development server

npm run dev

## Create .env file in the client folder

## Example:

echo "VITE_API_BASE_URL=http://localhost:5000" > .env

## Running the Project

Make sure both frontend and backend servers are running:

Frontend: http://localhost:5173 (Vite default)
Backend API: http://localhost:5000

#

# License

This project is open-source and available under the MIT License.
