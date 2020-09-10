const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Users
      .find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {

    db.Users
    .findOne({ _id: req.params.id })
      .populate({path: 'savedWorkouts', model: 'Workouts', populate: {path: 'workout', model: 'Exercises'}}) 
      .then((dbModel) => {
        
        res.json(dbModel)
      })
      .catch((err) => res.status(422).json(err));
  },
  postById: function (req, res) {
    db.Users
      .findOne({ email: req.body.email })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  login: function (req, res) {
    db.Users
    .findOne({
      email: req.body.email,
    })
      .then((dbModel) => {
        if (!dbModel) {
          db.Users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            profileImage: req.body.profilePicURL,
          })
            .then((dbUser) => {
              res.send(dbUser);
            })
            .catch((err) => {
              res.json(err);
            });
        } else {
          res.send(dbModel);
        }
      })
      .catch((err) => {
        res.json(err);
      });
  },
  update: function (req, res) {
    db.Users
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Users
      .findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  getCurrentUser: function (req, res) {
    res.json(req.user);
  },
};
