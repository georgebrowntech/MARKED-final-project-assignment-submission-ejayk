const express = require("express");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");
// User model
let User = require("../models/User");

userRoute.post(
  "/register-user",
  [
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check("password", "Password should be between 5 to 8 characters long")
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 8 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
          username: req.body.username,
          password: hash
        });
        user
          .save()
          .then(response => {
            res.status(201).json({
              message: "User successfully created!",
              result: response
            });
          })
          .catch(error => {
            res.status(500).json({
              error: error
            });
          });
      });
    }
  }
);


// Sign-in
userRoute.post("/signin", (req, res, next) => {
    let getUser;
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            username: getUser.username,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
});


// Get Users
userRoute.route('/users').get((req, res) => {
    User.find((error, response) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json(response)
        }
    })
})

// Get Single User
userRoute.route('/user-profile/:id').get(authorize, (req, res, next) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

// Update User
userRoute.route('/update-user/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('User successfully updated!')
        }
    })
})


// Delete User
userRoute.route('/delete-user/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = userRoute;
