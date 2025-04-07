const CommunityRepository = require('../repository/CommunityRepo'); // Import the Community repository

class CommunityService {
    // Function to get all communities
    static async getAllCommunities({ page, pageSize, search }) {
        return await CommunityRepository.getCommunities({ page, pageSize, search });
      }

    static getMyCommunities(){
        return CommunityRepository.getMyCommunities()
        .then(communities => {
          // You can add filtering or pagination logic here if needed
          console.log(communities);
          return communities;
        })
        .catch(err => {
          throw new Error('Error retrieving communities: ' + err.message);
        });
        
    }

    static joinCommunity(memberId, communityId) {
      return CommunityRepository.joinCommunity(memberId, communityId)
        .then(() => {
          return true;  // Successfully joined the community
        })
        .catch(err => {
          throw new Error('Error joining community: ' + err.message);
        });
    }

    static getCommunityById(id) {
        return CommunityRepository.getCommunityById(id)
          .then(community => {
            return community;
          })
          .catch(err => {
            throw new Error('Error retrieving community by ID: ' + err.message);
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

    // Function to get a community by ID
    static getCommunityMembership(id) {
        return CommunityRepository.getCommunityMembership(id)
            .then(community => {
                return community;
            })
            .catch(err => {
                throw new Error('Error retrieving community by ID: ' + err.message);
            });
    }

    // Function to get a community by ID
    static getAllMembersOfCommunity(id) {
        return CommunityRepository.getAllMembersOfCommunity(id)
            .then(community => {
                return community;
            })
            .catch(err => {
                throw new Error('Error retrieving community by ID: ' + err.message);
            });
    }
}

module.exports = CommunityService;
