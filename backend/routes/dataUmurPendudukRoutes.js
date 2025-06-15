const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataUmurPendudukController");

router.get("/data-umur/", controller.getAll);
router.get("/data-umur/:id", controller.getById);   
router.post("/data-umur/", controller.create);
router.put("/data-umur/:id", controller.update);   
router.delete("/data-umur/:id", controller.remove);     

module.exports = router;
