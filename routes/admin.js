const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// CONTROLLER
const adminController = require("../controller/adminController");

// middleware
const { upload, uploadMultiple } = require("../middleware/multer");

// SET ROUTE SIGN IN
router.get("/signin", adminController.viewSignIn);
router.post("/signin", adminController.actionSignIn);

// USER MUST LOGIN FIRST FOR INTO DASHBOARD
router.use(auth);
router.get("/logout", adminController.actionLogout);

// SET ROUTE GET - ENDPOINT
router.get("/dashboard", adminController.viewDashboard);

// SET ROUTE ITEM
router.get("/item", adminController.viewItem);
router.get("/item/:id", adminController.showEditItem);
router.get("/item/show-image/:id", adminController.showImageItem);
router.post("/item", uploadMultiple, adminController.addItem);
router.put("/item/:id", uploadMultiple, adminController.editItem);
router.delete("/item/:id/delete", adminController.deleteItem);

// SET ROUTE DETAIL ITEM
// FEATURE
router.get("/item/show-detail-item/:itemId", adminController.showDetailItem);
router.post("/item/add/feature", upload, adminController.addFeature);
router.put("/item/update/feature", upload, adminController.editFeature);
router.delete("/item/:itemId/feature/:id", adminController.deleteFeature);
// ACTIVITY
router.post("/item/add/activity", upload, adminController.addActivity);
router.put("/item/update/activity", upload, adminController.editActivity);
router.delete("/item/:itemId/activity/:id", adminController.deleteActivity);

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

// SET ROUTE BOOKING
router.get("/booking", adminController.viewBooking);
router.get("/booking/:id", adminController.showDetailBooking);
router.put("/booking/:id/:confirmation", adminController.actionConfirmation);
module.exports = router;
