const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.chekUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        // res.cookie("jwt", "", { maxAge: 1 });
      } else {
        // console.log("decoded token: " + decodedToken.id);
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        // console.log(res.locals.user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        res.locals.user = decodedToken;
        console.log("hello" + decodedToken.id);
        next();
      }
    });
  } else {
    console.log("no token");
  }
};
// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.status(401).json("Unauthorized");
//       } else {
//         // Assurez-vous que res.locals.user est défini avec les données du jeton
//         res.locals.user = decodedToken;
//         res.status(201).json(decodedToken.id);
//         console.log(decodedToken.id);
//         next();
//       }
//     });
//   } else {
//     res.status(401).json("Unauthorized");
//   }
// };
