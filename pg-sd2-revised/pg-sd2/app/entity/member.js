const db = require("../services/db");
const bcrypt = require("bcryptjs");

class Member {
  constructor(id, username, name, email, password, activities, comments, communities, likes, posts, rewards) {
    this.id = id || null; // UUID
    this.username = username || null; // String
    this.name = name || null; // String
    this.email = email || null; // String
    this.password = password || null; // String
    this.activities = activities || []; // List<Activity>
    this.comments = comments || []; // List<Comment>
    this.communities = communities || []; // List<Community>
    this.likes = likes || []; // List<Like>
    this.posts = posts || []; // List<Post>
    this.rewards = rewards || []; // List<Reward>
  }

  async getIdFromEmail() {
    var sql = "SELECT id FROM member WHERE member.email = ?";
    const result = await db.query(sql, [this.email]);
    // TODO LOTS OF ERROR CHECKS HERE..
    if (JSON.stringify(result) != '[]') {
        this.id = result[0].id;
        return this.id;
    }
    else {
        return false;
    }
  }

  async setMemberPassword(password) {
    const pw = await bcrypt.hash(password, 10);
    var sql = "UPDATE mmembers SET password = ? WHERE member.id = ?"
    const result = await db.query(sql, [pw, this.id]);
    return true;
  }

  async addMember(password){
    const pw = await bcrypt.hash(password, 10);
    var sql = "INSERT INTO member (email, password, username) VALUES (? , ?)";
    const result = await db.query(sql, [this.email, pw, username]);
    console.log(result.insertId);
    this.id = result.insertId;
    return true;
  }
  // Test a submitted password against a stored password
  async authenticate(submitted) {
    // Get the stored, hashed password for the user
    var sql = "SELECT password FROM Users WHERE id = ?";
    const result = await db.query(sql, [this.id]);
    const match = await bcrypt.compare(submitted, result[0].password);
    if (match == true) {
        return true;
    }
    else {
        return false;
    }
  }



  async hashPassword(){
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  async comparePassword(inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
  }
}
