import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ButtonTambah from "./ButtonTambah";

const TabelSaranaKesehatan = () => {
  const [saranaKesehatan, setSaranaKesehatan] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-sarana-kesehatan");
    setSaranaKesehatan(res.data);
    setFilteredData(res.data);
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data sarana kesehatan akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-sarana-kesehatan/${id}`);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data sarana kesehatan berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus data sarana kesehatan",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/statistik/sarana-kesehatan/edit/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = saranaKesehatan.filter((item) =>
      item.tahun?.toString().includes(search)
    );
    setFilteredData(filtered);
  }, [search, saranaKesehatan]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Puskesmas",
      selector: (row) => row.puskesmas,
      sortable: true,
    },
    {
      name: "Pustu",
      selector: (row) => row.pustu,
      sortable: true,
    },
    {
      name: "Posyandu",
      selector: (row) => row.posyandu,
      sortable: true,
    },
    {
      name: "Apotek",
      selector: (row) => row.apotek,
      sortable: true,
    },
    {
      name: "Praktek Dokter",
      selector: (row) => row.praktek_dokter,
      sortable: true,
    },
    {
      name: "Rumah Sakit",
      selector: (row) => row.rumah_sakit,
      sortable: true,
    },
    {
      name: "Polindes",
      selector: (row) => row.polindes,
      sortable: true,
    },
    {
      name: "Poskesdes",
      selector: (row) => row.poskesdes,
      sortable: true,
    },
    {
      name: "Rumah Bersalin",
      selector: (row) => row.rumah_bersalin,
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
        (row.puskesmas || 0) +
        (row.pustu || 0) +
        (row.posyandu || 0) +
        (row.apotek || 0) +
        (row.praktek_dokter || 0) +
        (row.rumah_sakit || 0) +
        (row.polindes || 0) +
        (row.poskesdes || 0) +
        (row.rumah_bersalin || 0) +
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
            onClick={() => handleHapus(row.id_sarana_kesehatan)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleEdit(row.id_sarana_kesehatan)}
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
        <ButtonTambah to="/statistik/sarana-kesehatan/tambah" />
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

export default TabelSaranaKesehatan;
