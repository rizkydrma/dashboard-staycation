const apiController = require("../controller/apiController");
const router = require("express").Router();
const { upload } = require("../middleware/multer");

// landing page
router.get("/landing-page", apiController.landingPage);

// detail page
router.get("/detail-page/:id", apiController.detailPage);

// booking page
router.post("/booking-page", upload, apiController.bookingPage);

module.exports = router;
