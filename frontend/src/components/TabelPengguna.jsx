import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ButtonTambah from "./ButtonTambah";

const TabelPengguna = ({ filter }) => {
  const [pengguna, setPengguna] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/pengguna");
    setPengguna(res.data);
    setFilteredData(res.data);
  };

  const handleChangePeran = async (id, level_pengguna) => {
    await axios.put(`/api/pengguna/${id}`, { level_pengguna });
    fetchData();
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data pengguna akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/pengguna/${id}`);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pengguna berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus pengguna",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-pengguna/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    const filtered = pengguna.filter((item) => {
      const nama = item.nama_pengguna?.toLowerCase() || "";
      const email = item.email_pengguna?.toLowerCase() || "";
      const level =
        item.level_pengguna == 2
          ? "admin"
          : item.level_pengguna == 3
          ? "operator"
          : "";

      return (
        nama.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase()) ||
        level.includes(search.toLowerCase())
      );
    });

    setFilteredData(filtered);
  }, [search, pengguna]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Nama",
      selector: (row) => row.nama_pengguna,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <img
            src={
              row.foto_pengguna ||
              "https://ativysenubpjviwimbrd.supabase.co/storage/v1/object/public/desacikupa/strukturorganisasi/pp%20kosong%20wa%20default.jpg"
            }
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{row.nama_pengguna}</span>
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email_pengguna,
      sortable: true,
    },
    {
      name: "Peran",
      selector: (row) => row.level_pengguna,
      cell: (row) => (
        <select
          className="border rounded p-1 bg-gray-50"
          value={row.level_pengguna}
          onChange={(e) =>
            handleChangePeran(row.id_pengguna, parseInt(e.target.value))
          }
        >
          <option value="2">Admin</option>
          <option value="3">Oprator</option>
        </select>
      ),
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="space-x-2">
          <button
            onClick={() => handleHapus(row.id_pengguna)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleEdit(row.id_pengguna)}
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
          placeholder="Cari nama, email atau peran..."
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

export default TabelPengguna;
