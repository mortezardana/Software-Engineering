class Post {
  constructor(id, date, text, pics, activity, writer, comments, community) {
    this.id = id || null; // UUID
    this.date = date || null; // LocalDateTime
    this.text = text || null; // String
    this.pics = pics || []; // List<String>
    this.activity = activity || null; // Activity instance
    this.writer = writer || null; // Member instance
    this.comments = comments || []; // List<Comment>
    this.community = community || null; // Community instance
  }
}