import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduk = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama_produk: "",
    harga: "",
    deskripsi_produk: "",
    no_tlp: "",
    gambar_produk: "",
  });

  const [preview, setPreview] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/produk/${id}`);
        const data = res.data;
        setFormData({
          nama_produk: data.nama_produk,
          deskripsi_produk: data.deskripsi_produk,
          harga: data.harga,
          no_tlp: data.no_tlp,
          gambar_produk: data.gambar_produk || "",
        });
        setPreview(data.gambar_produk || null);
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil data produk");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let fotoUrl = formData.gambar_produk;
      if (fotoFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("gambar_produk", fotoFile);

        const uploadRes = await axios.post(
          "/api/upload/produk",
          formDataUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        fotoUrl = uploadRes.data.url;
      }

      await axios.put(`/api/produk/${id}`, {
        ...formData,
        gambar_produk: fotoUrl,
      });

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data produk berhasil diperbarui",
        confirmButtonColor: "#3085d6",
      });

      navigate("/potensi-ekonomi/produk-unggulan");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal memperbarui data produk",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Edit Produk
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

export default EditProduk;
