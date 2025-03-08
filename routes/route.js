const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog');
const {upload}=require('../controllers/blog');
const authController = require('../controllers/auth');



// user routes
router.post("/register",authController.Register);
router.post("/login",authController.Login);
router.get("/user/:id",authController.getUser);
router.get("/logout",authController.Logout);
//blog routes
router.post("/blog",upload.single("image"),BlogController.createBlog);
router.get("/blog",BlogController.getBlogs);
// router.get("/getUserBlogs/:userId",BlogController.getUserBlogs)
router.put('/blog/:id',BlogController.updateBlog);
router.delete('/blog/:id', BlogController.deleteBlog);


module.exports = router;