const User = require('../../domain/models/User');
const { generateToken } = require('../../config/jwt');

async function signup(name, email, password) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already in use');
  const user = new User({ name, email, password });
  await user.save();
  const token = generateToken(user);
  return { user, token };
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid email or password');
  const token = generateToken(user);
  return { user, token };
}

module.exports = {
  signup,
  login
};
