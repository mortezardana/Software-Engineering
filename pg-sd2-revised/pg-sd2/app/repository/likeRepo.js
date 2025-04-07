const connection = require('../service/db'); // Import the database connection
const Like = require('../model/Like');  // Import the Like class

class LikeRepository {
  // Method to get all likes
  static async getLikes() {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM like';  // SQL query to get all likes

      const results = await connection.query(query);

      const likes = results.map(likeData => {
        return new Like(
            likeData.id,
            likeData.comment,
            likeData.post,
            likeData.likes
        );
      });

      resolve(likes);
    });
  }

  // Method to get a like by ID
  static async getLikeById(id) {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM like WHERE id = ?';  // SQL query to get like by ID

      const results = await connection.query(query, [id]);

      if (results.length > 0) {
        const likeData = results[0];
        const like = new Like(
            likeData.id,
            likeData.comment,
            likeData.post,
            likeData.likes
        );
        resolve(like);
      } else {
        resolve(null); // No like found with the given ID
      }
    });
  }
}

module.exports = LikeRepository;
