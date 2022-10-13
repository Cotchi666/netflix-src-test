const express = require("express");
const addProfileController = require("../Controllers/add-profile-controller");
const getProfilesController = require("../Controllers/get-profiles-controller.js");
const getProfileController = require("../Controllers/get-profile-controller");
// const likeShowController = require("../Controllers/handle-like");
// const dislikeShowController = require("../Controllers/handle-dislike");
// const addToListController = require("../Controllers/add-toList-controller");
const verify = require("../verifyToken");
const authenticateToken = require("../pro");

const router = express.Router();

router.post("/addProfile",authenticateToken, addProfileController);
console.log("Vao add ne");
router.get("/getProfiles", verify, getProfilesController);
console.log("Vao ne 2");
router.get(
  "/getProfile/:profileId",
  verify,
  getProfileController
);
console.log("Vao ne 3");
// router.post(
//   "/auth/profile/like/:showId",
//   authenticateToken,
//   likeShowController
// );

// router.post(
//   "/auth/profile/dislike/:showId",
//   authenticateToken,
//   dislikeShowController
// );

// router.post(
//   "/auth/profile/addToList/:showId",
//   verify,
//   addToListController
// );

module.exports = router;
