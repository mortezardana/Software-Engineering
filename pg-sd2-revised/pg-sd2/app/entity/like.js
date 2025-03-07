class Like {
  constructor(id, comment, post, likes) {
    this.id = id || null; // UUID
    this.comment = comment || null; // Comment instance
    this.post = post || null; // Post instance
    this.likes = likes || []; // List<Member>
  }
}