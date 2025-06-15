const express = require("express");
const router = express.Router();
const controller = require("../controllers/beritaController");

router.get("/berita/", controller.getAll);
router.get("/berita/:id", controller.getById);
router.post("/berita/", controller.create);
router.put("/berita/:id", controller.update);
router.delete("/berita/:id", controller.remove);
router.post("/berita/tambah-berita", controller.tambahBerita);

module.exports = router;
