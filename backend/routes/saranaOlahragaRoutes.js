const express = require("express");
const router = express.Router();
const controller = require("../controllers/saranaOlahragaController");

router.get("/data-sarana-olahraga/", controller.getAll);
router.get("/data-sarana-olahraga/:id", controller.getById);     
router.post("/data-sarana-olahraga/", controller.create);
router.put("/data-sarana-olahraga/:id", controller.update);      
router.delete("/data-sarana-olahraga/:id", controller.remove);  

module.exports = router;
