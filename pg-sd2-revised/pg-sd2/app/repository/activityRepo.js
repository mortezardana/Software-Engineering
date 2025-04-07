const connection = require('../service/db');
const Activity = require('../model/Activity');
const ActivityType = require('../model/ActivityType');

class ActivityRepository {
    // Get all activities
    static async getAllActivities(filters = {}, page = 1, limit = 10) {
        return new Promise(async (resolve, reject) => {
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
            console.log("Executing query:", query, "with params:", queryParams);

            queryParams.push(limit, offset);

            const results = await connection.query(query, [queryParams]);
            const activities = results.map((activityData) => {
                return new Activity(
                    activityData.id,
                    activityData.type,
                    activityData.averageSpeed,
                    activityData.distance,
                    activityData.elevation,
                    activityData.member,
                    activityData.movingTime
                );
            });

            resolve(activities);
        });
    }

    // Get an activity by ID
    static getActivityById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const query = 'SELECT * FROM activity WHERE id = ?';
                console.log("Executing query:", query, "with params:", id);
                const results = await connection.query(query, [id]);

                if (results.length > 0) {
                    const activityData = results[0];

                    const validType = Object.values(ActivityType).includes(activityData.type) ? activityData.type : null;

                    const activity = new Activity(
                        activityData.id, validType,
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
            } catch (error) {
                reject(error);
            }
        });
    }

    // Add a new activity
    static async addActivity(activity) {
        return new Promise(async (resolve, reject) => {
            const query = 'INSERT INTO activity (type, averageSpeed, distance, elevation, member_id, movingTime, routeGeoJson) VALUES (?, ?, ?, ?, ?, ?, ?)';
            console.log("Executing query:", query, "with params:", [activity.type, activity.averageSpeed, activity.distance, activity.elevation, activity.memberId, activity.movingTime, activity.movingTime, activity.routeGeoJson]);
            const results = await connection.query(query, [activity.type, activity.averageSpeed, activity.distance, activity.elevation, activity.memberId, activity.movingTime, activity.movingTime, activity.routeGeoJson]);
            resolve(results.insertId); // Return the new activity's ID
        });
    }

    // Add a new activity
    static async createActivity(activity) {
        return new Promise(async (resolve, reject) => {
            const query = 'INSERT INTO activity (type, averageSpeed, distance, elevation, member_id, movingTime, routeGeoJson) VALUES (?, ?, ?, ?, ?, ?, ?)';
            console.log("Executing query:", query, "with params:", [activity.type, activity.averageSpeed, activity.distance, activity.elevation, activity.memberId, activity.movingTime, activity.movingTime, activity.routeGeoJson]);
            const results = await connection.query(query, [activity.type, activity.averageSpeed, activity.distance, activity.elevation, activity.memberId, activity.movingTime, activity.routeGeoJson]);
            resolve(results.insertId); // Return the new activity's ID
        });
    }

    // Update an activity
    static async updateActivity(id, activity) {
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE activity SET averageSpeed = ?, distance = ?, elevation = ?, movingTime = ? WHERE id = ?';
            console.log("Executing query:", query, "with params:", [activity.averageSpeed, activity.distance, activity.elevation, activity.member, activity.movingTime, id]);
            const results = await connection.query(query, [activity.averageSpeed, activity.distance, activity.elevation, activity.member, activity.movingTime, id]);
            resolve(results.affectedRows);
        });
    }

    // Delete an activity
    static async deleteActivity(id) {
        return new Promise(async (resolve, reject) => {
            const query = 'DELETE FROM activity WHERE id = ?';
            console.log("Executing query:", query, "with params:", id);
            const results = await connection.query(query, [id], (err, results));
            if (err) {
                reject(err);
                return;
            }
            resolve(results.affectedRows);
        });
    }
    

    static async getActivitiesByMemberId(memberId) {
        return new Promise(async (resolve, reject) => {
            const query = 'SELECT * FROM activity WHERE member_id = ?';
            console.log("Executing query:", query, "with params:", memberId);
            const results = await connection.query(query, [memberId]);
            const activities = results.map((activityData) => {
                return new Activity(
                    activityData.id,
                    activityData.type,
                    activityData.averageSpeed,
                    activityData.distance,
                    activityData.elevation,
                    activityData.member,
                    activityData.movingTime
                );
            });
            resolve(activities)
        });
    }
}



module.exports = ActivityRepository;
