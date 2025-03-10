const connection = require('../service/db'); // Import the database connection
const Comment = require('../model/Comment');  // Import the Comment class

class CommentRepository {
  // Method to get all comments
  static getComments() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM comment';  // SQL query to get all comments

      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }

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
    });
  }

  // Method to get a comment by ID
  static getCommentById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM comment WHERE id = ?';  // SQL query to get comment by ID

      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }

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
    });
  }
}

module.exports = CommentRepository;
