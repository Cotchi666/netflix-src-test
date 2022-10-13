const User = require("../models/User");
const Profile = require("../models/ProfileModel");
const addProfileController = async (req, res) => {
  console.log("Vao add");
  //logged user id

  const { data: _id } = req.id;
  const { name } = req.body;
  console.log("Vao _id", req.id);
  console.log("Vao name", name);

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
