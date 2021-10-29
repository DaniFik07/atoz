var sequelize = require("../common/mysql");
let Users = require('../models').Users

exports.createUser = function(param, cb){
  var queryObj = {};
	queryObj.name = param.name;
  queryObj.email = param.email;
	queryObj.password = param.password;
  console.log(queryObj);
  
	Users.build(queryObj).save().then((data) => {
		console.log(data.dataValues);
		cb(data.dataValues);
	}).catch((err) => {
		cb(err);
	})
}

exports.checkToken = function(payload, cb){
  Users.findOne({
    where: {
      email: payload.email,
      name: payload.name
    }
  })
    .then(data => {
      cb(data)
    })
    .catch(err => {
      cb(null)
    });
}

exports.getUser = (cb) => {
  let statement = "SELECT * FROM users";
  sequelize.query(statement).spread((data) => {
        cb(data);
    });
};
