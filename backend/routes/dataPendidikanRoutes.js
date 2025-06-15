const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataPendidikanController");

router.get("/data-pendidikan/", controller.getAll);
router.get("/data-pendidikan/:id", controller.getById);      
router.post("/data-pendidikan/", controller.create);
router.put("/data-pendidikan/:id", controller.update);        
router.delete("/data-pendidikan/:id", controller.remove);      

module.exports = router;
