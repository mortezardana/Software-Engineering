const connection = require('../service/db');
const Reward = require('../model/Reward');

class RewardRepository {
  // Get all rewards
  static getAllRewards() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM reward';
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        // Map results to Reward instances
        const rewards = results.map((rewardData) => {
          return new Reward(
              rewardData.id,
              rewardData.name,
              rewardData.type,  // Assuming RewardType mapping
              rewardData.requirements,
              rewardData.community, // Assuming community is mapped separately
              rewardData.members // Assuming members are mapped separately
          );
        });

        resolve(rewards);
      });
    });
  }

  // Get a reward by ID
  static getRewardById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM reward WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        if (results.length > 0) {
          const rewardData = results[0];
          const reward = new Reward(
              rewardData.id,
              rewardData.name,
              rewardData.type,
              rewardData.requirements,
              rewardData.community,
              rewardData.members
          );
          resolve(reward);
        } else {
          resolve(null); // No reward found
        }
      });
    });
  }

  // Add a new reward
  static addReward(reward) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO reward (name, type, requirements, community) VALUES (?, ?, ?, ?)';
      connection.query(query, [reward.getName(), reward.getType(), reward.getRequirements(), reward.getCommunity()], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId); // Return the new reward's ID
      });
    });
  }

  // Update a reward
  static updateReward(id, reward) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE reward SET name = ?, type = ?, requirements = ?, community = ? WHERE id = ?';
      connection.query(query, [reward.getName(), reward.getType(), reward.getRequirements(), reward.getCommunity(), id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows);
      });
    });
  }

  // Delete a reward
  static deleteReward(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM reward WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows);
      });
    });
  }
}

module.exports = RewardRepository;
