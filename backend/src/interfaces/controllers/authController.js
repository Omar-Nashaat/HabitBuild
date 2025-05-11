const authService = require('../../usecases/services/authService');

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await authService.signup(name, email, password);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  signup,
  login
};
