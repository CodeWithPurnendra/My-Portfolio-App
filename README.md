# Full-Stack PERN Portfolio & Interactive Workspace

> A high-performance, modern developer portfolio built from scratch using the **PERN stack**, featuring immersive 3D web graphics, scroll-driven GSAP animations, and a secure backend API that persists visitor messages directly into PostgreSQL.

---

## 🛠️ Tech Stack

### Frontend
* **React (Vite):** Component-driven UI architecture with dynamic lazy-loading code splitting.
* **Tailwind CSS:** Utility-first styling with responsive dark glassmorphism layouts.
* **GSAP & ScrollTrigger:** High-performance timelines and scroll-driven micro-interactions.
* **Three.js / WebGL:** Interactive 3D scenes and custom mesh rendering.

### Backend & Database
* **Node.js & Express:** Lightweight REST API server with custom JSON parsing and CORS middleware.
* **PostgreSQL (`pg`):** Relational database managing contact submissions, timestamps, and service array storage.
* **Environment Security:** Configured with `dotenv` for secure secret management.

---

## ✨ Key Features

* **Interactive Scope Builder / Contact Form:** Visitors can select project services and submit inquiries that validate client-side and persist securely to a PostgreSQL table via a custom REST endpoint (`POST /api/contact`).
* **Optimized Performance:** Implemented `React.lazy()` and `Suspense` code-splitting to maintain fast initial page loads despite heavy 3D and animation dependencies.
* **Robust Error Handling:** Parameterized SQL queries protecting against SQL injection, paired with comprehensive input validation and server error logging.

---

## 📂 Project Architecture

```text
portfolio/
├── server/                    # Express Backend
│   ├── server.js              # API gateway, routing, and middleware
│   ├── db.js                  # PostgreSQL connection pool configuration
│   ├── .env                   # Environment secrets (ignored by git)
│   └── package.json           # Server dependencies
└── src/                       # React Frontend
    ├── Components/            # Modular UI components (Hero, Navbar, About, Projects)
    ├── App.jsx                # Root component with code-splitting & GSAP triggers
    ├── main.jsx               # React DOM entry point
    └── index.css              # Tailwind global directives & custom styles
```
## 🚀 Getting Started Locally

Follow these steps to run the portfolio and its backend server locally on your machine.

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL installed and running locally

### 1. Clone the Repository

```bash
git clone https://github.com/CodeWithPurnendra/My-Portfolio-App.git
```
```
cd my-portfolio-app
```

### 2. Set Up the Database

Open your PostgreSQL terminal (`psql`) or a database management tool (like pgAdmin or DBeaver) and create the database and table:

```sql
CREATE DATABASE portfolio_db;
\c portfolio_db;

CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  services TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configure the Backend

Navigate to your server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory with your local credentials:

```env
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=portfolio_db
DB_PASSWORD=your_postgres_password
DB_PORT=5432
```

Start the backend development server:

```bash
node --watch server.js
```

### 4. Configure and Run the Frontend

Open a second terminal window, navigate back to the root/frontend directory, install dependencies, and start Vite:

```bash
npm install
npm run dev
```

Your app will be live at `http://localhost:5173`, communicating with your Express API running on `http://localhost:5000`.

## 🔌 API Endpoints

| Method | Endpoint       | Description                                                   | Payload Example                                                                              |
| ------ | -------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| GET    | `/api/health`  | Verifies server and database connection status.               | None                                                                                         |
| POST   | `/api/contact` | Validates input and persists contact scope to PostgreSQL.     | `{"name": "Jane", "email": "jane@example.com", "message": "Hello", "services": ["Full-Stack"]}` |

## 👤 Author

**Purnendra Nishad**

- Full-Stack Software Engineer & Creative Developer
- GitHub: CodeWithPurnendra
