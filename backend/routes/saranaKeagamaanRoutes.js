const express = require("express");
const router = express.Router();
const controller = require("../controllers/saranaKeagamaanController");

router.get("/data-sarana-keagamaan", controller.getAll);
router.get("/data-sarana-keagamaan/:id", controller.getById);     
router.post("/data-sarana-keagamaan/", controller.create);
router.put("/data-sarana-keagamaan/:id", controller.update);      
router.delete("/data-sarana-keagamaan/:id", controller.remove);  

module.exports = router;
