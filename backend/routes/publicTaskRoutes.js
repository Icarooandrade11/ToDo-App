const router = require('express').Router();
const { getPublicTasks } = require('../controllers/taskController');

router.get('/', getPublicTasks);

module.exports = router;