let User = require('../services').UserService
let Orders = require('../services').OrdersService
var validator = require("email-validator");

exports.CreateUser = function (req, res) {
  let param = {}
  param.name = req.body.NAME;
  param.email = req.body.EMAIL;
  param.password = req.body.PASSWORD;

  if (validator.validate(req.body.EMAIL) == false) {
    if (req.body.PASSWORD.length < 6) {
      res.json({
        status: "500 Bad Request",
        msg: "Password min 6 karakter"
      })
    }
    res.json({
      status: "500 Bad Request",
      msg: "Email tidak valid"
    })
    console.log(req.body.PASSWORD.length);
  }
  else {
    User.createUser(param, (callback) => {

      if (callback) res.json({
        status: "200 OK",
        msg: 'Registrasi berhasil'
      })
    })
  }
}

exports.getUser = function (req, res) {
  let User_id = req.id
  Orders.Check_unpaid(User_id, (rows) => {
    if (!rows || !rows.length) {
      res.json({
        status: "error",
        data: null
      });
    } else {
      res.json({
        status: "200 OK",
        data: rows[0]['unpaid'],
        name: req.name
      });
    }
  });
}