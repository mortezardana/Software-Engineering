const connection = require('../service/db');
const Post = require('../model/Post');

class PostRepository {
  // Get all posts
  static async getAllPosts() {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM post';
      const results = await connection.query(query);

      // Map results to Post instances
      const posts = results.map((postData) => {
        return new Post(
            postData.id,
            postData.date,
            postData.text,
            postData.pics,
            postData.activity,  // Assuming activity is mapped separately
            postData.writer,    // Assuming member is mapped separately
            postData.comments,  // Assuming comments are mapped separately
            postData.community  // Assuming community is mapped separately
        );
      });

      resolve(posts);
    });
  }

  // Get a post by ID
  static async getPostById(id) {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM post WHERE id = ?';
      const results = await connection.query(query, [id]);

      if (results.length > 0) {
        const postData = results[0];
        const post = new Post(
            postData.id,
            postData.date,
            postData.text,
            postData.pics,
            postData.activity,
            postData.writer,
            postData.comments,
            postData.community
        );
        resolve(post);
      } else {
        resolve(null); // No post found
      }
    });
  }

  // Get a post by ID
  static async getPostByMemberId(memberId) {
    return new Promise(async (resolve, reject) => {
      const query = 'SELECT * FROM post WHERE writer_id = ?';
      const results = await connection.query(query, [memberId]);

        // Map results to Post instances
      const posts = results.map((postData) => {
        return new Post(
            postData.id,
            new Date(postData.date).toLocaleDateString(),
            postData.text,
            postData.pics,
            postData.activity_id,  // Assuming activity is mapped separately
            postData.writer_id,    // Assuming member is mapped separately
            postData.comments,  // Assuming comments are mapped separately
            postData.community_id  // Assuming community is mapped separately
        );
      });

      resolve(posts);
    });
  }

  // Add a new post
  static async addPost(post) {
    return new Promise(async (resolve, reject) => {
      const query = 'INSERT INTO post (date, text, pics, activity, writer, comments, community) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const results = await connection.query(query, [post.getDate(), post.getText(), post.getPics(), post.getActivity(), post.getWriter(), post.getComments(), post.getCommunity()]);
      resolve(results.insertId);
    });
  }

  // Update a post
  static async updatePost(id, post) {
    return new Promise(async (resolve, reject) => {
      const query = 'UPDATE post SET date = ?, text = ?, pics = ?, activity = ?, writer = ?, comments = ?, community = ? WHERE id = ?';
      const results = await connection.query(query, [post.getDate(), post.getText(), post.getPics(), post.getActivity(), post.getWriter(), post.getComments(), post.getCommunity(), id]);
      resolve(results.affectedRows);
    });
  }

  // Delete a post
  static async deletePost(id) {
    return new Promise(async (resolve, reject) => {
      const query = 'DELETE FROM post WHERE id = ?';
      const results = await connection.query(query, [id]);
      resolve(results.affectedRows);
    });
  }
}

module.exports = PostRepository;
