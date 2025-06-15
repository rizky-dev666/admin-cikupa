import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import ButtonTambah from "./ButtonTambah";

const TabelPenduduk = () => {
  const [penduduk, setPenduduk] = useState([]);
  const [filteredPenduduk, setFilteredPenduduk] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/data-penduduk");
      setPenduduk(res.data);
      setFilteredPenduduk(res.data);
    } catch (error) {
      console.error("Gagal mengambil data penduduk", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const result = penduduk.filter((item) => {
      return (
        item.sls?.rw?.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.sls?.rt?.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.tahun?.toString().includes(search)
      );
    });
    setFilteredPenduduk(result);
  }, [search, penduduk]);

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

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "70px",
    },
    {
      name: "RW",
      selector: (row) => row.sls?.rw || "-",
      sortable: true,
    },
    {
      name: "RT",
      selector: (row) => row.sls?.rt || "-",
      sortable: true,
    },
    {
      name: "Perempuan",
      selector: (row) => row.perempuan,
      sortable: true,
    },
    {
      name: "Laki-Laki",
      selector: (row) => row.laki_laki,
      sortable: true,
    },
    {
      name: "Total Penduduk",
      selector: (row) => (row.perempuan || 0) + (row.laki_laki || 0),
      sortable: true,
    },
    {
      name: "Keluarga",
      selector: (row) => row.keluarga,
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
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(row.id_data_penduduk)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleHapus(row.id_data_penduduk)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Cari RW, RT, atau Tahun..."
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ButtonTambah to="/statistik/tambah-penduduk" />
      </div>
      <DataTable
        columns={columns}
        data={filteredPenduduk}
        pagination
        highlightOnHover
        // pointerOnHover
        striped
        responsive
        defaultSortFieldId={1}
        noDataComponent="Tidak ada data ditemukan"
      />
    </div>
  );
};

export default TabelPenduduk;
