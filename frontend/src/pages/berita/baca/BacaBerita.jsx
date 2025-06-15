import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BacaBerita = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await axios.get(`/api/berita/${id}`);
        setBerita(res.data);
      } catch (err) {
        console.error("Gagal mengambil berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/berita/${id}`);
        await Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Berita berhasil dihapus.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/berita");
      } catch (error) {
        console.error("Gagal menghapus berita:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menghapus berita.",
        });
      }
    }
  };

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <Skeleton height={40} width={200} className="mb-4" />
        <div className="flex justify-between items-center mb-6">
          <Skeleton height={40} width={100} />
          <Skeleton height={40} width={100} />
        </div>
        <Skeleton height={32} width={`60%`} className="mb-2" />
        <Skeleton height={20} width={`30%`} className="mb-4" />
        <Skeleton height={384} className="mb-6" />
        <Skeleton count={6} />
      </div>
    );
  }

  if (!berita)
    return <p className="text-center mt-10">Berita tidak ditemukan</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
          onClick={() => navigate("/berita")}
        >
          &larr; Kembali
        </button>
        <div className="flex gap-3 mb-6">
          <button
            className="rounded bg-blue-400 text-white px-4 py-2 hover:bg-yellow-500 transition"
            onClick={() => navigate(`/edit-berita/${id}`)}
          >
            Edit
          </button>
          <button
            className="rounded bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Hapus
          </button>
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2">{berita.judul_berita}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Oleh <span className="font-medium">{berita.penulis_berita}</span>{" "}
        &middot; {formatTanggal(berita.created_at)}
      </p>
      <img
        src={berita.gambar_berita}
        alt={berita.judul_berita}
        className="w-full h-96 object-cover rounded mb-6"
      />
      <p className="whitespace-pre-line text-lg leading-relaxed">
        {berita.isi_berita}
      </p>
    </div>
  );
};

export default BacaBerita;
