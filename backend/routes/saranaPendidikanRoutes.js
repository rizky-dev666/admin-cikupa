const express = require("express");
const router = express.Router();
const controller = require("../controllers/saranaPendidikanController");

router.get("/data-sarana-pendidikan", controller.getAll);
router.get("/data-sarana-pendidikan/:id", controller.getById);     
router.post("/data-sarana-pendidikan/", controller.create);
router.put("/data-sarana-pendidikan/:id", controller.update);      
router.delete("/data-sarana-pendidikan/:id", controller.remove);  

module.exports = router;
