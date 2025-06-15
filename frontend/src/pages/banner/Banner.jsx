import React, { useEffect, useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("/api/banner");
      setBanners(res.data);
    } catch (err) {
      console.error("Gagal mengambil data banner:", err);
      Swal.fire("Gagal", "Gagal mengambil data banner", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data banner yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/api/banner/${id}`);
        await fetchBanners();
        Swal.fire("Berhasil", "Banner berhasil dihapus", "success");
      } catch (err) {
        console.error("Gagal hapus banner:", err);
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus banner", "error");
      }
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <button
        onClick={() => navigate("/tambah-banner")}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-7"
      >
        <FaPlus className="mr-2" /> Tambah Gambar
      </button>

      <div className="grid grid-cols-1 gap-6">
        {banners.map((banner, index) => (
          <div className="relative" key={index}>
            <img
              src={banner.gambar_banner}
              alt={`banner-${index}`}
              className="w-full h-80 object-cover rounded-lg"
            />
            <h2 className="absolute top-1/2 left-10 transform -translate-y-1/2 max-w-3xl text-5xl font-semibold text-black drop-shadow-md">
              {banner.isi_banner}
            </h2>
            <button
              onClick={() => handleDelete(banner.id_banner)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
