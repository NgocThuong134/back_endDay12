const express = require("express");
const router = express.Router();
const userRender = require("../services/user-render");
const userControll = require("../controllers/user-controller");

router.get("/", userRender.home);

router.get("/add", userRender.add_user);
router.post("/add_user", userControll.add_user);

router.get("/update/:id", userRender.update_user);
router.post("/update_user/:id", userControll.update_user);

router.get("/delete/:id", userRender.delete_user);

router.get("/post", userRender.post);   

router.get("/create_post", userRender.add_post);
router.post("/add_post", userControll.add_post);

router.get("/update_post/:id", userRender.update_post);
router.post("/update_post/:id", userControll.update_post);

router.get("/delete_post/:id", userRender.delete_post);
module.exports = router;
