import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import ButtonTambah from "./ButtonTambah";

const TabelDomisili = () => {
  const [domisili, setDomisili] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/data-domisili");
      setDomisili(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.error("Gagal fetch data domisili:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data domisili akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-domisili/${id}`);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data domisili berhasil dihapus",
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
    navigate(`/statistik/edit-domisili/${id}`);
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      width: "70px",
      sortable: true,
    },
    {
      name: "RW",
      selector: (row) => row.rw,
      sortable: true,
      center: true,
    },
    {
      name: "RT",
      selector: (row) => row.rt,
      sortable: true,
      center: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex space-x-1">
          <button
            onClick={() => handleEdit(row.id_domisili)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleHapus(row.id_domisili)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            <FaTrash />
          </button>
        </div>
      ),
      center: true,
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = domisili.filter(
      (item) =>
        item.rw.toString().includes(value) || item.rt.toString().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Cari RW atau RT..."
          value={searchText}
          onChange={handleSearch}
          className="mb-4 px-4 py-2 border rounded-md shadow w-full md:w-1/3"
        />
        <ButtonTambah to="/statistik/tambah-domisili" />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        noHeader
      />
    </div>
  );
};

export default TabelDomisili;
