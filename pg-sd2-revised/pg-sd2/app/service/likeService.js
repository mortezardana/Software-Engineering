const LikeRepository = require('../repository/LikeRepo'); // Import the Like repository

class LikeService {
    // Function to get all likes
    static getAllLikes() {
        return LikeRepository.getLikes()
            .then(likes => {
                return likes;
            })
            .catch(err => {
                throw new Error('Error retrieving likes: ' + err.message);
            });
    }

    // Function to get a like by ID
    static getLikeById(id) {
        return LikeRepository.getLikeById(id)
            .then(like => {
                return like;
            })
            .catch(err => {
                throw new Error('Error retrieving like by ID: ' + err.message);
            });
    }
}

module.exports = LikeService;
