import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonTambah from "../../../components/ButtonTambah";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const cardData = [
  {
    nama: "Gilang Ramdhani",
    jabatan: "Kepala Desa",
    foto: "https://ativysenubpjviwimbrd.supabase.co/storage/v1/object/public/desacikupa/banner/banner_1749401949333.jpeg",
  },
];

const CardSlider = () => {
  const navigate = useNavigate();
  const [gambars, setGambars] = useState([]);
  const [profils, setProfils] = useState([]);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Pilih gambar terlebih dahulu");

    const formData = new FormData();
    formData.append("gambar_bagan", selectedFile);

    try {
      const resUpload = await axios.post(
        "/api/upload/bagan",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { url } = resUpload.data;
      if (!url) throw new Error("Gagal upload ke storage");

      const resSimpan = await axios.post(
        "/api/struktur-organisasi/bagan",
        {
          url: url,
        }
      );
      await fetchBagans();

      alert("Berhasil upload dan simpan bagan!");
      setPreview(null);
      setSelectedFile(null);
    } catch (err) {
      console.error("Upload gagal:", err);
      alert("Upload gagal: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchBagans();
    fetchProfils();
  }, []);

  const fetchProfils = async () => {
    try {
      const res = await axios.get("/api/struktur-organisasi");
      setProfils(res.data);
    } catch (err) {
      console.error("Gagal mengambil data profil:", err);
      Swal.fire("Gagal", "Gagal mengambil data profil", "error");
    }
  };
  const fetchBagans = async () => {
    try {
      const res = await axios.get(
        "/api/struktur-organisasi/bagan"
      );
      setGambars(res.data);
    } catch (err) {
      console.error("Gagal mengambil data banner:", err);
      Swal.fire("Gagal", "Gagal mengambil data banner", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data bagan yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(
          `/api/struktur-organisasi/bagan/${id}`
        );
        await fetchBagans();
        Swal.fire("Berhasil", "bagan berhasil dihapus", "success");
      } catch (err) {
        console.error("Gagal hapus banner:", err);
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus bagan", "error");
      }
    }
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data pengguna akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/struktur-organisasi/${id}`);
        fetchProfils();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pengguna berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus pengguna",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-staff/${id}`);
  };
  return (
    <div>
      <div className="">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl mb-6 text-center">
            Struktur Organisasi
          </h1>
          <div className="space-x-1">
            <button
              onClick={handleButtonClick}
              className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Tambah
            </button>
            <input
              type="file"
              name="gambar_bagan"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {preview && (
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Preview Gambar</h2>
          <img
            src={preview}
            alt="Preview"
            className="max-w-lg rounded-lg shadow"
          />
          <div className="mt-3">
            <button
              onClick={handleUpload}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Upload
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {gambars.map((gambar, index) => (
          <div
            className="relative h-full shadow-lg rounded-xl mb-6"
            key={index}
          >
            <img
              src={gambar.gambar_bagan}
              alt={`banner-${index}`}
              className="h-full w-full object-cover rounded-xl"
            />

            <button
              onClick={() => handleDelete(gambar.id_bagan)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-7">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl mb-6 text-center">
            Profil Staff
          </h1>
          <div className="flex space-x-1">
            <ButtonTambah to="/tambah-staff" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {profils.map((profil, index) => (
          <div
            key={index}
            className="relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md"
            style={{ minHeight: "160px" }}
          >
            <div>
              <div className="relative block h-full">
                <div className="h-44 rounded-lg overflow-hidden">
                  <img
                    src={profil.foto_staff}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <h2 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-1">
              {profil.nama_staff}
            </h2>

            <p className="mt-2 text-gray-800 text-sm">{profil.jabatan}</p>

            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(profil.id_struktur_organisasi)}
                className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md w-full"
              >
                Edit
              </button>
              <button
                onClick={() => handleHapus(profil.id_struktur_organisasi)}
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md w-full"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
