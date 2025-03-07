class Community {
  constructor(id, name, description, members, posts, badges) {
    this.id = id || null; // UUID
    this.name = name || null; // String
    this.description = description || null; // String
    this.members = members || []; // List<Member>
    this.posts = posts || []; // List<Post>
    this.badges = badges || []; // List<Reward>
  }
}