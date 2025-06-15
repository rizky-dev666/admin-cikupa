const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataAgamaController");

router.get("/data-agama/", controller.getAll);
router.get("/data-agama/:id", controller.getById); 
router.post("/data-agama/", controller.create);
router.put("/data-agama/:id", controller.update); 
router.delete("/data-agama/:id", controller.remove); 

module.exports = router;
