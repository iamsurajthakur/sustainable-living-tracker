# 🌱 Sustainable Living Tracker

A modern web application that empowers users to track their environmental impact, log eco-friendly activities, and participate in sustainability challenges. Built with React, Node.js, and MongoDB.

## ✨ Features

- **User Authentication**: Secure signup and login with JWT-based authentication
- **Carbon Footprint Logger**: Track daily activities and their environmental impact:
  - 🚗 Car travel distance
  - 🥩 Meat consumption
  - ⚡ Electricity usage
- **Interactive Dashboard**: Visualize your carbon footprint with beautiful charts (weekly/monthly trends)
- **Eco-Challenges**: Complete sustainability challenges and earn eco-points:
  - Use public transport
  - Avoid plastic bottles
  - And more!
- **Activity History**: Review your logged activities and environmental impact over time
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Notifications**: Get instant feedback on actions with toast notifications

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sustainable-living-tracker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRY=7d
   REFRESH_TOKEN_EXPIRY=30d
   CORS_ORIGIN_DEV=http://localhost:5173
   CORS_ORIGIN_PROD=your_production_url
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

### Running the Application

**Backend Development Server**
```bash
cd backend
npm run dev
```
The API will be available at `http://localhost:5000`

**Frontend Development Server**
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
sustainable-living-tracker/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── constants.js           # App constants
│   │   ├── controllers/           # Request handlers
│   │   ├── db/                    # Database connection
│   │   ├── middlewares/           # Auth & error handling
│   │   ├── models/                # Database schemas
│   │   ├── routes/                # API routes
│   │   └── utils/                 # Helper functions
│   ├── index.js                   # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/            # React components
│   │   │   ├── dashboard/         # Dashboard components
│   │   │   ├── home/              # Landing page components
│   │   │   ├── charts/            # Chart components
│   │   │   ├── secure/            # Auth context & protected routes
│   │   │   └── ui/                # Reusable UI components
│   │   ├── pages/                 # Page components
│   │   ├── api/                   # API client configuration
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/                   # Utility functions
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt for password hashing
- CORS enabled

**Frontend:**
- React 19
- Vite (build tool)
- React Router for navigation
- Recharts for data visualization
- Radix UI for accessible components
- Tailwind CSS for styling
- Framer Motion for animations

## 📖 Usage Examples

### Register a New Account
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "confirmPassword": "secure123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123"
  }'
```

### Log an Activity
Access the dashboard at `/dashboard` and use the "Log Activities" section to record:
- Distance traveled by car
- Meat meal consumption
- Electricity usage

The system automatically calculates your carbon footprint based on predefined values.

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for secure authentication:
- Access tokens are short-lived (7 days)
- Refresh tokens enable longer sessions (30 days)
- Tokens are stored in HTTP-only cookies for security

## 📊 Dashboard Features

- **Overview**: View your total carbon footprint and environmental statistics
- **Log Activities**: Quick and easy logging of daily eco-activities
- **Eco-Challenges**: Browse available challenges and track your progress
- **History**: Detailed view of all logged activities with timestamps
- **Recent Activity**: Quick summary of your most recent entries

## 🚦 API Endpoints

All endpoints require JWT authentication (except auth endpoints)

**Authentication:**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

Additional endpoints for activities and challenges are documented in the backend routes.

## 🧹 Code Quality

The project includes ESLint and Prettier for code consistency:

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📦 Building for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

The optimized production build will be in the `frontend/dist` directory.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code passes linting checks and follows the existing code style.

## 💡 Future Enhancements

- Real carbon calculation algorithms
- Community features (leaderboards, social sharing)
- Advanced analytics and insights
- Mobile app (React Native)
- Third-party API integrations
- Offline mode support

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Suraj Thakur**

## 🙌 Support

For questions, issues, or suggestions, please open an issue on GitHub or contact the maintainer directly.

---

**Ready to make a difference?** Start tracking your sustainable lifestyle today! 🌍
