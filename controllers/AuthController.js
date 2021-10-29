let User = require("../models").Users;
let jwt = require("jsonwebtoken");

exports.Authentication = function(req, res) {
  User.findOne({
    where: {
      email: req.body.EMAIL,
      password: req.body.PASSWORD
    }
  })
    .then(data => {
      // Mock User
      const user = {
        id: data.id,
        email: data.email,
        name: data.name
      };

      // Generate Token
      jwt.sign({ user: user }, "ATOZ", (err, token) => {
        if (err) throw error;

        // Decode Token
        let decoded = jwt.verify(token, "ATOZ");

        // Kirim response ke API
        res.json({
          status: "200 OK",
          msg: "Berhasil Login",
          token: token,
          user_data: {
            id_user: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
          }
        });
      });
    })
    .catch(err => {
      res.json({
        status: "error",
        data: null
      });
    });
};
