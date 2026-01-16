# Task Manager - MEAN Stack Application

A modern, full-stack task management application built with MongoDB, Express.js, Angular, and Node.js (MEAN Stack).

## 📹 Demo

Watch the application in action:

https://github.com/user-attachments/assets/video.mp4

![Demo Video](./screenShot/Recording%202026-01-16%20160624.mp4)

## 🚀 Features

- ✅ Create, Read, Update, and Delete tasks
- ✅ Mark tasks as completed/incomplete
- ✅ Filter tasks by status (All, Active, Completed)
- ✅ Real-time task statistics (Total, Active, Completed)
- ✅ Modern, responsive UI with gradient design
- ✅ Loading states and empty state handling
- ✅ RESTful API with proper error handling
- ✅ MongoDB persistence with Mongoose ODM
- ✅ Docker containerization for MongoDB
- ✅ Rate limiting and CORS protection
- ✅ Modern toast notification system with 4 notification types
- ✅ Beautiful confirmation modal for destructive actions
- ✅ Inline task editing with validation
- ✅ Keyboard support (Enter to add, ESC to close modals)
- ✅ Click-outside modal closing and ESC key support
- ✅ Smooth animations and transitions

## 🛠️ Tech Stack

### Backend
- **Node.js** (v22.18.0)
- **Express.js** (v5.x) - Web framework
- **MongoDB** (v6.0) - Database
- **Mongoose** (v9.1.4) - MongoDB ODM
- **Docker & Docker Compose** - Containerization
- **express-rate-limit** - API rate limiting
- **morgan** - HTTP request logger
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

### Frontend
- **Angular** (v21) - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **HttpClient** - HTTP communication
- **Standalone Components** - Modern Angular architecture
- **CSS3** - Custom gradient styling

## 📋 Prerequisites

- Node.js (v18+ recommended)
- Docker & Docker Compose
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Simple-MEAN-Stack-Project
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file (already configured)
# MONGO_URI=mongodb://root:example@localhost:27017/todo-manager?authSource=admin
# NODE_ENV=development
# PORT=3000
# MONGO_INITDB_ROOT_USERNAME=root
# MONGO_INITDB_ROOT_PASSWORD=example

# Start MongoDB with Docker Compose
docker-compose up -d

# (Optional) Seed database with sample data
node dev-data/import-dev-data.js --import
```

### 3. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd server
npm run dev
```
Backend will run at: `http://localhost:3000`

### Start Frontend Server
```bash
cd client
ng serve
```
Frontend will run at: `http://localhost:4200`

### Access MongoDB Admin UI
Mongo Express is available at: `http://localhost:8081`
- Username: `admin`
- Password: `pass`

## 📁 Project Structure

```
Simple-MEAN-Stack-Project/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── taskController.js     # Task CRUD operations
│   │   ├── handlerFactory.js     # Generic controller factory
│   │   └── errorController.js    # Global error handling
│   ├── models/
│   │   └── Task.js               # Mongoose Task schema
│   ├── routes/
│   │   └── taskRouter.js         # API routes
│   ├── utlis/
│   │   ├── ApiError.js           # Custom error class
│   │   └── ApiFeatures.js        # Query features (filter, sort, paginate)
│   ├── dev-data/
│   │   ├── tasks.json            # Sample task data
│   │   └── import-dev-data.js    # Data seeding script
│   ├── app.js                    # Express app configuration
│   ├── server.js                 # Server entry point
│   ├── docker-compose.yml        # Docker services
│   ├── .env                      # Environment variables
│   └── package.json
│
└── client/
    └── src/
        └── app/
            ├── services/
            │   ├── task.service.ts              # HTTP service for API calls
            │   ├── notification.service.ts      # Toast notification manager
            │   └── confirmation.service.ts      # Modal confirmation service
            ├── components/
            │   ├── notification.component.ts    # Toast UI component
            │   └── confirmation-modal.component.ts  # Confirmation modal component
            ├── app.ts                           # Root component logic
            ├── app.html                         # Task Manager template
            ├── app.css                          # Modern gradient styling
            └── app.config.ts                    # Angular configuration

```

## 🔔 Notification System

The application features a modern toast notification system that displays feedback for user actions:

### Notification Service (`notification.service.ts`)
- Manages notification state with RxJS BehaviorSubject
- Provides methods: `success()`, `error()`, `warning()`, `info()`
- Auto-dismisses notifications after 4-5 seconds
- Prevents duplicate notifications
- Singleton service (providedIn: 'root')

### Notification Component (`notification.component.ts`)
- Displays toast messages in a fixed container (top-right)
- 4 notification types with color-coded gradients:
  - **Success** (Green #10b981): Task added/updated/deleted successfully
  - **Error** (Red #ef4444): Operation failed
  - **Warning** (Orange #f59e0b): Invalid input or validation issues
  - **Info** (Blue #3b82f6): Informational messages
- Features:
  - Smooth slide-in animation
  - Progress bar showing time until auto-dismiss
  - Close button for manual dismissal
  - Responsive design with mobile optimization
  - Backdrop blur effect for visual depth

### Usage Example
```typescript
// In any component
constructor(private notificationService: NotificationService) {}

// Display notifications
this.notificationService.success('Task created successfully!');
this.notificationService.error('Failed to delete task');
this.notificationService.warning('Task title must be at least 3 characters');
this.notificationService.info('No tasks to display');
```

## ✅ Confirmation Modal

A modern, user-friendly confirmation modal replaces browser dialogs for destructive actions:

### Confirmation Service (`confirmation.service.ts`)
- Centralized state management for modal visibility and content
- Promise-based API for clean async handling
- Configurable modal content (title, message, button labels)
- Danger flag for red delete buttons

### Confirmation Modal Component (`confirmation-modal.component.ts`)
- Beautiful card-style modal with rounded corners
- Features:
  - Soft background overlay with backdrop blur (opacity 0.5)
  - Smooth slide-up animation with fade-in backdrop
  - Title and message text sections
  - Two action buttons (Cancel/Confirm)
  - Color-coded buttons:
    - Primary button: Purple/violet gradient (#667eea → #764ba2)
    - Danger button: Red gradient (#ef4444 → #dc2626) for destructive actions
  - Keyboard support:
    - ESC key closes the modal
  - Click-outside to close
  - Mobile responsive with full-width buttons on small screens (<480px)
  - Smooth hover and focus state transitions

### Usage Example
```typescript
// In any component
constructor(private confirmationService: ConfirmationService) {}

// Show confirmation modal
this.confirmationService.confirm({
  title: 'Delete Task?',
  message: 'This action cannot be undone. Are you sure?',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  isDangerous: true
}).then((confirmed) => {
  if (confirmed) {
    // Handle deletion
  }
});
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks` | Get all tasks |
| GET | `/api/v1/tasks/:id` | Get single task |
| POST | `/api/v1/tasks` | Create new task |
| PUT | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |

### Example Request
```bash
# Create a task
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn MEAN Stack", "completed": false}'

# Get all tasks
curl http://localhost:3000/api/v1/tasks

# Update task
curl -X PUT http://localhost:3000/api/v1/tasks/:id \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete task
curl -X DELETE http://localhost:3000/api/v1/tasks/:id
```

## 📸 Screenshots

The application features a modern, responsive UI with beautiful gradients and smooth animations:

| Feature | Screenshot |
|---------|-----------|
| Task Manager Main View | ![Main View](./screenShot/Screenshot%202026-01-16%20155203.png) |
| Task List Display | ![Task List](./screenShot/Screenshot%202026-01-16%20155319.png) |
| Add Task Input | ![Add Task](./screenShot/Screenshot%202026-01-16%20155334.png) |
| Filter Buttons | ![Filters](./screenShot/Screenshot%202026-01-16%20155400.png) |
| Task Statistics | ![Statistics](./screenShot/Screenshot%202026-01-16%20155416.png) |
| Edit Mode | ![Edit Task](./screenShot/Screenshot%202026-01-16%20155445.png) |
| Notifications | ![Notifications](./screenShot/Screenshot%202026-01-16%20155458.png) |
| Delete Confirmation | ![Confirmation Modal](./screenShot/Screenshot%202026-01-16%20155510.png) |
| Mobile Responsive | ![Mobile View](./screenShot/Screenshot%202026-01-16%20160456.png) |

## 🔒 Environment Variables

### Server (.env)
```env
MONGO_URI=mongodb://root:example@localhost:27017/todo-manager?authSource=admin
NODE_ENV=development
PORT=3000
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
```

## 🎨 Features in Detail

### Backend Features
- **Factory Pattern**: Reusable controller methods for CRUD operations
- **Error Handling**: Centralized error handling with custom ApiError class
- **Validation**: Mongoose schema validation with custom error messages
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for localhost:4200 and localhost:3000
- **Logging**: Morgan HTTP request logging in development mode
- **Query Features**: Filter, sort, pagination, field limiting, and keyword search

### Frontend Features
- **Reactive State Management**: RxJS BehaviorSubjects for real-time updates
- **Optimistic Updates**: Immediate UI feedback with server sync
- **Error Handling**: Graceful handling of 404 and server errors
- **Loading States**: Spinner during API calls
- **Empty States**: User-friendly messages when no tasks exist
- **Keyboard Support**: Press Enter to add tasks, ESC to close modals
- **Responsive Design**: Mobile-first approach with breakpoints
- **Modern UI**: Purple/indigo gradient theme with smooth animations
- **Toast Notifications**: 4 notification types (success, error, warning, info) with auto-dismiss
  - Success: Green gradient with checkmark icon
  - Error: Red gradient with error icon
  - Warning: Orange gradient with warning icon
  - Info: Blue gradient with info icon
  - Features: Auto-dismiss after 4-5 seconds, progress bar animation, close button
- **Confirmation Modal**: Beautiful modal for destructive actions
  - Soft background overlay with backdrop blur
  - Smooth slide-up animation
  - Color-coded action buttons (red for dangerous operations)
  - Click-outside to close
  - ESC key support
  - Mobile responsive with full-width buttons on small screens
- **Inline Editing**: Edit task titles with validation feedback

## 🧪 Seeding Sample Data

```bash
cd server

# Import sample tasks
node dev-data/import-dev-data.js --import

# Delete all tasks
node dev-data/import-dev-data.js --delete
```

## 🐳 Docker Services

The application uses Docker Compose to run MongoDB and Mongo Express:

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Check service status
docker-compose ps
```

## 🔧 Development

### Backend Development
```bash
cd server
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development
```bash
cd client
ng serve  # Runs with live reload
```

### Code Quality
- TypeScript strict mode enabled
- ESLint configuration available
- Mongoose schema validation
- Express error handling middleware

## 📝 Task Schema

```javascript
{
  title: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: Date,    // Auto-generated
  updatedAt: Date     // Auto-generated
}
```

## 🎯 Future Enhancements

- [ ] User authentication (JWT)
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Search and advanced filtering
- [x] Task editing (inline) ✅ Completed
- [ ] Drag-and-drop reordering
- [ ] Dark mode toggle
- [ ] Export tasks (JSON, CSV)
- [ ] Unit and integration tests
- [x] Modern toast notifications ✅ Completed
- [x] Confirmation modal for delete actions ✅ Completed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Hamid**

## 🙏 Acknowledgments

- Angular team for the amazing framework
- MongoDB for the flexible database
- Express.js community
- Docker for containerization

---

Made with ❤️ using MEAN Stack
#   T a s k - M a n a g e r 
 
 