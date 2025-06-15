const express = require("express");
const router = express.Router();
const controller = require("../controllers/penggunaController");
router.post("/users", controller.addUser);
router.get("/pengguna", controller.getAllPengguna);
router.get("/pengguna/:id", controller.penggunaId);
router.put("/edit-pengguna/:id", controller.updatePengguna);
router.put("/pengguna/:id", controller.updateLevelPengguna);
router.delete("/pengguna/:id", controller.hapusPengguna);


module.exports = router;
