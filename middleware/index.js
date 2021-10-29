const jwt = require("jsonwebtoken");
let User = require("../services").UserService;

module.exports = function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    // Pisahkan dengan SPASI
    const bearer = bearerHeader.split(" ");
    // dapatkan token dari array
    const bearerToken = bearer[1];
    // Set token
    req.token = bearerToken;

    // Decoded JWT
    jwt.verify(bearerToken, "ATOZ", (err, decoded) => {
      if (err) {
        res.send(
          JSON.stringify({
            success: "False",
            msg: "Authentikasi Token gagal"
          })
        );
        console.log('Unauthorized Token');
      } else {
        let payload = {
          email: decoded.user.email,
          name: decoded.user.name
        };

        User.checkToken(payload, rows => {
          if (rows) {
            req.id = decoded.user.id
            req.name = decoded.user.name
            return next()
          }else {
            res.json({
              "status": "failed",
              "data": 'Unauthorized Token'
            })
            console.log('Unauthorized Token');   
          }
          
        });
      }
    });

    // Lanjutkan dengan next()
    console.log("\n-> Token yang digunakan : ");
    console.log(bearerToken);
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};
