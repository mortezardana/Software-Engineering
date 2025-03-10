const connection = require('../service/db'); // Assuming you're using MySQL
const Member = require('../model/Member');

class MemberRepository {
  // Get all members with pagination and filtering
  static getAllMembers(filters = {}, page = 1, limit = 10) {
    return new Promise((resolve, reject) => {
      // Build the WHERE clause for filtering dynamically
      let whereClause = 'WHERE 1=1';  // Default "always true" condition for base query
      let queryParams = [];

      if (filters.username) {
        whereClause += ' AND username LIKE ?';
        queryParams.push(`%${filters.username}%`); // Example of filtering by username
      }

      if (filters.email) {
        whereClause += ' AND email LIKE ?';
        queryParams.push(`%${filters.email}%`); // Example of filtering by email
      }

      if (filters.name) {
        whereClause += ' AND name LIKE ?';
        queryParams.push(`%${filters.name}%`); // Example of filtering by name
      }

      // Calculate offset based on the page number and limit
      const offset = (page - 1) * limit;

      // SQL query with pagination and filtering
      const query = `SELECT * FROM member ${whereClause} LIMIT ? OFFSET ?`;

      // Add pagination parameters
      queryParams.push(limit, offset);

      connection.query(query, queryParams, (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        // Map results to Member instances
        const members = results.map((memberData) => {
          return new Member(
              memberData.id,
              memberData.username,
              memberData.name,
              memberData.bio,
              memberData.email,
              memberData.password,
              [], // activities
              [], // comments
              [], // communities
              [], // likes
              [], // posts
              []  // rewards
          );
        });

        resolve(members);
      });
    });
  }

  // Get a member by ID
  static getMemberById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM member WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        if (results.length > 0) {
          const memberData = results[0];
          const member = new Member(
              memberData.id,
              memberData.username,
              memberData.name,
              memberData.bio,
              memberData.email,
              memberData.password,
              [], // activities
              [], // comments
              [], // communities
              [], // likes
              [], // posts
              []  // rewards
          );
          resolve(member);
        } else {
          resolve(null); // No member found
        }
      });
    });
  }

  // Add a new member
  static addMember(member) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO member (username, name, email, password) VALUES (?, ?, ?, ?)';
      connection.query(query, [member.getUsername(), member.getName(), member.getEmail(), member.getPassword()], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId); // Return the new member's ID
      });
    });
  }

  // Update a member
  static updateMember(id, member) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE member SET username = ?, name = ?, email = ?, password = ? WHERE id = ?';
      connection.query(query, [member.getUsername(), member.getName(), member.getEmail(), member.getPassword(), id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows);
      });
    });
  }

  // Delete a member
  static deleteMember(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM member WHERE id = ?';
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

module.exports = MemberRepository;
