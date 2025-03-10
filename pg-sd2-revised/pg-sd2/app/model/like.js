class Like {
  constructor(id, comment, post, likes) {
    this._id = id;
    this._comment = comment;
    this._post = post;
    this._likes = likes; // List<Member>
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get comment() {
    return this._comment;
  }

  set comment(value) {
    this._comment = value;
  }

  get post() {
    return this._post;
  }

  set post(value) {
    this._post = value;
  }

  get likes() {
    return this._likes;
  }

  set likes(value) {
    this._likes = value;
  }
}