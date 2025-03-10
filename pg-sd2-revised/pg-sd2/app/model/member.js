class Member {
  constructor(id, username, name, bio, email, password, activities, comments, communities, likes, posts, rewards) {
    this._id = id;
    this._username = username;
    this._name = name;
    this._bio = bio;
    this._email = email;
    this._password = password;
    this._activities = activities;
    this._comments = comments;
    this._communities = communities;
    this._likes = likes;
    this._posts = posts;
    this._rewards = rewards; // List<Reward>
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get username() {
    return this._username;
  }

  set username(value) {
    this._username = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get bio() {
    return this._bio;
  }

  set bio(value) {
    this._bio = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get password() {
    return this._password;
  }

  set password(value) {
    this._password = value;
  }

  get activities() {
    return this._activities;
  }

  set activities(value) {
    this._activities = value;
  }

  get comments() {
    return this._comments;
  }

  set comments(value) {
    this._comments = value;
  }

  get communities() {
    return this._communities;
  }

  set communities(value) {
    this._communities = value;
  }

  get likes() {
    return this._likes;
  }

  set likes(value) {
    this._likes = value;
  }

  get posts() {
    return this._posts;
  }

  set posts(value) {
    this._posts = value;
  }

  get rewards() {
    return this._rewards;
  }

  set rewards(value) {
    this._rewards = value;
  }
}