const ActivityRepository = require('../repository/ActivityRepo');

class ActivityService {
    static async getAllActivities({ page, pageSize, search }) {
        return await ActivityRepository.getActivities({ page, pageSize, search });
    }

    static async getActivityById(id) {
        return await ActivityRepository.getActivityById(id);
    }

    static async createActivity(data) {
        return await ActivityRepository.createActivity(data);
    }

    static async updateActivity(id, data) {
        return await ActivityRepository.updateActivity(id, data);
    }

    static async deleteActivity(id) {
        return await ActivityRepository.deleteActivity(id);
    }
}

module.exports = ActivityService;
