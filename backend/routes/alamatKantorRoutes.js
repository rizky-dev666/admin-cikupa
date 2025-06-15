const express = require("express");
const router = express.Router();
const controller = require("../controllers/alamatKantorController");

router.get("/alamat-kantor/", controller.getAll);
router.get("/alamat-kantor/:id", controller.getById);
router.post("/alamat-kantor/", controller.create);
router.put("/alamat-kantor/:id", controller.update);
router.delete("/alamat-kantor/:id", controller.remove);

module.exports = router;
