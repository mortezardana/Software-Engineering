const connection = require('../service/db'); // Assuming you're using MySQL
const Member = require('../model/Member');

class MemberRepository {
  // Get all members with pagination and filtering
  static getAllMembers(filters = {}, page = 1, limit = 10) {
    return new Promise(async (resolve, reject) => {
      const query = `SELECT * FROM member`;

      console.log("Executing query:", query);
      const results = await connection.query(query);
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
  }

  // Get a member by ID
  static getMemberById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM member WHERE id = ?';
      console.log("Executing query:", query, "with params:", id);
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

  // Get a member by Username
  static getMemberByUsername(username) {
    return new Promise( async (resolve, reject) => {
      const query = 'SELECT * FROM member WHERE username = ?';
      console.log("Executing query:", query, "with params:", username);
      const results = await connection.query(query, [username]);
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
  }

  // Get a member by Username
  static getMemberByEmail(email) {
    return new Promise( async (resolve, reject) => {
      const query = 'SELECT * FROM member WHERE email = ?';
      console.log("Executing query:", query, "with params:", email);
      const results = await connection.query(query, [email]);
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
  }

  // Add a new member
  static addMember(member) {
    return new Promise(async (resolve, reject) => {
      const query = 'INSERT INTO member (username, email, password) VALUES (?, ?, ?)';
      console.log("Executing query:", query, "with params:", [member.username, member.email, member.password]);
      await connection.query(query, [member.username, member.email, member.password], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId); // Return the new member's ID
      });
    });
  }

  static setMemberPassword(pw, id) {
    return new Promise(async (resolve, reject) => {
      const query = "UPDATE member SET password = ? WHERE member.id = ?";
      console.log("Executing query:", query, "with params:", [pw, id]);
      await connection.query(query, [pw, id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results)
      });
    });
  }

  // Update a member
  static updateMember(id, member) {
    return new Promise(async (resolve, reject) => {
      const query = 'UPDATE member SET username = ?, name = ?, email = ?, password = ? WHERE id = ?';
      console.log("Executing query:", query, "with params:", [member.username, member.name, member.email, member.password, id]);
      await connection.query(query, [member.username, member.name, member.email, member.password, id], (err, results) => {
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
    return new Promise(async (resolve, reject) => {
      const query = 'DELETE FROM member WHERE id = ?';
      console.log("Executing query:", query, "with params:", id);
      await connection.query(query, [id], (err, results) => {
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
