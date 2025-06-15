const express = require("express");
const multer = require("multer");
const controller = require("../controllers/produkController");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/produk/", controller.getAll);
router.post("/produk/", controller.tambahproduk);
router.get("/produk/:id", controller.getById);
router.put("/produk/:id", controller.update);
router.delete("/produk/:id", controller.remove);

module.exports = router;
