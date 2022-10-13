const express = require("express");
const addProfileController = require("../Controllers/add-profile-controller");
const getProfilesController = require("../Controllers/get-profiles-controller.js");
const getProfileController = require("../Controllers/get-profile-controller");
// const likeShowController = require("../Controllers/handle-like");
// const dislikeShowController = require("../Controllers/handle-dislike");
// const addToListController = require("../Controllers/add-toList-controller");
const verify = require("../verifyToken");

const router = express.Router();

router.post("/auth/addProfile", verify, addProfileController);

router.get("/auth/getProfiles", verify, getProfilesController);

router.get(
  "/auth/getProfile/:profileId",
  verify,
  getProfileController
);

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
