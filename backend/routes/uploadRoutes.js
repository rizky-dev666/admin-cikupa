const express = require("express");
const multer = require("multer");
const {
  uploadFoto,
  uploadBanner,
  uploadGaleri,
  uploadBerita,
  uploadBagan,
  uploadFotoStaff,
  uploadLogo,
  uploadPengaduan,
  uploadProduk,
} = require("../controllers/uploadController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("foto"), uploadFoto);
router.post(
  "/upload/struktur-organisasi",
  upload.single("foto_staff"),
  uploadFotoStaff
);
router.post("/upload/produk", upload.single("gambar_produk"), uploadProduk);
router.post("/upload/banner", upload.single("gambar_banner"), uploadBanner);
router.post("/upload/galeri", upload.single("gambar_galeri"), uploadGaleri);
router.post("/upload/berita", upload.single("gambar_berita"), uploadBerita);
router.post("/upload/bagan", upload.single("gambar_bagan"), uploadBagan);
router.post("/upload/logo", upload.single("logo"), uploadLogo);
router.post("/upload/pengaduan", upload.single("pengaduan"), uploadPengaduan);

module.exports = router;
