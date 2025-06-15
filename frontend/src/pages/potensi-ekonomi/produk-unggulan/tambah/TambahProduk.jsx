import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TambahProduk = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_produk: "",
    harga: "",
    deskripsi_produk: "",
    no_tlp: "",
  });

  const [gambaProduk, setGambarProduk] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setGambarProduk(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let gambaProdukURL = "";

      if (gambaProduk) {
        const form = new FormData();
        form.append("gambar_produk", gambaProduk);

        setIsUploading(true);
        Swal.fire({
          title: "Mengunggah foto...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const uploadRes = await axios.post("/api/upload/produk", form);
        gambaProdukURL = uploadRes.data.url;

        Swal.close();
        setIsUploading(false);
      }

      const dataToSend = {
        ...formData,
        gambar_produk: gambaProdukURL,
      };
      await axios.post("/api/produk", dataToSend);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "produk berhasil ditambahkan",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/potensi-ekonomi/produk-unggulan");
      });
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan produk",
      });
    }
  };

  return (
    <div className="flex justify-center min-h-screen  p-4">
      <div className="bg-white  rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Tambah Pengguna
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <label className="w-full text-center font-semibold mb-2">
                Foto Produk
              </label>
              <div className="w-48 h-48 bg-gray-200 rounded border border-dashed flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-500">Preview</span>
                )}
              </div>
              <input
                name="gambar_produk"
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="mt-3"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Nama Produk
                </label>
                <input
                  type="text"
                  name="nama_produk"
                  value={formData.nama_produk}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Deskripsi
                </label>
                <input
                  type="text"
                  name="deskripsi_produk"
                  value={formData.deskripsi_produk}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Harga</label>
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  No tlp / whatsapp
                </label>
                <input
                  type="number"
                  name="no_tlp"
                  value={formData.no_tlp}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6 font-semibold disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? "Mengunggah..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahProduk;
