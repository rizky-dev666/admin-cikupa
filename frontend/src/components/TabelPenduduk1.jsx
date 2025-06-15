import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TabelPenduduk = () => {
  const [penduduk, setPenduduk] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-penduduk");
    setPenduduk(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data penduduk akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-penduduk/${id}`);
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
    navigate(`/statistik/edit-penduduk/${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">No</th>
            <th className="py-3 px-6 text-left">Rw</th>
            <th className="py-3 px-6 text-left">Rt</th>
            <th className="py-3 px-6 text-left">Perempuan</th>
            <th className="py-3 px-6 text-left">Laki-Laki</th>
            <th className="py-3 px-6 text-left">Keluarga</th>
            <th className="py-3 px-6 text-left">Tahun</th>
            <th className="py-3 px-6 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {penduduk.map((item, index) => (
            <tr
              key={item.id_data_penduduk}
              className="bg-white border-b hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-center">{index + 1}</td>
              <td className="py-3 px-6">{item.sls?.rw || "-"}</td>
              <td className="py-3 px-6">{item.sls?.rt || "-"}</td>
              <td className="py-3 px-6">{item.perempuan}</td>
              <td className="py-3 px-6">{item.laki_laki}</td>
              <td className="py-3 px-6">{item.keluarga}</td>
              <td className="py-3 px-6">{item.tahun}</td>
              <td className="py-3 px-6 justify-items-end">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleHapus(item.id_data_penduduk)}
                    className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => handleEdit(item.id_data_penduduk)}
                    className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover"
                  >
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

export default TabelPenduduk;
