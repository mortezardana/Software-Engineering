const connection = require('../service/db'); // Import the database connection
const Comment = require('../model/Comment');  // Import the Comment class

class CommentRepository {
  // Method to get all comments
  static async getComments() {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM comment';  // SQL query to get all comments

      const results = await connection.query(query);

      const comments = results.map(commentData => {
        return new Comment(
            commentData.id,
            commentData.date,
            commentData.likes,
            commentData.member,
            commentData.post,
            commentData.text
        );
      });

      resolve(comments);
    });
  }

  // Method to get a comment by ID
  static async getCommentById(id) {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM comment WHERE id = ?';  // SQL query to get comment by ID

      const results = connection.query(query, [id]);

      if (results.length > 0) {
        const commentData = results[0];
        const comment = new Comment(
            commentData.id,
            commentData.date,
            commentData.likes,
            commentData.member,
            commentData.post,
            commentData.text
        );
        resolve(comment);
      } else {
        resolve(null); // No comment found with the given ID
      }
    });
  }
}

module.exports = CommentRepository;
