const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataPendudukController");

router.get("/data-penduduk/", controller.getAll);
router.get("/data-domisili/", controller.getAllDomisili);
router.get("/data-penduduk/:id", controller.getById);
router.get("/data-domisili/:id", controller.getByIdDomisili);
router.post("/data-penduduk/", controller.create);
router.post("/data-domisili/", controller.createDomisili);
router.put("/data-penduduk/:id", controller.update);
router.put("/data-domisili/:id", controller.updateDomisili);
router.delete("/data-penduduk/:id", controller.remove);
router.delete("/data-domisili/:id", controller.removeDomisili);

module.exports = router;
