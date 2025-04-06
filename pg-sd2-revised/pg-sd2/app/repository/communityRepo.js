const connection = require('../service/db'); // Import the database connection
const Community = require('../model/Community');  // Import the Community class

class CommunityRepository {
  // Method to get all communities
  static async getCommunities() {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM community';  // SQL query to get all communities

      const result = await connection.query(query);

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
  }

  // Method to get a community by ID
  static async getCommunityById(id) {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM community WHERE id = ?';  // SQL query to get community by ID

      const results = await connection.query(query, [id]);

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
  }
}

module.exports = CommunityRepository;
