const RewardType = require('./RewardType');  // Import the RewardType enum

class Reward {
  constructor(id, name, type, requirements, community, members) {
    this._id = id || null; // UUID
    this._name = name || null; // String
    this._type = type || RewardType.BADGE; // Default to 'Badge' if not provided
    this._requirements = requirements || null; // String
    this._community = community || null; // Community instance
    this._members = members || []; // List<Member>
  }

  // Getter and Setter for id
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  // Getter and Setter for name
  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  // Getter and Setter for type
  get type() {
    return this._type;
  }

  set type(value) {
    if (!Object.values(RewardType).includes(value)) {
      throw new Error(`Invalid reward type: ${value}. Must be one of ${Object.values(RewardType).join(', ')}`);
    }
    this._type = value;
  }

  // Getter and Setter for requirements
  get requirements() {
    return this._requirements;
  }

  set requirements(value) {
    this._requirements = value;
  }

  // Getter and Setter for community
  get community() {
    return this._community;
  }

  set community(value) {
    this._community = value;
  }

  // Getter and Setter for members
  get members() {
    return this._members;
  }

  set members(value) {
    this._members = value;
  }
}

module.exports = Reward;
