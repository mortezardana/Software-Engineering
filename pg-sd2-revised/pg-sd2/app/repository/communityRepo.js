const connection = require('../service/db'); // Import the database connection
const Community = require('../model/Community');  // Import the Community class

class CommunityRepository {
  // Method to get all communities
  static getCommunities() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM community';  // SQL query to get all communities

      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        const communities = results.map(communityData => {
          return new Community(
              communityData.id,
              communityData.name,
              communityData.description,
              communityData.members,
              communityData.posts,
              communityData.badges
          );
        });

        resolve(communities);
      });
    });
  }

  // Method to get a community by ID
  static getCommunityById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM community WHERE id = ?';  // SQL query to get community by ID

      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        if (results.length > 0) {
          const communityData = results[0];
          const community = new Community(
              communityData.id,
              communityData.name,
              communityData.description,
              communityData.members,
              communityData.posts,
              communityData.badges
          );
          resolve(community);
        } else {
          resolve(null); // No community found with the given ID
        }
      });
    });
  }
}

module.exports = CommunityRepository;
