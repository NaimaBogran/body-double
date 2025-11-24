const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const userPrefrencesController = require("../controllers/userPrefrences");
const matchController = require("../controllers/matchUsers");

// Main Routes
router.get("/", homeController.getIndex);

router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);

// Auth Routes
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

// User Filters
router.get("/filters", ensureAuth, (req, res) => {
  res.render("userPrefrences");
});
router.post("/filters", userPrefrencesController.createUserPrefrences);

// Matching
router.get("/match", ensureAuth, matchController.findMatch);

// Safety redirect if POST /match happens
router.post("/match", ensureAuth, (req, res) => {
  return res.redirect("/match");
});

module.exports = router;
