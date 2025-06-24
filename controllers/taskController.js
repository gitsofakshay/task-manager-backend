const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

//POST /api/tasks Create a new task
exports.createTask = async (req, res) => {
  const { title } = req.body;
  const userId = req.userId;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId,
        status: 'TO_DO', // Default status
      },
    });

    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
};

//GET /api/tasks Get all tasks for logged-in user
exports.getTasks = async (req, res) => {
  const userId = req.userId;

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { created_at: 'desc' },
    });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

// PUT /api/tasks/:id Update task status
exports.updateTask = async (req, res) => {
  const userId = req.userId;
  const taskId = parseInt(req.params.id);
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }
  // Enforce valid enum values
  const validStatuses = ['TO_DO', 'IN_PROGRESS', 'DONE'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    // Check if task belongs to the user
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status },
    });

    res.json({ message: 'Task status updated', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

// DELETE /api/tasks/:id - Delete a task
exports.deleteTask = async (req, res) => {
  const userId = req.userId;
  const taskId = parseInt(req.params.id);

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    await prisma.task.delete({ where: { id: taskId } });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};

// PATCH /api/tasks/:id - Edit task title
exports.updateTaskTitle = async (req, res) => {
  const userId = req.userId;
  const taskId = parseInt(req.params.id);
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title cannot be empty' });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== userId) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { title },
    });

    res.json({ message: 'Task title updated', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task title', error: error.message });
  }
};

