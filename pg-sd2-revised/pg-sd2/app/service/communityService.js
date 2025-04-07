const CommunityRepository = require('../repository/CommunityRepo'); // Import the Community repository

class CommunityService {
    // Function to get all communities
    static getAllCommunities({ page, pageSize, search }) {
        return CommunityRepository.getCommunities()
          .then(communities => {
            // You can add filtering or pagination logic here if needed
            return communities;
          })
          .catch(err => {
            throw new Error('Error retrieving communities: ' + err.message);
          });
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
}

module.exports = CommunityService;
