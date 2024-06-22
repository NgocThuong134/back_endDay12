const mongoose = require("mongoose");
const userDB = require("../models/user");
const postDB = require("../models/post");
require("dotenv").config();

exports.add_user = async (req, res, next) => {
  try {
    const newUser = new userDB({
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      address: req.body.address,
    });
    await newUser.save();
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.update_user = async (req, res, next) => {
  try {
    const updatedUser = {
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      address: req.body.address,
    };
    await userDB.findByIdAndUpdate(req.params.id, updatedUser);
    console.log("Người dùng đã được cập nhật:", updatedUser);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.add_post = async (req, res, next) => {
  try {
    // Lấy dữ liệu từ req.body
    const { namePost, content, imgs, user } = req.body;
    const userInfo = await userDB.findById(user).select("name");

    // Tạo bài post mới
    const newPost = new postDB({
      id: Date.now().toString(),
      namePost,
      content,
      imgs,
      user: user,
      userName: userInfo.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Lưu bài post mới vào database
    await newPost.save();

    console.log("Bài post mới đã được tạo:", newPost);
    res.redirect("/post");
  } catch (err) {
    next(err);
  }
};
exports.update_post = async (req, res, next) => {
  try {
    const userId = await userDB
      .findById(req.body.userName)
      .select("name")
      .lean();
    const updatedPost = {
      user: req.body.userName,
      userName: userId.name,
      namePost: req.body.namePost,
      content: req.body.content,
      imgs: req.body.imgs || req.body.oldImgs,
    };

    await postDB.findByIdAndUpdate(req.params.id, updatedPost);
    res.redirect("/post");
  } catch (err) {
    next(err);
  }
};
