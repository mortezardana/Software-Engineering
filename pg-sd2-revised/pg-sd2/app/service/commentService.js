const CommentRepository = require('../repository/CommentRepo'); // Import the Comment repository

class CommentService {
    // Function to get all comments
    static getAllComments() {
        return CommentRepository.getComments()
            .then(comments => {
                return comments;
            })
            .catch(err => {
                throw new Error('Error retrieving comments: ' + err.message);
            });
    }

    // Function to get a comment by ID
    static getCommentById(id) {
        return CommentRepository.getCommentById(id)
            .then(comment => {
                return comment;
            })
            .catch(err => {
                throw new Error('Error retrieving comment by ID: ' + err.message);
            });
    }
}

module.exports = CommentService;
