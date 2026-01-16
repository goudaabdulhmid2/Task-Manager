# 📋 Task Manager - MEAN Stack Application

A modern, full-stack task management application built with **MongoDB, Express.js, Angular, and Node.js** (MEAN Stack). Features a beautiful UI with real-time updates, notifications, and a professional confirmation modal.

![Live Demo](./screenShot/Recording2026-01-16160624-ezgif.com-video-to-gif-converter.gif)

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
| After Add Tasks| ![Task List](./screenShot/Screenshot%202026-01-16%20155319.png) |
| Before Edit | ![Add Task](./screenShot/Screenshot%202026-01-16%20155334.png) |
| Edit | ![Filters](./screenShot/Screenshot%202026-01-16%20155400.png) |
| After Edit | ![Statistics](./screenShot/Screenshot%202026-01-16%20155416.png) |
| All | ![Edit Task](./screenShot/Screenshot%202026-01-16%20155445.png) |
| Active | ![Notifications](./screenShot/Screenshot%202026-01-16%20155458.png) |
| Completed | ![Confirmation Modal](./screenShot/Screenshot%202026-01-16%20155510.png) |
| Delete Confirmation | ![Mobile View](./screenShot/Screenshot%202026-01-16%20160456.png) |

## 🔒 Environment Variables

### Server (.env)
```env
MONGO_URI=mongodb://root:example@localhost:27017/todo-manager?authSource=admin
NODE_ENV=development
PORT=3000
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
```


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






