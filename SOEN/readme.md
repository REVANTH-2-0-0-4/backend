# SOEN - Software Engineer Messaging App

## Overview
SOEN is a modern messaging application leveraging **Socket.io** for real-time communication and integrating **Gemini AI** for AI-powered responses. Users can interact with Gemini AI during conversations by starting their messages with `@ai`. The application is built using the **MERN stack** (MongoDB, Express, React, Node.js) and incorporates various technologies to ensure seamless functionality.

---

## Features
- **Real-time messaging** using Socket.io.
- **AI-powered responses** with Gemini AI.
- Secure authentication and session management.
- Scalable architecture with robust backend and frontend segregation.
- Comprehensive input validation and error handling.

---

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose for ODM)
- **Real-time Communication:** Socket.io

---

## Folder Structure
```
SOEN
├── backend
│   ├── routes
│   ├── services
│   ├── controllers
│   ├── db
│   │   └── models
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend
│   └── [React.js architecture]
├── notes.md
```

---

## Key NPM Packages

### Backend Packages
| Package               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| **express**           | Web framework for handling routes, middleware, and HTTP requests/responses |
| **mongoose**          | Object Data Modeling (ODM) library for MongoDB                            |
| **bcrypt**            | Library for hashing passwords securely                                     |
| **cookie-parser**     | Middleware to parse cookies from incoming requests                        |
| **jsonwebtoken**      | Used for token-based authentication                                        |
| **nodemon**           | Development tool for automatic server restarting                          |
| **morgan**            | HTTP request logger middleware                                             |
| **dotenv**            | Loads environment variables from `.env` file                              |
| **cors**              | Middleware for handling Cross-Origin Resource Sharing                     |
| **express-validator** | Library for validating and sanitizing user inputs                         |

### Frontend Packages
| Package               | Description                                             |
|-----------------------|---------------------------------------------------------|
| **react**             | JavaScript library for building user interfaces        |
| **react-dom**         | Handles rendering React components to the DOM          |
| **axios**             | Promise-based HTTP client for API requests             |

---

## Installation

### Prerequisites
- **Node.js** and **npm** installed
- **MongoDB** installed and running

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/SOEN.git
   ```
2. Navigate to the project folder:
   ```bash
   cd SOEN
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
5. Configure environment variables:
   - Create a `.env` file in the `backend` folder.
   - Add the following variables:
     ```env
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ````
6. Start the development server:
   - For backend:
     ```bash
     cd backend
     npm run dev
     ```
   - For frontend:
     ```bash
     cd ../frontend
     npm start
     ```

---

## Usage
1. Open the application in your browser at `http://localhost:3000`.
2. Sign up or log in to access the messaging interface.
3. To interact with Gemini AI, start your message with `@ai`. For example:
   ```
   @ai What is the weather today?
   ```

---

## Contributing
We welcome contributions to enhance the functionality and performance of SOEN. Please create a pull request with a detailed description of your changes.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments
- **Socket.io** for enabling real-time communication.
- **Gemini AI** for intelligent, conversational responses.
- The open-source community for providing inspiration and tools.

---

## Contact
For questions or feedback, please contact [Revanth Kurapati](mailto:revanthkurapati56@gmail.com).
