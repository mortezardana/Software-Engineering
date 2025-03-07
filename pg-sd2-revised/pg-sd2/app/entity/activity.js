class Activity {
  constructor(id, averageSpeed, distance, elevation, member, movingTime) {
    this.id = id || null; // UUID
    this.averageSpeed = averageSpeed || null; // Double
    this.distance = distance || null; // Double
    this.elevation = elevation || null; // Double
    this.member = member || null; // Member instance
    this.movingTime = movingTime || null; // String
  }
}