class Post {
  constructor(id, date, text, pics, activity, writer, comment_count, community, likes_count) {
    this.id = id || null; // UUID
    this.date = date || null; // LocalDateTime
    this.text = text || null; // String
    this.pics = pics || []; // List<String>
    this.activity = activity || null; // Activity instance
    this.writer = writer || null; // Member instance
    this.comment_count = comment_count || null; // List<Comment>
    this.community = community || null; // Community instance
    this.like_count = like_count || null;
  }
}