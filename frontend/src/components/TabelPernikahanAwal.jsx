import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TabelPernikahan = () => {
  const [pernikahan, setPernikahan] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-perkawinan");
    setPernikahan(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data pernikahan akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-perkawinan/${id}`);
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
    navigate(`/statistik/pernikahan/edit/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-center">No</th>
            <th className="py-3 px-6 text-center">Rw</th>
            <th className="py-3 px-6 text-center">Rt</th>
            <th className="py-3 px-6 text-center">Belum Kawin</th>
            <th className="py-3 px-6 text-center">Kawin</th>
            <th className="py-3 px-6 text-center">Cerai Hidup</th>
            <th className="py-3 px-6 text-center">Cerai Mati</th>
            <th className="py-3 px-6 text-center">Total</th>
            <th className="py-3 px-6 text-center">Tahun</th>
            <th className="py-3 px-6 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pernikahan.map((item, index) => (
          <tr  key={item.id_data_perkawinan}  className="bg-white border-b hover:bg-gray-100">
            <td className="py-3 px-6 text-center">{index + 1}</td>
            <td className="py-3 px-6 text-center">{item.sls?.rw || "-"}</td>
            <td className="py-3 px-6 text-center">{item.sls?.rt || "-"}</td>
            <td className="py-3 px-6 text-center">{item.belum_kawin}</td>
            <td className="py-3 px-6 text-center">{item.kawin}</td>
            <td className="py-3 px-6 text-center">{item.cerai_hidup}</td>
            <td className="py-3 px-6 text-center">{item.cerai_mati}</td>
            <td className="py-3 px-6 text-center"> {item.belum_kawin + item.kawin + item.cerai_hidup + item.cerai_mati}</td>
            <td className="py-3 px-6 text-center">{item.tahun}</td>
            <td className="py-3 px-6 text-center">
              <div className="flex space-x-1">
                <button  onClick={() => handleHapus(item.id_data_perkawinan)} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover">
                  Hapus
                </button>
                <button onClick={() => handleEdit(item.id_data_perkawinan)} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover">
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

export default TabelPernikahan;
