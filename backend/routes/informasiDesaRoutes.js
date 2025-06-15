const express = require("express");
const router = express.Router();
const controller = require("../controllers/informasiDesaController");

router.get("/informasi-desa/", controller.getAll);
router.get("/informasi-desa/:id", controller.getById);
router.post("/informasi-desa/", controller.create);
router.put("/informasi-desa/:id", controller.update);
router.delete("/informasi-desa/:id", controller.remove);

module.exports = router;