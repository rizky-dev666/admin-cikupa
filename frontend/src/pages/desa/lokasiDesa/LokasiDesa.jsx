import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LokasiDesa = () => {
  const [formData, setFormData] = useState({
    link_gmaps: "",
    luas_desa: "",
    batas_utara: "",
    batas_timur: "",
    batas_barat: "",
    batas_selatan: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const lokasiId = "f91cd017-c338-48aa-b68e-f8ac96367762";

  useEffect(() => {
    const fetchLokasi = async () => {
      try {
        const response = await axios.get(
          `/api/lokasi-desa/${lokasiId}`
        );
        const data = response.data;
        setFormData({
          link_gmaps: data.link_gmaps,
          luas_desa: data.luas_desa,
          batas_barat: data.batas_barat,
          batas_timur: data.batas_timur,
          batas_utara: data.batas_utara,
          batas_selatan: data.batas_selatan,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchLokasi();
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
        `/api/lokasi-desa/${lokasiId}`,
        formData
      );
      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Lokasi desa berhasil diperbarui.",
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
      <div className="flex items-start justify-between rounded-t">
        <h3 className="text-xl font-semibold">Lokasi Desa</h3>
      </div>

      {formData.link_gmaps?.includes("google.com/maps/embed") ? (
        <div
          className="relative rounded-2xl h-0 overflow-hidden m-6"
          style={{ paddingBottom: "30.25%" }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={formData.link_gmaps}
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
            title="Google Map"
          ></iframe>
        </div>
      ) : (
        <Skeleton height={300} borderRadius={16} className="mb-6" />
      )}

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-6 gap-6">
            {[
              "luas_desa",
              "batas_utara",
              "batas_barat",
              "batas_timur",
              "batas_selatan",
              "link_gmaps",
            ].map((field) => (
              <div key={field} className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type={field === "luas_desa" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                />
              </div>
            ))}
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

export default LokasiDesa;
