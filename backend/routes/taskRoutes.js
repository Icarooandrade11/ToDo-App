const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// ➡️ Esta rota PÚBLICA não precisa de token
router.get('/public', taskController.getPublicTasks);

// ➡️ A partir daqui, tudo precisa de autenticação
router.use(auth);

router.get('/',            taskController.getTasks);
router.post('/',           taskController.createTask);
router.put('/:id',         taskController.updateTask);
router.delete('/:id',      taskController.deleteTask);
router.get('/export/pdf',  taskController.exportPDF);
router.get('/export/csv',  taskController.exportCSV);

module.exports = router;