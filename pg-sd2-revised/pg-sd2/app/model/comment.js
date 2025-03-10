class Comment {
  constructor(id, date, likes, member, post, text) {
    this._id = id;
    this._date = date;
    this._likes = likes;
    this._member = member;
    this._post = post;
    this._text = text; // String
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }

  get likes() {
    return this._likes;
  }

  set likes(value) {
    this._likes = value;
  }

  get member() {
    return this._member;
  }

  set member(value) {
    this._member = value;
  }

  get post() {
    return this._post;
  }

  set post(value) {
    this._post = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }
}