import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AlamatKantor = () => {
  const [formData, setFormData] = useState({
    provinsi: "",
    kota: "",
    kecamatan: "",
    kode_pos: "",
    nama_jalan: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const kantorId = "ed3a3140-a994-4deb-aca2-8cb3eeec8cec";

  useEffect(() => {
    const fetchAlamat = async () => {
      try {
        const response = await axios.get(
          `/api/alamat-kantor/${kantorId}`
        );
        const data = response.data;
        setFormData({
          provinsi: data.provinsi,
          kota: data.kota,
          kecamatan: data.kecamatan,
          kode_pos: data.kode_pos,
          nama_jalan: data.nama_jalan,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchAlamat();
  }, []);

  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      await axios.put(
        `/api/alamat-kantor/${kantorId}`,
        formData
      );
      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Alamat kantor berhasil diperbarui.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Gagal memperbarui data:", error);

      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal memperbarui data. Silakan coba lagi.",
        confirmButtonColor: "#d33",
        confirmButtonText: "Tutup",
      });
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">Alamat Kantor Desa</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-6 gap-6">
            {["provinsi", "kota", "kecamatan", "kode_pos"].map((field) => (
              <div key={field} className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type={field === "kode_pos" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                />
              </div>
            ))}
            <div className="col-span-full">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Nama Jalan
              </label>
              <textarea
                name="nama_jalan"
                rows="6"
                value={formData.nama_jalan}
                onChange={handleChange}
                readOnly={!isEditing}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 rounded-b">
          <button
            type="submit"
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isEditing ? "Simpan" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlamatKantor;
