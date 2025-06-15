const express = require("express");
const multer = require("multer");
const controller = require("../controllers/bannerController");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/banner/", controller.getAll);
router.post("/banner/", controller.tambahBanner);
router.get("/banner/:id", controller.getById);
router.put("/banner/:id", controller.update);
router.delete("/banner/:id", controller.remove);

module.exports = router;
