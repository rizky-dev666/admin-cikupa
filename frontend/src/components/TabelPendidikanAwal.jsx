import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TabelPendidikan = () => {
  const [pendidikan, setPendidikan] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-pendidikan");
    setPendidikan(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data pendidikan akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-pendidikan/${id}`);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data pendidikan berhasil dihapus",
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
    navigate(`/statistik/pendidikan/edit/${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white text-sm shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-center whitespace-nowrap">No</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">Rw</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">Rt</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">
              Belum Sekolah
            </th>
            <th className="py-3 px-6 text-center whitespace-nowrap">
              Masih sekolah
            </th>
            <th className="py-3 px-6 text-center whitespace-nowrap">
              Tidak Sekolah Lagi
            </th>
            <th className="py-3 px-6 text-center whitespace-nowrap">SD</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">MI</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">Paket A</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">SDLB</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">SMP</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">MTS</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">SMP LB</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">Paket B</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">SMA</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">SMK</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">MA</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">Paket C</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">Diploma</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">S1</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">Profesi</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">S2</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">S3</th>
            <th className="py-3 px-6 text-center whitespace-nowrap">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pendidikan.map((item, index) => (
          <tr  key={item.id_data_pendidikan} className="bg-white border-b hover:bg-gray-100">
            <td className="py-3 px-6 text-center whitespace-nowrap">{index + 1}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.sls?.rw || "-"}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.sls?.rt || "-"}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.belum_sekolah}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.masih_sekolah}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.tidak_bersekolah_lagi}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.sd}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.mi}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.paket_a}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.sdlb}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.smp}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.mts}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.smp_lb}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.paket_b}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.sma}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.smk}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.ma}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.paket_c}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.diploma}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.s1}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.profesi}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.s2}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">{item.s3}</td>
            <td className="py-3 px-6 text-center whitespace-nowrap">
              <div className="flex space-x-1">
                <button onClick={() => handleHapus(item.id_data_pendidikan)} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover">
                  Hapus
                </button>
                <button onClick={() => handleEdit(item.id_data_pendidikan)} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover">
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

export default TabelPendidikan;
