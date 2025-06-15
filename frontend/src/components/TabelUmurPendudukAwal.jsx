import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TabelUmurPenduduk = () => {
  const [umur, setUmur] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-umur");
    setUmur(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data umur akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-umur/${id}`);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data penduduk berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus data",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/statistik/umur/edit/${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-center">No</th>
            <th className="py-3 px-6 text-center">Umur</th>
            <th className="py-3 px-6 text-center">Laki-Laki</th>
            <th className="py-3 px-6 text-center">Perempuan</th>
            <th className="py-3 px-6 text-center">Total</th>
            <th className="py-3 px-6 text-center">Tahun</th>
            <th className="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {umur.map((item, index) => (
          <tr  key={item.id_data_umur} className="bg-white border-b hover:bg-gray-100">
            <td className="py-3 px-6 text-center">{index + 1}</td>
            <td className="py-3 px-6 text-center">{item.umur}</td>
            <td className="py-3 px-6 text-center">{item.laki_laki}</td>
            <td className="py-3 px-6 text-center">{item.perempuan}</td>
            <td className="py-3 px-6 text-center">{item.laki_laki+item.perempuan}</td>
            <td className="py-3 px-6 text-center">{item.tahun}</td>
            <td className="py-3 px-6 text-center">
              <div className="flex justify-center space-x-1">
                <button onClick={() => handleHapus(item.id_data_umur)} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover">
                  Hapus
                </button>
                <button onClick={() => handleEdit(item.id_data_umur)} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover">
                  Edit
                </button>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelUmurPenduduk;
