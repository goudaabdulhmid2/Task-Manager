# 📋 Task Manager - MEAN Stack Application

A modern, full-stack task management application built with **MongoDB, Express.js, Angular, and Node.js** (MEAN Stack). Features a beautiful UI with real-time updates, notifications, and a professional confirmation modal.

---

## 🎯 Features

✅ **Complete CRUD Operations**
- Create, Read, Update, Delete tasks
- Mark tasks as completed/incomplete
- Inline task editing with validation

✅ **Smart Filtering & Statistics**
- Filter tasks by status (All, Active, Completed)
- Real-time task statistics (Total, Active, Completed)
- Empty state handling

✅ **Modern UI/UX**
- Beautiful gradient design (Purple → Violet)
- Responsive layout (Mobile, Tablet, Desktop)
- Smooth animations and transitions
- Professional color scheme

✅ **Notifications System**
- Toast notifications (Success, Error, Warning, Info)
- Auto-dismiss after 4-5 seconds
- Manual close button
- Progress bar animation

✅ **Confirmation Modal**
- Modern confirmation dialog for deletions
- Click-outside to close
- ESC key support
- Color-coded danger buttons

✅ **Keyboard Support**
- Enter to add tasks
- ESC to close modals

✅ **Backend Features**
- RESTful API with proper error handling
- MongoDB persistence with Mongoose
- Docker containerization
- Rate limiting & CORS protection
- Global error handling
- Input validation

---

## 🛠️ Tech Stack

### Backend
- **Node.js** v22.18.0
- **Express.js** v5.x
- **MongoDB** v6.0 (Docker)
- **Mongoose** v9.1.4 ODM
- **Docker & Docker Compose**

### Frontend
- **Angular** v21
- **TypeScript**
- **RxJS** 7.x
- **CSS3** (Custom gradients)

---

## 📋 Prerequisites

- Node.js v18+
- Docker & Docker Compose
- npm or yarn
- Angular CLI

```bash
npm install -g @angular/cli
```

---

## 🚀 Quick Start

### 1️⃣ Backend Setup

```bash
cd server

# Install dependencies
npm install

# Start MongoDB with Docker
docker-compose up -d

# (Optional) Seed sample data
node dev-data/import-dev-data.js --import

# Start server
npm run dev
```

Backend runs at: **http://localhost:3000**

### 2️⃣ Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Start Angular dev server
ng serve
```

Frontend runs at: **http://localhost:4200**

### 3️⃣ Access MongoDB Admin UI

```
URL: http://localhost:8081
Username: admin
Password: pass
```

---

## 📁 Project Structure

```
Simple-MEAN-Stack-Project/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── taskController.js
│   │   ├── handlerFactory.js
│   │   └── errorController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRouter.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   └── ApiFeatures.js
│   ├── dev-data/
│   │   ├── tasks.json
│   │   └── import-dev-data.js
│   ├── app.js
│   ├── server.js
│   ├── docker-compose.yml
│   ├── .env
│   └── package.json
│
└── client/
    └── src/
        └── app/
            ├── services/
            │   ├── task.service.ts
            │   ├── notification.service.ts
            │   └── confirmation.service.ts
            ├── components/
            │   ├── notification.component.ts
            │   └── confirmation-modal.component.ts
            ├── app.ts
            ├── app.html
            ├── app.css
            └── app.config.ts
```

---

## 🔔 Toast Notifications

The app displays beautiful toast notifications for all user actions:

```typescript
// Success notification (Green)
this.notificationService.success('Task created successfully!');

// Error notification (Red)
this.notificationService.error('Failed to delete task');

// Warning notification (Orange)
this.notificationService.warning('Task title must be 3+ characters');

// Info notification (Blue)
this.notificationService.info('No tasks to display');
```

**Features:**
- Auto-dismisses after 4-5 seconds
- Manual close button
- Progress bar animation
- Smooth slide-in animation

---

## ✅ Confirmation Modal

Modern confirmation dialog for destructive actions:

```typescript
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

**Features:**
- Soft background overlay with blur effect
- Smooth animations
- Click-outside to close
- ESC key support
- Color-coded buttons (Red for dangerous actions)
- Mobile responsive

---

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
#