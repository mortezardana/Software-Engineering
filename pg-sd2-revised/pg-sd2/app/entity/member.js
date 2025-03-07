class Member {
  constructor(id, username, name, email, password, activities, comments, communities, likes, posts, rewards) {
    this.id = id || null; // UUID
    this.username = username || null; // String
    this.name = name || null; // String
    this.email = email || null; // String
    this.password = password || null; // String
    this.activities = activities || []; // List<Activity>
    this.comments = comments || []; // List<Comment>
    this.communities = communities || []; // List<Community>
    this.likes = likes || []; // List<Like>
    this.posts = posts || []; // List<Post>
    this.rewards = rewards || []; // List<Reward>
  }
}