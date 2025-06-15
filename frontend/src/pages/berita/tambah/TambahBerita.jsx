import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TambahBerita = () => {
  const [formData, setFormData] = useState({
    penulis_berita: "",
    judul_berita: "",
    isi_berita: "",
  });
  const [gambarFile, setGambarFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let gambarUrl = "";

      if (gambarFile) {
        const uploadData = new FormData();
        uploadData.append("gambar_berita", gambarFile);

        const uploadRes = await axios.post(
          "/api/upload/berita",
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        gambarUrl = uploadRes.data.url;
      }

      await axios.post("/api/berita/tambah-berita", {
        ...formData,
        isi_berita: formData.isi_berita,
        gambar_berita: gambarUrl,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berita berhasil ditambahkan",
      }).then(() => {
        navigate("/berita");
      });

      setFormData({
        penulis_berita: "",
        judul_berita: "",
        isi_berita: "",
      });
      setGambarFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan berita",
      });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Tambah Berita</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="penulis_berita"
          placeholder="Penulis Berita"
          value={formData.penulis_berita}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="judul_berita"
          placeholder="Judul Berita"
          value={formData.judul_berita}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="isi_berita"
          placeholder="Isi Berita (boleh pakai baris baru)"
          rows={6}
          value={formData.isi_berita}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="file"
          name="gambar_berita"
          accept="image/*"
          onChange={(e) => setGambarFile(e.target.files[0])}
          className="w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Berita
        </button>
      </form>
    </div>
  );
};

export default TambahBerita;
