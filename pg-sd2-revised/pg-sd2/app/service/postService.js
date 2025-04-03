const PostRepository = require('../repository/PostRepo'); // Import the Post repository

class PostService {
    // Function to get all posts
    static getAllPosts() {
        return PostRepository.getPosts()
            .then(posts => {
                return posts;
            })
            .catch(err => {
                throw new Error('Error retrieving posts: ' + err.message);
            });
    }

    // Function to get a post by ID
    static getPostById(id) {
        return PostRepository.getPostById(id)
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error('Error retrieving post by ID: ' + err.message);
            });
    }

    // Function to get a post by ID
    static getPostByMemberId(memberId) {
        return PostRepository.getPostByMemberId(memberId)
            .then(posts => {
                return posts;
            })
            .catch(err => {
                throw new Error('Error retrieving post by ID: ' + err.message);
            });
    }
}

module.exports = PostService;
