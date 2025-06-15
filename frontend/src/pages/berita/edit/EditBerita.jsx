import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState({
    judul_berita: "",
    isi_berita: "",
    penulis_berita: "",
    gambar_berita: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await axios.get(`/api/berita/${id}`);
        setBerita(res.data);
        setPreview(res.data.gambar_berita);
      } catch (error) {
        console.error("Gagal mengambil berita:", error);
      }
    };

    fetchBerita();
  }, [id]);

  const handleChange = (e) => {
    setBerita({ ...berita, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = berita.gambar_berita;

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("gambar_berita", selectedFile);
        const uploadRes = await axios.post(
          "/api/upload/berita",
          formData
        );
        imageUrl = uploadRes.data.url;
      }

      await axios.put(`/api/berita/${id}`, {
        ...berita,
        gambar_berita: imageUrl,
      });

      await Swal.fire({
        icon: "success",
        title: "Berita berhasil diperbarui!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(`/berita/${id}`);
    } catch (error) {
      console.error("Gagal mengupdate berita:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan saat mengupdate berita.",
        text: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Berita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="judul_berita"
          value={berita.judul_berita}
          onChange={handleChange}
          placeholder="Judul Berita"
          className="w-full border rounded px-4 py-2"
          required
        />
        <textarea
          name="isi_berita"
          value={berita.isi_berita}
          onChange={handleChange}
          placeholder="Isi Berita"
          className="w-full border rounded px-4 py-2 h-40"
          required
        />
        <input
          type="text"
          name="penulis_berita"
          value={berita.penulis_berita}
          onChange={handleChange}
          placeholder="Penulis"
          className="w-full border rounded px-4 py-2"
          required
        />

        <input
          type="file"
          name="gambar_berita"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded border mb-2"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditBerita;
