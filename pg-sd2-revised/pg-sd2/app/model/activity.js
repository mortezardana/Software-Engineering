const ActivityType = require('./ActivityType');  // Import the ActivityType enum

class Activity {
  constructor(id, type, averageSpeed, distance, elevation, member, movingTime) {
    this._id = id || null; // UUID
    this._type = type || ActivityType.RUN; // ActivityType enum, default to RUN if not provided
    this._averageSpeed = averageSpeed || null; // Double
    this._distance = distance || null; // Double
    this._elevation = elevation || null; // Double
    this._member = member || null; // Member instance
    this._movingTime = movingTime || null; // String
  }

  // Getter and Setter for id
  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  // Getter and Setter for type
  get type() {
    return this._type;
  }

  set type(value) {
    if (!Object.values(ActivityType).includes(value)) {
      throw new Error(`Invalid activity type: ${value}. Must be one of ${Object.values(ActivityType).join(', ')}`);
    }
    this._type = value;
  }

  // Getter and Setter for averageSpeed
  get averageSpeed() {
    return this._averageSpeed;
  }

  set averageSpeed(value) {
    this._averageSpeed = value;
  }

  // Getter and Setter for distance
  get distance() {
    return this._distance;
  }

  set distance(value) {
    this._distance = value;
  }

  // Getter and Setter for elevation
  get elevation() {
    return this._elevation;
  }

  set elevation(value) {
    this._elevation = value;
  }

  // Getter and Setter for member
  get member() {
    return this._member;
  }

  set member(value) {
    this._member = value;
  }

  // Getter and Setter for movingTime
  get movingTime() {
    return this._movingTime;
  }

  set movingTime(value) {
    this._movingTime = value;
  }
}

module.exports = Activity;
