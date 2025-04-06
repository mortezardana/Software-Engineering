const PostRepository = require('../repository/PostRepo'); // Import the Post repository
const ActivityRepository = require('../repository/ActivityRepo'); // Import the Post repository

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
    static async getPostByMemberId(memberId) {
        const posts = await PostRepository.getPostByMemberId(memberId);
        const postsWithActivity = await Promise.all(
            posts.map(async (post) => {
                console.log("Post service: ", post)
                if (post.activity) {
                    const activity = await ActivityRepository.getActivityById(post.activity);
                    console.log("Activity in post service: ", activity)
                    return { ...post, activity };
                }
                return { ...post, activity: null}
            })
        );
        return postsWithActivity;
        // return PostRepository.getPostByMemberId(memberId)
        //     .then(posts => {
        //         return posts;
        //     })
        //     .catch(err => {
        //         throw new Error('Error retrieving post by ID: ' + err.message);
        //     });
    }
}

module.exports = PostService;
