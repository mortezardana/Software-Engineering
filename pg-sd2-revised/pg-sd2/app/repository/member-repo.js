

const connection = require('./services/db'); // Import the database connection
const Member = require('./Member');  // Import the Member class


// Function to get all members from the database
const getMembers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM members';  // SQL query to get all members

    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      // Map the results to instances of the Member class
      const members = results.map(memberData => {
        return new Member(
          memberData.id,
          memberData.username,
          memberData.name,
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
};

// Function to get a member by ID
const getMemberById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM members WHERE id = ?';  // SQL query to get member by id

    connection.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      if (results.length > 0) {
        // Map the result to a Member class instance
        const memberData = results[0];
        const member = new Member(
          memberData.id,
          memberData.username,
          memberData.name,
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
        resolve(null); // No member found with the given ID
      }
    });
  });
};

module.exports = {
  getMembers,
  getMemberById
};
