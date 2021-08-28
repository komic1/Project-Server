const express = require("express");
const { body } = require("express-validator/check");

const systemController = require("../controllers/systemController");
const user = require("../models/user");

const router = express.Router();

router.post("/login", systemController.logIn);
router.post(
  "/register",
  /*[
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return user
          .findOne({
            email: value,
          })
          .then((userDoc) => {
            if (userDoc) {
              return Promise.reject("Email address already exists!");
            }
          });
      })
      .normalizeEmail(),
      body('password')
      .trim()
      .isLength({min : 5}),
      body('name')
      .trim()
      .not()
      .isEmpty()
  ],*/
  systemController.register
);
router.post("/logout", systemController.logOut);

module.exports = router;
