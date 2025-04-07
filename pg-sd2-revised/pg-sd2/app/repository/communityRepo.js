const connection = require('../service/db'); // Import the database connection
const Community = require('../model/Community');  // Import the Community class

class CommunityRepository {
  // Method to get all communities
  static async getCommunities() {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM community';  // SQL query to get all communities

      try {

        console.log("Executing query:", query, "in get all communities");
        const results = await connection.query(query);

        const communities = results.map((communityData) => {

          // const CMQuery= 'SELECT member_id FROM community_membership WHERE community_id = ?';
          // const members = await connection.query(CMQuery, [communityData.id]);

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
      } catch (error) {
        reject(error);
      }
    });
  }

  static async joinCommunity(memberId, communityId) {
    try {
      const joinDate = new Date();
      const query = `
        INSERT INTO community_membership (member_id, community_id, join_date, role )
        VALUES (?, ?, ?, 'member')
      `;
      await connection.query(query, [memberId, communityId, joinDate]);
      return true;  // Successfully joined the community
    } catch (error) {
      throw new Error("Error joining community: " + error.message);  // Handle errors
    }
  }


  // Method to get a community by ID
  static async getCommunityById(id) {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM community WHERE id = ?';  // SQL query to get community by ID

      console.log("Executing query:", query, "with params:", id);

      const results = await connection.query(query, [id]);

      const CMQuery= 'SELECT member_id FROM community_membership WHERE community_id = ?';
      const members = await connection.query(CMQuery, [id]);

      if (results.length > 0) {
        const communityData = results[0];
        const community = new Community(
            communityData.id,
            communityData.name,
            communityData.description,
            members,
            communityData.posts,
            communityData.badges
        );
        resolve(community);
      } else {
        resolve(null); // No community found with the given ID
      }
    });
  }

  static async getMyCommunities(memberId) {
    return new Promise(async (resolve, reject) => {
      try {
        const [allCommunities] = await connection.query('SELECT * FROM community');

        // Get the communities the member is part of
        const [joined] = await connection.query('SELECT community_id FROM community_membership WHERE member_id = ?', [memberId]);

        const joinedIds = joined.map(row => row.community_id);

        const communities = allCommunities.map(c => new Community(
          c.id,
          c.name,
          c.description,
          [], // members placeholder
          [], // posts placeholder
          []  // badges placeholder
        ));

        resolve({ communities, joinedIds });
      } catch (error) {
        reject(error);
      }
    });
  }

  static async getCommunityMembership(id) {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM community_membership WHERE community_id = ?';  // SQL query to get community by ID

      const results = await connection.query(query, [id]);

      if (results.length > 0) {
        resolve(results);
      } else {
        resolve(null); // No community found with the given ID
      }
    });
  }

  static async getAllJoinedCommunitiesOfMember(id) {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT community_id FROM community_membership WHERE member_id = ?';  // SQL query to get community by ID

      const results = await connection.query(query, [id]);

      if (results.length > 0) {
        resolve(results);
      } else {
        resolve(null); // No community found with the given ID
      }
    });
  }
}

module.exports = CommunityRepository;
