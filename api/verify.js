const jwt = require("jsonwebtoken");

const verify2 = async (req, res, next) => {
  console.log("ssadadas");
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json("Token is not valid");
      console.log("ssadadas");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
  next();
};
// function verify(req, res, next) {

//   const authHeader = req.headers.token;

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     // console.log("check token2",token)
//     jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");

//       req.user = user;
//       // console.log("check token ok", user)

//       next();
//     });
//   } else {
//     return res.status(401).json("You are not authenticated!");
//   }
// }
module.exports = verify2;
