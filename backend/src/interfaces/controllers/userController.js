const Habit = require('../../domain/models/Habit');

async function getProgress(req, res) {
  try {
    const habits = await Habit.find({ user: req.user.id });

    const totalCompletions = habits.reduce((sum, h) => sum + (h.totalCompletions || 0), 0);
    const activeStreaks = habits.filter(h => h.streak > 0).length;

    const summary = `${req.user.name} has completed ${totalCompletions} habits with ${activeStreaks} active streaks!`;

    res.json({ summary, totalCompletions, activeStreaks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getProgress };
