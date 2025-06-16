const Task = require('../models/Task');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');

exports.getPublicTasks = async (req, res) => {
  const tasks = await Task.find({ public: true }).sort({ createdAt: -1 });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, public: isPublic, deadline } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'O título da tarefa é obrigatório.' });
    }

    const newTask = new Task({
      title,
      description,
      public: isPublic || false,
      user: req.user.id,
      deadline
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar a tarefa.', error });
  }
};

exports.getTasks = async (req, res) => {
    
  try {
    const { status } = req.query;
    let filter = { user: req.user.id };

    if (status === 'concluida') filter.completed = true;
    if (status === 'pendente') filter.completed = false;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas.', error });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, public: isPublic, deadline } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description, completed, public: isPublic, deadline },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a tarefa.', error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    res.status(200).json({ message: 'Tarefa deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a tarefa.', error });
  }
};

exports.exportPDF = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=tasks.pdf');

    doc.fontSize(18).text('Tarefas', { underline: true });
    doc.moveDown();

    tasks.forEach((task, i) => {
      doc.fontSize(12).text(`${i + 1}. ${task.title} (${task.completed ? 'Concluída' : 'Pendente'})`);
    });

    doc.end();
    doc.pipe(res);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao exportar PDF', error: err });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    const parser = new Parser();
    const csv = parser.parse(tasks.map(t => ({
      Título: t.title,
      Descrição: t.description,
      Concluído: t.completed,
      Público: t.public,
      CriadoEm: t.createdAt,
    })));

    res.header('Content-Type', 'text/csv');
    res.attachment('tasks.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao exportar CSV', error: err });
  }
};
