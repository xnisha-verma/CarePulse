# 🩺 CarePulse

<!-- ![CarePulse Banner](https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000&h=600) -->

**Live Demo:** [https://carepulseweb.netlify.app/](https://carepulseweb.netlify.app/)

**CarePulse** is a modern, full-stack healthcare appointment booking platform that seamlessly connects patients with specialized doctors. Built with a sleek, responsive UI and a robust, secure backend, CarePulse makes managing healthcare simple, fast, and intelligent.
> **⚠️ Important Note on Live Demo:** The backend runs on Render's free tier. If it has been idle, the first request may take **60–90 seconds** to wake up the server. Subsequent actions are lightning fast!

---

## ✨ Key Features

- **Doctor Discovery**: Browse and filter top specialists (Cardiologists, Neurologists, Dentists, etc.) with real-time availability.
- **Appointment Booking**: Patients can seamlessly schedule, track, and manage their upcoming consultations.
- **Secure Authentication**: Role-based access control (Patient vs. Doctor) protected by JSON Web Tokens (JWT) and Spring Security.
- **CarePulse AI**: An integrated floating AI chatbot assistant designed to help patients navigate symptoms and find the right specialist.
- **Responsive Design**: Beautiful, glassmorphic UI built from scratch to work flawlessly on desktops, tablets, and mobile devices.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|-------|------------|---------|
| **Frontend Framework** | React 18 + Vite | High-performance single-page application framework. |
| **Routing** | React Router DOM | Client-side routing for seamless navigation. |
| **HTTP Client** | Axios | Configured with centralized interceptors for session management. |
| **Styling** | Vanilla CSS | Modern Glassmorphism design and modular CSS variables. |
| **Backend Framework** | Spring Boot 3 | Java 21 powered REST API architecture. |
| **Security** | Spring Security + JWT | Stateless authentication and endpoint protection. |
| **Database** | PostgreSQL | Relational database hosted on Aiven cloud. |
| **ORM** | Spring Data JPA / Hibernate | Object-relational mapping for database interactions. |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- Java 21+
- Maven
- PostgreSQL (Local or Cloud instance)

### 1. Setup the Backend
1. Navigate to the backend directory:
   ```bash
   cd CarePulse
   ```
2. Configure your environment variables in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://<your-db-url>
   spring.datasource.username=<your-username>
   spring.datasource.password=<your-password>
   JWT_SECRET=<your-secure-secret-key>
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   *Note: The application automatically seeds dummy doctors and patients on the first run for easy testing!*

### 2. Setup the Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd carePulse-frontend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the frontend folder:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## 🌍 Production Deployment

CarePulse is architected for modern cloud deployment. 

| Service | Recommended Platform | Configuration Notes |
|---------|----------------------|---------------------|
| **Backend** | Render | Ensure `server.port=${PORT:8080}` is set. Map `CORS_ALLOWED_ORIGINS` to the frontend URL. |
| **Frontend** | Netlify | Ensure `_redirects` or `netlify.toml` is configured to fallback to `index.html` for React Router. Set `VITE_API_BASE_URL` to the Render backend URL. |

---

## License

This project is licensed under the MIT License.
