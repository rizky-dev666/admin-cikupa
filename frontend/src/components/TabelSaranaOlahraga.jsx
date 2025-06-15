import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ButtonTambah from "./ButtonTambah";

const TabelSaranaOlahraga = () => {
  const [saranaOlahraga, setSaranaOlahraga] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-sarana-olahraga");
    setSaranaOlahraga(res.data);
    setFilteredData(res.data);
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data sarana olahraga akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-sarana-olahraga/${id}`);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data sarana olahraga berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus data sarana olaharaga",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/statistik/sarana-olahraga/edit/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = saranaOlahraga.filter((item) =>
      item.tahun?.toString().includes(search)
    );
    setFilteredData(filtered);
  }, [search, saranaOlahraga]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Lapang Sepak Bola",
      selector: (row) => row.lapang_sepak_bola,
      sortable: true,
    },
    {
      name: "Lapang Bola Voli",
      selector: (row) => row.lapang_bola_voli,
      sortable: true,
    },
    {
      name: "Lapang Basket",
      selector: (row) => row.lapang_basket,
      sortable: true,
    },
    {
      name: "Lapang Bulu Tangkis",
      selector: (row) => row.lapang_bulu_tangkis,
      sortable: true,
    },
    {
      name: "Lapang Serbaguna",
      selector: (row) => row.lapang_serbaguna,
      sortable: true,
    },
    {
      name: "Meja Tenis Meja",
      selector: (row) => row.meja_tenis_meja,
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
        (row.lapang_basket || 0) +
        (row.lapang_bola_voli || 0) +
        (row.lapang_bulu_tangkis || 0) +
        (row.lapang_serbaguna || 0) +
        (row.meja_tenis_meja || 0) +
        (row.lapang_sepak_bola || 0) +
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
            onClick={() => handleHapus(row.id_sarana_olahraga)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleEdit(row.id_sarana_olahraga)}
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
        <ButtonTambah to="/statistik/sarana-olahraga/tambah" />
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

export default TabelSaranaOlahraga;
