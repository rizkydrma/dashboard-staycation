const express = require("express");
const router = express.Router();

// CONTROLLER
const adminController = require("../controller/adminController");

// middleware
const { upload } = require("../middleware/multer");

// SET ROUTE GET - ENDPOINT
router.get("/dashboard", adminController.viewDashboard);
router.get("/item", adminController.viewItem);
router.get("/booking", adminController.viewBooking);

// SET ROUTE CATEGORY
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.editCategory);
router.delete("/category/:id", adminController.deleteCategory);

// set route bank
router.get("/bank", adminController.viewBank);
router.post("/bank", upload, adminController.addBank);
router.put("/bank", upload, adminController.editBank);
router.delete("/bank/:id", adminController.deleteBank);
module.exports = router;
