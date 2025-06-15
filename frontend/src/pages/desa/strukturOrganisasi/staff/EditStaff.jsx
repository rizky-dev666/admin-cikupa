import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditStaff = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nama_staff: "",
    jabatan: "",
    foto_staff: "",
  });

  const [preview, setPreview] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/struktur-organisasi/${id}`
        );
        const data = res.data;
        setFormData({
          nama_staff: data.nama_staff,
          jabatan: data.jabatan,
          foto_staff: data.foto_staff || "",
        });
        setPreview(data.foto_staff || null);
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil data pengguna");
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
      let fotoUrl = formData.foto_staff;
      if (fotoFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("foto_staff", fotoFile);

        const uploadRes = await axios.post(
          "/api/upload/struktur-organisasi",
          formDataUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        fotoUrl = uploadRes.data.url;
      }

      await axios.put(
        `/api/struktur-organisasi/edit-staff/${id}`,
        {
          ...formData,
          foto_staff: fotoUrl,
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data pengguna berhasil diperbarui",
        confirmButtonColor: "#3085d6",
      });

      navigate("/struktur-organisasi");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal memperbarui data pengguna",
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
          Edit Staff
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <label className="w-full text-center font-semibold mb-2">
                Foto Staff
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
                name="foto_staff"
                accept="image/*"
                onChange={handleFotoChange}
                className="mt-3"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">
                  Nama Staff
                </label>
                <input
                  type="text"
                  name="nama_staff"
                  value={formData.nama_staff}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">
                  Jabatan
                </label>
                <input
                  type="text"
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6 font-semibold disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStaff;
