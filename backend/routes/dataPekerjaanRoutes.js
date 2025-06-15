const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataPekerjaanController");

router.get("/data-pekerjaan/", controller.getAll);
router.get("/data-pekerjaan/:id", controller.getById);     
router.post("/data-pekerjaan/", controller.create);
router.put("/data-pekerjaan/:id", controller.update);      
router.delete("/data-pekerjaan/:id", controller.remove);  

module.exports = router;
