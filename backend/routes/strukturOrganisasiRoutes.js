const express = require("express");
const router = express.Router();
const controller = require("../controllers/strukturOrganisasiController");

router.get("/struktur-organisasi/", controller.getAll);
router.get("/struktur-organisasi/bagan", controller.getBagan);
router.get("/struktur-organisasi/:id", controller.getById);
router.post("/struktur-organisasi/staff", controller.tambahStaff);
router.post("/struktur-organisasi/", controller.create);
router.post("/struktur-organisasi/bagan", controller.tambahBagan);
router.put("/struktur-organisasi/:id", controller.update);
router.delete("/struktur-organisasi/bagan/:id", controller.remove);
router.delete("/struktur-organisasi/:id", controller.hapusStaff);
router.put("/struktur-organisasi/edit-staff/:id", controller.updateStaff);

module.exports = router;
