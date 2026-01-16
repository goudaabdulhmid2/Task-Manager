const Task = require("../models/Task");
const factory = require("./handlerFactory");

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Public
exports.getTasks = factory.getAll(Task, "Task");

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Public
exports.getTask = factory.getOne(Task);

// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Public
exports.createTask = factory.createOne(Task);

// @desc    Update task (completed / title)
// @route   PUT /api/v1/tasks/:id
// @access  Public
exports.updateTask = factory.updateOne(Task);

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Public
exports.deleteTask = factory.deleteOne(Task);
