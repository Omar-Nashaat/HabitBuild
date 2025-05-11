const Challenge = require('../../domain/models/Challenge');

async function createChallenge(userId, data) {
  const challenge = new Challenge({ ...data, creator: userId, participants: [userId] });
  await challenge.save();
  return challenge;
}

async function getAllChallenges() {
  return Challenge.find().populate('creator', 'name');
}

async function getChallenge(id) {
  return Challenge.findById(id).populate('creator participants', 'name');
}

async function joinChallenge(challengeId, userId) {
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) throw new Error('Challenge not found');

  if (!challenge.participants.includes(userId)) {
    challenge.participants.push(userId);
    await challenge.save();
  }

  return challenge;
}

async function leaveChallenge(challengeId, userId) {
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) throw new Error('Challenge not found');

  challenge.participants = challenge.participants.filter(id => id.toString() !== userId);
  await challenge.save();
  return challenge;
}


async function getAllChallengesForUser(userId) {
  const challenges = await Challenge.find().populate('creator');

  return challenges.map(challenge => {
    const joined = challenge.participants.includes(userId);
    const total = challenge.milestones.length || 0;
    const completed = challenge.milestones.filter(m =>
      m.completedBy.includes(userId)
    ).length;
    const progress = total ? Math.round((completed / total) * 100) : 0;

    return {
      ...challenge.toObject(),
      joined,
      progress
    };
  });
}

// Get single challenge with progress and joined flag
async function getChallengeById(challengeId, userId) {
  const challenge = await Challenge.findById(challengeId).populate('creator');
  if (!challenge) throw new Error('Challenge not found');

  const joined = challenge.participants.includes(userId);
  const total = challenge.milestones.length || 0;
  const completed = challenge.milestones.filter(m =>
    m.completedBy.includes(userId)
  ).length;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return {
    ...challenge.toObject(),
    joined,
    progress
  };
}

// Mark a milestone as completed
async function completeMilestone(challengeId, milestoneIndex, userId) {
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) throw new Error('Challenge not found');

  const milestone = challenge.milestones[milestoneIndex];
  if (!milestone) throw new Error('Milestone not found');

  if (!milestone.completedBy.includes(userId)) {
    milestone.completedBy.push(userId);
    await challenge.save();
  }

  return challenge;
}



module.exports = {
  createChallenge,
  getAllChallenges,
  getChallenge,
  joinChallenge,
  leaveChallenge,
  getChallengeById,
  getAllChallengesForUser,
  completeMilestone
};
