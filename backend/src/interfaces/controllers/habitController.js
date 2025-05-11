const habitService = require('../../usecases/services/habitService');
const templates = require('../../domain/templates/habitTemplates');


async function create(req, res) {
  try {
    const habit = await habitService.createHabit(req.user.id, req.body);
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function list(req, res) {
  try {
    const habits = await habitService.getHabitsByUser(req.user.id);
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const habit = await habitService.updateHabit(req.params.id, req.user.id, req.body);
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    await habitService.deleteHabit(req.params.id, req.user.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function complete(req, res) {
  try {
    const habit = await habitService.completeHabit(req.params.id, req.user.id);
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

function getTemplates(req, res) {
  res.json(templates);
}

const getHabitById = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming JWT middleware sets `req.user`
    const habitId = req.params.id;

    const habit = await habitService.getHabitById(habitId, userId);
    res.status(200).json(habit);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: 'Habit not found' });
  }
};


module.exports = {
  create,
  list,
  update,
  remove,
  complete,
  getTemplates,
  getHabitById
};
