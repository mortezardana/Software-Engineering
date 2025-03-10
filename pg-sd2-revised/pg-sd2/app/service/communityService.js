const CommunityRepository = require('../repository/CommunityRepo'); // Import the Community repository

class CommunityService {
    // Function to get all communities
    static getAllCommunities() {
        return CommunityRepository.getCommunities()
            .then(communities => {
                return communities;
            })
            .catch(err => {
                throw new Error('Error retrieving communities: ' + err.message);
            });
    }

    // Function to get a community by ID
    static getCommunityById(id) {
        return CommunityRepository.getCommunityById(id)
            .then(community => {
                return community;
            })
            .catch(err => {
                throw new Error('Error retrieving community by ID: ' + err.message);
            });
    }
}

module.exports = CommunityService;
