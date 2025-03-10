const connection = require('../service/db');
const Activity = require('../model/Activity');

class ActivityRepository {
  // Get all activities
  static getAllActivities(filters = {}, page = 1, limit = 10) {
    return new Promise((resolve, reject) => {
      let whereClause = 'WHERE 1=1';
      let queryParams = [];

      if (filters.type) {
        whereClause += ' AND type = ?';
        queryParams.push(filters.type);
      }

      if (filters.member) {
        whereClause += ' AND member = ?';
        queryParams.push(filters.member);
      }

      const offset = (page - 1) * limit;
      const query = `SELECT * FROM activity ${whereClause} LIMIT ? OFFSET ?`;

      queryParams.push(limit, offset);

      connection.query(query, queryParams, (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        const activities = results.map((activityData) => {
          return new Activity(
              activityData.id,
              activityData.averageSpeed,
              activityData.distance,
              activityData.elevation,
              activityData.member,
              activityData.movingTime
          );
        });

        resolve(activities);
      });
    });
  }

  // Get an activity by ID
  static getActivityById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM activity WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        if (results.length > 0) {
          const activityData = results[0];
          const activity = new Activity(
              activityData.id,
              activityData.averageSpeed,
              activityData.distance,
              activityData.elevation,
              activityData.member, // Assuming member is mapped separately
              activityData.movingTime
          );
          resolve(activity);
        } else {
          resolve(null); // No activity found
        }
      });
    });
  }

  // Add a new activity
  static addActivity(activity) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO activity (averageSpeed, distance, elevation, member, movingTime) VALUES (?, ?, ?, ?, ?)';
      connection.query(query, [activity.getAverageSpeed(), activity.getDistance(), activity.getElevation(), activity.getMember(), activity.getMovingTime()], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.insertId); // Return the new activity's ID
      });
    });
  }

  // Update an activity
  static updateActivity(id, activity) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE activity SET averageSpeed = ?, distance = ?, elevation = ?, movingTime = ? WHERE id = ?';
      connection.query(query, [activity.getAverageSpeed(), activity.getDistance(), activity.getElevation(), activity.getMovingTime(), id], (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results.affectedRows);
      });
    });
  }

  // Delete an activity
  static deleteActivity(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM activity WHERE id = ?';
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

module.exports = ActivityRepository;
