import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ButtonTambah from "./ButtonTambah";

const TabelSaranaKeagamaan = () => {
  const [saranaKeagamaan, setSaranaKeagamaan] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-sarana-keagamaan");
    setSaranaKeagamaan(res.data);
    setFilteredData(res.data);
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data sarana keagamaan akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-sarana-keagamaan/${id}`);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data sarana keagamaan berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus data sarana keagamaan",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/statistik/sarana-keagamaan/edit/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = saranaKeagamaan.filter((item) =>
      item.tahun?.toString().includes(search)
    );
    setFilteredData(filtered);
  }, [search, saranaKeagamaan]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Masjid",
      selector: (row) => row.masjid,
      sortable: true,
    },
    {
      name: "Mushola",
      selector: (row) => row.mushola,
      sortable: true,
    },
    {
      name: "Gereja",
      selector: (row) => row.gereja,
      sortable: true,
    },
    {
      name: "Pura",
      selector: (row) => row.pura,
      sortable: true,
    },
    {
      name: "Vihara",
      selector: (row) => row.vihara,
      sortable: true,
    },
    {
      name: "Klenteng",
      selector: (row) => row.klenteng,
      sortable: true,
    },
    {
      name: "Pondok Pesantren",
      selector: (row) => row.pondok_pesantren,
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
        (row.masjid || 0) +
        (row.mushola || 0) +
        (row.gereja || 0) +
        (row.pura || 0) +
        (row.vihara || 0) +
        (row.klenteng || 0) +
        (row.pondok_pesantren || 0) +
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
            onClick={() => handleHapus(row.id_sarana_keagamaan)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleEdit(row.id_sarana_keagamaan)}
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
        <ButtonTambah to="/statistik/sarana-keagamaan/tambah" />
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

export default TabelSaranaKeagamaan;
