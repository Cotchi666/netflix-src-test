const User = require("../models/User");
const Profile = require("../models/ProfileModel");
const addProfileController = async (req, res) => {
  //logged user id
  const { data: _id } = req.user.id;
  const { name } = req.user.username;
  Profile.create({
    name,
    userId: _id,
  })
    .then(async (newProfile) => {
      await User.findByIdAndUpdate(_id, {
        $addToSet: { profiles: [newProfile._id] },
      });
      return res.status(200).json({
        newProfile,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err.message,
      });
    });
};

module.exports = addProfileController;
