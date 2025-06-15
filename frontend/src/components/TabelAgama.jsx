import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ButtonTambah from "./ButtonTambah";

const TabelAgama = () => {
  const [agama, setAgama] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-agama");
    setAgama(res.data);
    setFilteredData(res.data);
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data agama akan dihapus secara permanen!",
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
          text: "Data agama berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus data agama",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/statistik/agama/edit/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = agama.filter((item) =>
      item.tahun?.toString().includes(search)
    );
    setFilteredData(filtered);
  }, [search, agama]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Rt",
      selector: (row) => row.sls?.rw || "-",
      sortable: true,
    },
    {
      name: "Rw",
      selector: (row) => row.sls?.rt || "-",
      sortable: true,
    },
    {
      name: "Islam",
      selector: (row) => row.islam,
      sortable: true,
    },
    {
      name: "Kristen",
      selector: (row) => row.kristen,
      sortable: true,
    },
    {
      name: "Hindu",
      selector: (row) => row.hindu,
      sortable: true,
    },
    {
      name: "Budha",
      selector: (row) => row.budha,
      sortable: true,
    },
    {
      name: "Konghucu",
      selector: (row) => row.konghucu,
      sortable: true,
    },
    {
      name: "Kepercayaan Lain",
      selector: (row) => row.kepercayaan_lain,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) =>
        (row.islam || 0) +
        (row.hindu || 0) +
        (row.budha || 0) +
        (row.kristen || 0) +
        (row.konghucu || 0) +
        (row.kepercayaan_lain || 0),
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
            onClick={() => handleHapus(row.id_data_agama)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleEdit(row.id_data_agama)}
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
        <ButtonTambah to="/tambah-pengguna" />
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

export default TabelAgama;
