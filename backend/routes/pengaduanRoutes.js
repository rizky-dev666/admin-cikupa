const express = require("express");
const router = express.Router();
const controller = require("../controllers/pengaduanController");

// router.get("/data-pengaduan/", controller.getAll);
// router.get("/data-pengaduan/:id", controller.getById);
router.post("/data-pengaduan/", controller.create);
// router.put("/data-pengaduan/:id", controller.update);
router.delete("/data-pengaduan/:id", controller.remove);
router.get('/pengaduan', controller.getMessages);
router.get('/pengaduan/:id', controller.getMessageById);
router.put('/pengaduan/:id_pengaduan', controller.markAsRead);

module.exports = router;
