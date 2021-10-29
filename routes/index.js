// api-routes.js
// Initialize express router (menginisialisasi router pada express)
let router = require("express").Router();
const verifyToken = require("./../middleware");
const path = require("path");
// ========================================
// === Mensetting response default API ===
router.get("/", function(req, res) {
  res.json({
    status: "200 OK",
    message: "Selamat datang di ATOZ.COM"
  });
});
// ===================================================
let Users = require("../controllers/UserController");
let Auth = require("../controllers/AuthController");
let Orders = require("../controllers/OrdersController");

// Halaman yang bisa diakses tanpa token
router.route("/register").post(Users.CreateUser);
router.route("/auth").post(Auth.Authentication);

// Check status cron job
router.route("/check_pending").get(Orders.Check_pending);

// Setting Middleware disini
router.use(verifyToken);
// End Setting Middleware

// Check unpaid orders 
router.route("/check").get(Users.getUser);

// Post Submit 
router.route("/submit_prepaid").post(Orders.Submit_prepaid);
router.route("/submit_product").post(Orders.Submit_product);

// Get Success page
router.route("/success_page/:id").get(Orders.Success_page);

// Post payment
router.route("/payment").post(Orders.Payment);

// Get order history
router.route("/order_history").get(Orders.Order_history);

module.exports = router;
