import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ButtonTambah from "./ButtonTambah";

const TabelPekerjaan = () => {
  const [pekerjaan, setPekerjaan] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-pekerjaan");
    setPekerjaan(res.data);
    setFilteredData(res.data);
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data pekerjaan akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-pekerjaan/${id}`);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data pekerjaan berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus data pekerjaan",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/statistik/pekerjaan/edit/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = pekerjaan.filter((item) =>
      item.tahun?.toString().includes(search)
    );
    setFilteredData(filtered);
  }, [search, pekerjaan]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Pelajar",
      selector: (row) => row.pelajar,
      sortable: true,
    },
    {
      name: "Mengurus Rumah Tangga",
      selector: (row) => row.mengurus_rumah_tangga,
      sortable: true,
    },
    {
      name: "Tidak Bekerja",
      selector: (row) => row.tidak_bekerja,
      sortable: true,
    },
    {
      name: "Karyawan Swasta",
      selector: (row) => row.karyawan_swasta,
      sortable: true,
    },
    {
      name: "Petani",
      selector: (row) => row.petani,
      sortable: true,
    },
    {
      name: "Wiraswasta",
      selector: (row) => row.wiraswasta,
      sortable: true,
    },
    {
      name: "Perangkat Desa",
      selector: (row) => row.perangkat_desa,
      sortable: true,
    },
    {
      name: "PNS",
      selector: (row) => row.pns,
      sortable: true,
    },
    {
      name: "Lainnya",
      selector: (row) => row.lainnya,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) =>
        (row.pelajar || 0) +
        (row.mengurus_rumah_tangga || 0) +
        (row.tidak_bekerja || 0) +
        (row.karyawan_swasta || 0) +
        (row.petani || 0) +
        (row.wiraswasta || 0) +
        (row.perangkat_desa || 0) +
        (row.pns || 0) +
        (row.lainnya || 0),
      sortable: true,
    },
    {
      name: "Tahun",
      selector: (row) => row.tahun,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="space-x-2">
          <button
            onClick={() => handleHapus(row.id_pekerjaan)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleEdit(row.id_pekerjaan)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            <FaEdit />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Cari Tahun..."
          className="mb-4 px-4 py-2 border rounded-md shadow w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ButtonTambah to="/statistik/pekerjaan/tambah" />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        defaultSortFieldId={1}
        noDataComponent="Tidak ada data pengguna"
      />
    </div>
  );
};

export default TabelPekerjaan;
