const userDB = require("../models/user");
const postDB = require("../models/post");

exports.home = async (req, res, next) => {
  try {
    const users = await userDB.find();
    if (users.length === 0) {
      return res.render("index", { users: null, title: "Express" });
    }

    res.render("index", { users, title: "Express" });
  } catch (err) {
    next(err);
  }
};
exports.add_user = (req, res, next) => {
  res.render("add", {});
};

exports.update_user = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userToUpdate = await userDB.findById(id);

    if (userToUpdate) {
      res.render("update", { userToUpdate });
    } else {
      res.status(404).send("Không tìm thấy người dùng");
    }
  } catch (err) {
    next(err);
  }
};

exports.delete_user = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await userDB.findByIdAndDelete(id);

    if (deletedUser) {
      console.log("Người dùng đã bị xóa:", deletedUser);
    } else {
      console.log("Không tìm thấy người dùng cần xóa");
    }

    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.post = async (req, res, next) => {
  try {
    const posts = await postDB.find();
    if (posts.length === 0) {
      return res.render("post_index", { posts: null, title: "Express" });
    }

    res.render("post_index", { posts, title: "Express" });
  } catch (err) {
    next(err);
  }
};
exports.add_post = async (req, res, next) => {
  try {
    const users = await userDB.find({});
    res.render("add_post", { formType: "add_post", users });
  } catch (err) {
    next(err);
  }
};
exports.update_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const postToUpdate = await postDB.findById(id);

    if (postToUpdate) {
      // Cập nhật các trường của bài viết
      postToUpdate.namePost = req.body.namePost || postToUpdate.namePost;
      postToUpdate.content = req.body.content || postToUpdate.content;
      postToUpdate.imgs = req.body.imgs || postToUpdate.imgs;
      postToUpdate.updateAt = Date.now();

      // Lưu các thay đổi
      await postToUpdate.save();
      const users = await userDB.find({});
      res.render("update_post", { postToUpdate, users });
    } else {
      res.status(404).send("Không tìm thấy bài viết");
    }
  } catch (err) {
    next(err);
  }
};
exports.delete_post = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedPost = await postDB.findByIdAndDelete(id);

    if (deletedPost) {
      console.log("Bài viết đã bị xóa:", deletedPost);
    } else {
      console.log("Không tìm thấy bài viết cần xóa");
    }

    res.redirect("/post");
  } catch (err) {
    next(err);
  }
};
