import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ButtonTambah from "../../../components/ButtonTambah";

const Produk = () => {
  const [produks, setProduks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduks();
  }, []);

  const fetchProduks = async () => {
    try {
      const res = await axios.get("/api/produk");
      setProduks(res.data);
    } catch (err) {
      console.error("Gagal mengambil data produk:", err);
      Swal.fire("Gagal", "Gagal mengambil data produk", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data produk yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/api/produk/${id}`);
        await fetchProduks();
        Swal.fire("Berhasil", "Produk berhasil dihapus", "success");
      } catch (err) {
        console.error("Gagal hapus produk:", err);
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus banner", "error");
      }
    }
  };
  const handleEdit = (id) => {
    navigate(`/potensi-ekonomi/produk-unggulan/edit/${id}`);
  };
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">
          Produk Unggulan
        </h1>
        <ButtonTambah to="/potensi-ekonomi/produk-unggulan/tambah" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {produks.map((produk, index) => (
          <div
            key={index}
            className="relative p-2 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <a
              className="relative w-full h-60 overflow-hidden rounded-xl"
              href="#"
            >
              <img
                className="w-full h-full object-cover rounded-xl"
                src={produk.gambar_produk}
                alt="product"
              />
              <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                39% OFF
              </span>
            </a>
            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl tracking-tight text-slate-900">
                  {produk.nama_produk}
                </h5>
              </a>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    {produk.harga.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </p>
              </div>
              <div className="flex w-full mt-4 gap-2">
                <button className="flex-1 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 flex justify-center items-center">
                  <FaEye />
                </button>
                <button
                  onClick={() => handleEdit(produk.id_produk)}
                  className="flex-1 py-2 rounded-md bg-yellow-400 text-white hover:bg-yellow-500 flex justify-center items-center"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(produk.id_produk)}
                  className="flex-1 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex justify-center items-center"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produk;
