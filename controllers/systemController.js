const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  User.findOne({
    email: email,
  })
    .then((user) => {
      if (user) {
        console.log(user.password)
        req.session.isLoggedIn = true;
        req.user = user;

        bcrypt
          .compare(password, user.password)
          .then((isItCorrect) => {
            console.log(isItCorrect)
            if (isItCorrect) {
              return res.status(200).json({
                message: "Welcome user",
                userId : user._id
              });
            } else {
              return res.json({
                message: "Fuck you hacker",
                user : user
              });
            }
          })
          .catch((err) => console.log(err));
      } else {
        return res.json({
          message: "You dont exist. Register",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.register = async (req, res, next) => {

  const errors = validationResult(req);
  if(!errors.isEmpty){
    const error = new Error('Validation failed');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;


  const salt = await bcrypt.genSalt(2);
  const hashedPw = await bcrypt.hash(password,salt);


  
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPw,
      });
      newUser.save()
    .then((result) => {
      res.status(200).json({
        message: "New user has been registered",
      });
    })
    .catch((err) => console.log(err));
    
};


exports.logOut = (req, res, next) => {
  const user = req.body.user;
  req.session.destroy();
};
