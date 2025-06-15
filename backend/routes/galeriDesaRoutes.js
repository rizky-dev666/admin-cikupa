const express = require("express");
const router = express.Router();
const controller = require("../controllers/galeriDesaController");

router.post("/galeri/", controller.tambahGaleri);
router.get("/galeri/", controller.getAll);
router.get("/galeri/:id", controller.getById);
router.put("/galeri/:id", controller.update);
router.delete("/galeri/:id", controller.remove);

module.exports = router;
