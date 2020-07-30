const express = require("express");
const router = express.Router();

// CONTROLLER
const adminController = require("../controller/adminController");

// SET ROUTE - ENDPOINT
router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);
router.get("/bank", adminController.viewBank);
router.get("/item", adminController.viewItem);
router.get("/booking", adminController.viewBooking);

module.exports = router;
