class Comment {
  constructor(id, date, likes, member, post, text) {
    this.id = id || null; // UUID
    this.date = date || null; // LocalDateTime
    this.likes = likes || []; // List<Like>
    this.member = member || null; // Member instance
    this.post = post || null; // Post instance
    this.text = text || null; // String
  }
}