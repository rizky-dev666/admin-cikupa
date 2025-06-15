import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TambahBanner = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    isi_banner: "",
  });

  const [gambarBanner, setGambarBanner] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    setGambarBanner(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let gambarURL = "";

      if (gambarBanner) {
        const form = new FormData();
        form.append("gambar_banner", gambarBanner);

        setIsUploading(true);
        Swal.fire({
          title: "Mengunggah gambar...",
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const uploadRes = await axios.post(
          "/api/upload/banner",
          form
        );
        gambarURL = uploadRes.data.url;

        Swal.close();
        setIsUploading(false);
      }

      const dataToSend = {
        isi_banner: formData.isi_banner,
        gambar_banner: gambarURL,
      };

      await axios.post("/api/banner", dataToSend);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Banner berhasil ditambahkan",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/banner");
      });
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menambahkan banner",
      });
    }
  };

  return (
    <div className="flex justify-center min-h-screen px-4">
      <div className=" p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Tambah Banner
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <label className="w-full text-center font-semibold mb-2">
                Gambar Banner
              </label>
              <div className="w-64 h-40 bg-gray-200 rounded border border-dashed flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-500">Preview Gambar</span>
                )}
              </div>
              <input
                type="file"
                name="gambar_banner"
                accept="image/*"
                onChange={handleGambarChange}
                className="mt-3"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2">Isi Banner</label>
              <textarea
                name="isi_banner"
                value={formData.isi_banner}
                onChange={handleChange}
                rows={6}
                className="w-full border rounded p-3 resize-none"
                placeholder="Tulis isi banner..."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6 font-semibold disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? "Mengunggah..." : "Simpan Banner"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahBanner;
