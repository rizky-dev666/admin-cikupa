import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TabelAgama = () => {
  const [agama, setAgama] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-agama");
    setAgama(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data Agama akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-agama/${id}`);
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
    navigate(`/statistik/agama/edit/${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-center">No</th>
            <th className="py-3 px-6 text-center">Rw</th>
            <th className="py-3 px-6 text-center">Rt</th>
            <th className="py-3 px-6 text-center">Islam</th>
            <th className="py-3 px-6 text-center">Kristen</th>
            <th className="py-3 px-6 text-center">Hindu</th>
            <th className="py-3 px-6 text-center">Budha</th>
            <th className="py-3 px-6 text-center">Konghucu</th>
            <th className="py-3 px-6 text-center">Kepercayaan Lain</th>
            <th className="py-3 px-6 text-center">Total</th>
            <th className="py-3 px-6 text-center">Tahun</th>
            <th className="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
           {agama.map((item, index) => (
          <tr  key={item.id_data_agama} className="bg-white border-b hover:bg-gray-100">
            <td className="py-3 px-6 text-center">{index + 1}</td>
            <td className="py-3 px-6 text-center">{item.sls?.rw || "-"}</td>
            <td className="py-3 px-6 text-center">{item.sls?.rt || "-"}</td>
            <td className="py-3 px-6 text-center">{item.islam}</td>
            <td className="py-3 px-6 text-center">{item.kristen}</td>
            <td className="py-3 px-6 text-center">{item.hindu}</td>
            <td className="py-3 px-6 text-center">{item.budha}</td>
            <td className="py-3 px-6 text-center">{item.konghucu}</td>
            <td className="py-3 px-6 text-center">{item.kepercayaan_lain}</td>
            <td className="py-3 px-6 text-center">{item.islam+item.kristen+item.hindu+item.budha+item.konghucu+item.kepercayaan_lain}</td>
            <td className="py-3 px-6 text-center">{item.tahun}</td>
            <td className="py-3 px-6 text-center">
              <div className="flex space-x-1">
                <button onClick={() => handleHapus(item.id_data_agama)} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover">
                  Hapus
                </button>
                <button onClick={() => handleEdit(item.id_data_agama)} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover">
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

export default TabelAgama;
