const Habit = require('../../domain/models/Habit');

async function createHabit(userId, data) {
  const habit = new Habit({ ...data, user: userId });
  await habit.save();
  return habit;
}

async function getHabitsByUser(userId) {
  const habits = await Habit.find({ user: userId });
  const today = new Date().toDateString();

  return habits.map(habit => {
    const completedToday = habit.lastCompleted?.toDateString() === today;
    return {
      ...habit.toObject(),
      progressToday: completedToday
    };
  });
}


async function updateHabit(habitId, userId, data) {
  const habit = await Habit.findOneAndUpdate({ _id: habitId, user: userId }, data, { new: true });
  return habit;
}

async function deleteHabit(habitId, userId) {
  return Habit.findOneAndDelete({ _id: habitId, user: userId });
}

async function completeHabit(habitId, userId) {
  const habit = await Habit.findOne({ _id: habitId, user: userId });
  if (!habit) throw new Error('Habit not found');

  const today = new Date().toDateString();
  const lastCompleted = habit.lastCompleted ? habit.lastCompleted.toDateString() : null;

  if (lastCompleted !== today) {
  habit.streak += 1;
  habit.totalCompletions += 1;
  habit.lastCompleted = new Date();
  habit.completionHistory.push(new Date());
  await habit.save();
}


  return habit;
}

async function getHabitById(habitId, userId) {
  const habit = await Habit.findOne({ _id: habitId, user: userId });
  if (!habit) {
    throw new Error('Habit not found');
  }

  const today = new Date().toDateString();
  const completedToday = habit.lastCompleted?.toDateString() === today;

  return {
    ...habit.toObject(),
    progressToday: completedToday
  };
}


module.exports = {
  createHabit,
  getHabitsByUser,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitById
};
