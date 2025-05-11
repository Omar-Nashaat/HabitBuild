const service = require('../../usecases/services/challengeService')

async function create (req, res) {
  try {
    const challenge = await service.createChallenge(req.user.id, req.body)
    res.status(201).json(challenge)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function list (req, res) {
  try {
    const challenges = await service.getAllChallenges()
    res.json(challenges)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function details (req, res) {
  try {
    const challenge = await service.getChallenge(req.params.id)
    res.json(challenge)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function join (req, res) {
  try {
    const challenge = await service.joinChallenge(req.params.id, req.user.id)
    res.json(challenge)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function leave (req, res) {
  try {
    const challenge = await service.leaveChallenge(req.params.id, req.user.id)
    res.json(challenge)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function getAllChallenges (req, res) {
  try {
    const userId = req.user.id;
    const challenges = await service.getAllChallengesForUser(userId);
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getChallenge (req, res) {
  try {
    const userId = req.user.id
    const challengeId = req.params.id
    const challenge = await service.getChallengeById(
      challengeId,
      userId
    )
    res.json(challenge)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function completeChallengeMilestone (req, res) {
  try {
    const userId = req.user.id
    const { challengeId, milestoneIndex } = req.body

    const updatedChallenge = await service.completeMilestone(
      challengeId,
      milestoneIndex,
      userId
    )
    res.json(updatedChallenge)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  create,
  list,
  details,
  join,
  leave,
  getChallenge,
  getAllChallenges,
  completeChallengeMilestone
}
