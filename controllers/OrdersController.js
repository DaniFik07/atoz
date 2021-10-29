let Orders = require('../services').OrdersService
let Model_Orders = require('../models').Orders
var randomstring = require("randomstring");
const moment = require('moment');

exports.Submit_prepaid = (req, res) => {
    Model_Orders.findAll({
        attributes: ['order_no']
    }).then(data => {
        var ngacak = Math.floor(Math.random() * 10000000000);
        if (ngacak == data) {
            ngacak = Math.floor(Math.random() * 10000000000);
        }
        var fee = parseInt(req.body.VALUE) * 5 / 100
        payload = {};
        payload.user_id = req.id;
        payload.order_no = ngacak;
        payload.type = "prepaid";
        payload.no_telpon = req.body.NO_TELP;
        payload.value = parseInt(req.body.VALUE);
        payload.price = parseInt(req.body.VALUE) + fee;


        Model_Orders.build(payload)
            .save()
            .then(data => {
                console.log(data.dataValues);
                if (data)
                    res.json({
                        status: "200 OK",
                        msg: "Form Submitted",
                        data: ngacak
                    });
            })
            .catch(err => {
                res.json({
                    status: "error",
                    msg: "Form failed submitted"
                });
            });
    });
};

exports.Submit_product = (req, res) => {
    Model_Orders.findAll({
        attributes: ['order_no']
    }).then(data => {
        var ngacak = Math.floor(Math.random() * 10000000000);
        if (ngacak == data) {
            ngacak = Math.floor(Math.random() * 10000000000);
        }
        payload = {};
        payload.user_id = req.id;
        payload.order_no = ngacak;
        payload.type = "product";
        payload.shipping_code = randomstring.generate(8);
        payload.product_name = req.body.PRODUCT_NAME;
        payload.address = req.body.ADDRESS;
        payload.value = parseInt(req.body.VALUE);
        payload.price = parseInt(req.body.VALUE) + 10000;


        Model_Orders.build(payload)
            .save()
            .then(data => {
                console.log(data.dataValues);
                if (data)
                    res.json({
                        status: "200 OK",
                        msg: "Form Submitted",
                        data: ngacak
                    });
            })
            .catch(err => {
                res.json({
                    status: "error",
                    msg: "Form failed submitted"
                });
            });
    });
};

exports.Success_page = function (req, res) {
    Orders.getorderbyid(req.params.id, callback => {
        if (!callback || !callback.length) {
            res.json({
                status: "failed",
                message: "data not found"
            });
        } else {
            if (callback[0]['type'] == "product") {
                var msg = callback[0]['product_name'] + " that costs Rp." + callback[0]['price'] + " will be shipped to : " + callback[0]['address'] + " only after you pay"
            }
            if (callback[0]['type'] == "prepaid") {
                var msg = "Your mobile phone number " + callback[0]['no_telpon'] + " will receive Rp." + callback[0]['value']
            }
            res.json({
                msg: msg,
                status: "200 OK",
                data: callback
            });
        }
    })
};


exports.Payment = (req, res) => {
    var today = new Date();
    var time = today.getHours();
    let percent = Math.random() * 100;
    Orders.getorderbyid(req.body.ORDER_NO, callback => {
        payload = {};
        if (callback[0]['type'] == "product") {
            payload.shipping_code = callback[0]['shipping_code'];
            payload.product_name = callback[0]['product_name'];
            payload.address = callback[0]['address'];
            payload.order_no = callback[0]['order_no'];
            payload.value = callback[0]['value'];
            Model_Orders.update(
                { states: 'success' },
                { where: { order_no: req.body.ORDER_NO } }
            )
                .then(data => {
                    console.log(data.dataValues);
                    if (data)
                        res.json({
                            status: "200 OK",
                            msg: "Form Submitted"
                        });
                })
                .catch(err => {
                    res.json({
                        status: "error",
                        msg: "Form failed submitted"
                    });
                });
        }
        else {

            payload.user_id = callback[0]['user_id'];
            payload.order_no = callback[0]['order_no'];
            payload.no_telpon = callback[0]['no_telpon'];
            payload.value = callback[0]['value'];

            if (time >= "9" && time <= "17") {
                if (percent <= 90) {
                    payload.states = "success";
                }
                else {
                    payload.states = "failed";
                }
            }
            else {
                if (percent <= 40) {
                    payload.states = "success";
                }
                else {
                    payload.states = "failed";
                }
            }
            if (req.id == callback[0]['user_id']) {
                Model_Orders.update(
                    { states: payload.states },
                    { where: { order_no: req.body.ORDER_NO } }
                )
                    .then(data => {
                        console.log(data.dataValues);
                        if (data)
                            res.json({
                                status: "200 OK",
                                msg: "Form Submitted"
                            });
                    })
                    .catch(err => {
                        res.json({
                            status: "error",
                            msg: "Form failed submitted"
                        });
                    });
            }
            else {
                res.json({
                    status: "error",
                    msg: "Form failed submitted"
                });
            }
        }
    });
}
exports.Order_history = function (req, res) {
    let page = req.query.page
    Model_Orders.findAndCountAll({
        where: {
            user_id: req.id
        },
        order: [['date', 'DESC']],
        limit: 20,
        offset: parseInt(page),
    })
        .then(data => {
            var custom_res = []
            var datas = data['rows']
            console.log(datas)
            for (var x = 0; x < datas.length; x++) {
                if (datas[x]['dataValues']['type'] == 'prepaid') {
                    datas[x]['dataValues']['msg'] = datas[x]['dataValues']['value'] + ' for ' + datas[x]['dataValues']['no_telpon'];
                    console.log(datas[x]['dataValues']['msg'])
                    custom_res.push(datas[x]['dataValues'])

                } else if (datas[x]['dataValues']['type'] == 'product') {
                    datas[x]['dataValues']['msg'] = datas[x]['dataValues']['product_name'] + ' that costs ' + datas[x]['dataValues']['value'];
                    custom_res.push(datas[x]['dataValues'])
                }

            }
            res.json({
                status: "200 OK",
                msg: "Form Submitted",
                data: data,
                datas: custom_res,
                offset: page

            });
        })
        .catch(err => {
            res.json({
                status: "error",
                msg: "no data"
            });
        });
}

exports.Check_pending = function (req, res) {
    Orders.getdate(row => {
        for (var rows in row) {
            minutes = 5;
            ini = new Date(row[rows]['date']);
            dbnow = moment(ini).format('HH:mm');

            var currentDate = new Date();
            var futureDate = new Date(currentDate.getTime() - minutes * 60000);
            const haha = moment(futureDate).format('HH:mm');
            if (dbnow < haha) {
                Model_Orders.update(
                    { states: 'cancelled' },
                    { where: { order_no: row[rows]['order_no'] } }
                )
                    .then(data => {
                        console.log(data.dataValues);
                        if (data)
                            res.json({
                                status: "200 OK",
                                msg: "Form Submitted"
                            });
                    })
                    .catch(err => {
                        res.json({
                            status: "error",
                            msg: "Form failed submitted"
                        });
                    });
            } else {
                res.json({
                    status: "200 OK",
                    msg: "No order in pending"
                });
            }
        }
    })
};