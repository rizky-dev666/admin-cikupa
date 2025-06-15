const express = require("express");
const router = express.Router();
const controller = require("../controllers/lokasiDesaController");

router.get("/lokasi-desa/", controller.getAll);
router.get("/lokasi-desa/:id", controller.getById);
router.post("/lokasi-desa/", controller.create);
router.put("/lokasi-desa/:id", controller.update);
router.delete("/lokasi-desa/:id", controller.remove);

module.exports = router;
