const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  userName: {type: String, required: true, trim: true, minlength: 3, maxlength: 50},
  namePost: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
  content: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
  imgs: { type: String, required: false, trim: true, maxlength: 255 },
  createAt: {type: Date, default: Date.now},
  updateAt: {type: Date, default: Date.now}
});

const PostDB = mongoose.model("post", PostSchema);
module.exports = PostDB;