
const RewardType = require('./RewardType'); // Import the RewardType enum

class Reward {
  constructor(id, name, type, requirements, community, members) {
    this.id = id || null; // UUID
    this.name = name || null; // String
    this.type = type || RewardType.TROPHY; // RewardType
    this.requirements = requirements || null; // String
    this.community = community || null; // Community instance
    this.members = members || []; // List<Member>
  }
}