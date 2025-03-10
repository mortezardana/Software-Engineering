class Community {
  constructor(id, name, description, members, posts, badges) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._members = members;
    this._posts = posts;
    this._badges = badges; // List<Reward>
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get members() {
    return this._members;
  }

  set members(value) {
    this._members = value;
  }

  get posts() {
    return this._posts;
  }

  set posts(value) {
    this._posts = value;
  }

  get badges() {
    return this._badges;
  }

  set badges(value) {
    this._badges = value;
  }
}