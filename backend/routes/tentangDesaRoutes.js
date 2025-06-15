const express = require("express");
const router = express.Router();
const controller = require("../controllers/tentangDesaController");

router.get("/desa/:id", controller.getById);
router.put("/desa/:id", controller.update);

module.exports = router;
