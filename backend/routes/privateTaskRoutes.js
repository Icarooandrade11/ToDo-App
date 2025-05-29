const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const {
  getUserTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.use(protect);

router.get('/', getUserTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;