const User = require("../models/User");
const Profile = require("../models/ProfileModel");

const getProfileController = async (req, res) => {
  const { profileId } = req.params;
  console.log("Vao get 1");
  try {
    // const { data: _id } = req.user.id;
    let profile = await Profile.find({
      _id: profileId,
    })
    // .populate("myList");

    // profile = await Profile.populate(profile, {
    //   path: "myList.genre_ids",
    // });

    return res.status(200).json({
      profile,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
module.exports = getProfileController;
