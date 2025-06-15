const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataPerkawinanController");

router.get("/data-perkawinan/", controller.getAll);
router.get("/data-perkawinan/:id", controller.getById);     
router.post("/data-perkawinan/", controller.create);
router.put("/data-perkawinan/:id", controller.update);      
router.delete("/data-perkawinan/:id", controller.remove);  

module.exports = router;
