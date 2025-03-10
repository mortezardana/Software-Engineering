class Post {
  constructor(id, date, text, pics, activity, writer, comments, community) {
    this._id = id;
    this._date = date;
    this._text = text;
    this._pics = pics;
    this._activity = activity;
    this._writer = writer;
    this._comments = comments;
    this._community = community; // Community instance
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

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get pics() {
    return this._pics;
  }

  set pics(value) {
    this._pics = value;
  }

  get activity() {
    return this._activity;
  }

  set activity(value) {
    this._activity = value;
  }

  get writer() {
    return this._writer;
  }

  set writer(value) {
    this._writer = value;
  }

  get comments() {
    return this._comments;
  }

  set comments(value) {
    this._comments = value;
  }

  get community() {
    return this._community;
  }

  set community(value) {
    this._community = value;
  }
}