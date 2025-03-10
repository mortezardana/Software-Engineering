const RewardRepository = require('../repository/RewardRepo'); // Import the Reward repository

class RewardService {
    // Function to get all rewards
    static getAllRewards() {
        return RewardRepository.getRewards()
            .then(rewards => {
                return rewards;
            })
            .catch(err => {
                throw new Error('Error retrieving rewards: ' + err.message);
            });
    }

    // Function to get a reward by ID
    static getRewardById(id) {
        return RewardRepository.getRewardById(id)
            .then(reward => {
                return reward;
            })
            .catch(err => {
                throw new Error('Error retrieving reward by ID: ' + err.message);
            });
    }
}

module.exports = RewardService;
