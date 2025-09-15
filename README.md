# Student Complaint Management System

A full-stack web application for managing student complaints in educational institutions.

## Features

- **Student Portal**: Submit complaints with file attachments
- **Admin Dashboard**: View and resolve complaints with statistics
- **Authentication**: Role-based access (Student, Faculty, Admin)
- **File Upload**: Support for images and PDF attachments
- **Real-time Updates**: Dynamic complaint status management

## Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- bcryptjs for password hashing

**Frontend:**
- HTML5, CSS3, JavaScript
- Responsive design
- Modern UI components

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project_01
   ```

2. **Install backend dependencies**
   ```bash
   cd complaint-portal
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the `complaint-portal` directory:
   ```env
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/complaintDatabase
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Start the backend server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

6. **Open the frontend**
   Open `index.html` in your browser or serve it using a local server.

## Usage

### For Students:
1. Register/Login with institute email
2. Navigate to student portal
3. Select complaint category
4. Fill out complaint form with optional file attachment
5. Submit complaint

### For Admins:
1. Login with admin credentials
2. View dashboard with complaint statistics
3. Review unresolved complaints
4. Mark complaints as resolved with notes

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Student registration
- `POST /api/auth/admin/create-user` - Admin creates users

### Complaints
- `POST /api/complaints/submit` - Submit new complaint
- `GET /api/complaints/my-complaints` - Get user's complaints
- `GET /api/complaints/admin/dashboard` - Admin dashboard data
- `PATCH /api/complaints/:id/resolve` - Resolve complaint

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users` - Get all users (Admin only)

## File Structure

```
project_01/
├── complaint-portal/          # Backend application
│   ├── config/               # Database configuration
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── uploads/             # File upload directory
│   └── index.js             # Server entry point
├── admin.html               # Admin dashboard
├── student.html             # Student portal
├── index.html               # Login page
├── api.js                   # Frontend API client
├── form.js                  # Form handling
└── style.css                # Styles
```


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
