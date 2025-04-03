const connection = require('../service/db');
const Post = require('../model/Post');

class PostRepository {
  // Get all posts
  static getAllPosts() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM post';
      connection.query(query, (err, results) => {
        if (err) {
          reject(err);
          return;
        }

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
    });
  }

  // Get a post by ID
  static getPostById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM post WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }

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
    });
  }

  // Get a post by ID
  static getPostByMemberId(memberId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM post WHERE writer_id = ?';
      connection.query(query, [memberId], (err, results) => {
        if (err) {
          reject(err);
          return;
        }

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
    });
  }

  // Add a new post
  static addPost(post) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO post (date, text, pics, activity, writer, comments, community) VALUES (?, ?, ?, ?, ?, ?, ?)';
      connection.query(query, [post.getDate(), post.getText(), post.getPics(), post.getActivity(), post.getWriter(), post.getComments(), post.getCommunity()], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId);
      });
    });
  }

  // Update a post
  static updatePost(id, post) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE post SET date = ?, text = ?, pics = ?, activity = ?, writer = ?, comments = ?, community = ? WHERE id = ?';
      connection.query(query, [post.getDate(), post.getText(), post.getPics(), post.getActivity(), post.getWriter(), post.getComments(), post.getCommunity(), id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows);
      });
    });
  }

  // Delete a post
  static deletePost(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM post WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows);
      });
    });
  }
}

module.exports = PostRepository;
