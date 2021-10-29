var sequelize = require("../common/mysql");

exports.Check_unpaid = (User_id,cb) => {
  let statement = "SELECT count(id) as unpaid FROM orders";
  statement += ` WHERE user_id = ${User_id} AND states = "pending"`;
  sequelize.query(statement).spread((data) => {
        cb(data);
    });
};

exports.getorderbyid = (id, cb) => {
  let statement = `SELECT * FROM orders`;
  statement += ` WHERE order_no = ${id}`
  sequelize.query(statement).spread(data => {
    cb(data);
  });
};

exports.getdate = (cb) => {
  let statement = `SELECT * FROM orders where states = 'pending'`;
  sequelize.query(statement).spread(data => {
    cb(data);
  });
};