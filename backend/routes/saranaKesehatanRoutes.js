const express = require("express");
const router = express.Router();
const controller = require("../controllers/saranaKesehatanController");

router.get("/data-sarana-kesehatan", controller.getAll);
router.get("/data-sarana-kesehatan/:id", controller.getById);     
router.post("/data-sarana-kesehatan/", controller.create);
router.put("/data-sarana-kesehatan/:id", controller.update);      
router.delete("/data-sarana-kesehatan/:id", controller.remove);  

module.exports = router;
