import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TambahPengguna = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email_pengguna: "",
    nama_pengguna: "",
    password: "",
    level_pengguna: "",
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fotoURL = "";

      if (foto) {
        const form = new FormData();
        form.append("foto", foto);

        setIsUploading(true);
        Swal.fire({
          title: "Mengunggah foto...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const uploadRes = await axios.post("/api/upload", form);
        fotoURL = uploadRes.data.url;

        Swal.close();
        setIsUploading(false);
      }

      const dataToSend = {
        ...formData,
        foto_pengguna: fotoURL,
      };

      await axios.post("/api/users", dataToSend);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pengguna berhasil ditambahkan",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/pengguna");
      });
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan pengguna",
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
                Foto Pengguna
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
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="mt-3"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email_pengguna"
                  value={formData.email_pengguna}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama_pengguna"
                  value={formData.nama_pengguna}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Level Pengguna
                </label>
                <select
                  name="level_pengguna"
                  value={formData.level_pengguna}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                >
                  <option value="">Pilih Level</option>
                  <option value="2">Admin</option>
                  <option value="3">Oprator</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6 font-semibold disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? "Mengunggah..." : "Simpan Pengguna"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahPengguna;
