const express = require("express");
const router = express.Router();

// CONTROLLER
const adminController = require("../controller/adminController");

// SET ROUTE GET - ENDPOINT
router.get("/dashboard", adminController.viewDashboard);
router.get("/bank", adminController.viewBank);
router.get("/item", adminController.viewItem);
router.get("/booking", adminController.viewBooking);

// SET ROUTE CATEGORY
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

// SET ROUTE PUT - ENDPOINT
module.exports = router;
