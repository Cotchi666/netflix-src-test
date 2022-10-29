const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
//REGISTER
router.post("/register", async (req, res) => {
  console.log("1", req.body.email);
  console.log("2", req.body.username);
  console.log("3", req.body.password);

  const hashPassword = bcrypt.hashSync(req.body.password, salt);
  console.log("password", req.body.password);
  const checkusername = await User.findOne({
    username: req.body.username,
  });
  if (checkusername) return res.status(400).json("USername already exist");

  const checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) return res.status(400).json("Email already exist");

  const newUser = await new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  // const newUser = await new User({
  //   username: "asdasdaasddd",
  //   email: "ccacac@acacdad",
  //   password: hashPassword,
  // });
  try {
    console.log("vao");

    const user = await newUser.save();
    console.log("vao 2");

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");
    console.log("jjfjf", user);
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(401).json("Invalid password");
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/google_login", async (req, res) => {
  try {
    const { email, name } = req.body;
    console.log(email);
    // res.status(200).json({ msg: "ok" });

    const user = await User.findOne({ email: email });
    if (!user) {
      try {
        const newUser = new User({
          username: name,
          email: email,
          password: CryptoJS.AES.encrypt(
            "thisisakeyasddadasdasd",
            process.env.SECRET_KEY
          ).toString(),
        });
        const userrs = await newUser.save();
        const { password, ...info } = userrs._doc;

        res.status(200).json({ ...info, accessToken });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.SECRET_KEY,
          { expiresIn: "5d" }
        );

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
