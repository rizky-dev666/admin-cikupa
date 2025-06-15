import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import ButtonTambah from "./ButtonTambah";

const TabelPendidikan = () => {
  const [pendidikan, setPendidikan] = useState([]);
  const [filteredPendidikan, setFilteredPendidikan] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get("/api/data-pendidikan");
      setPendidikan(res.data);
      setFilteredPendidikan(res.data);
    } catch (error) {
      console.error("Gagal mengambil data pendidikan", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const result = pendidikan.filter((item) => {
      return (
        // item.tahun.toString().toLowerCase().includes(search.toLowerCase()) ||
        // item.sls?.rt?.toString().toLowerCase().includes(search.toLowerCase()) ||
        item.tahun?.toString().includes(search)
      );
    });
    setFilteredPendidikan(result);
  }, [search, pendidikan]);

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
    navigate(`/statistik/edit-pendidikan/${id}`);
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
      name: "Belum Sekolah",
      selector: (row) => row.belum_sekolah,
      sortable: true,
    },
    {
      name: "Masih Sekolah",
      selector: (row) => row.masih_sekolah,
      sortable: true,
    },
    {
      name: "Tidak Sekolah Lagi",
      selector: (row) => row.tidak_bersekolah_lagi,
      sortable: true,
    },
    {
      name: "SD",
      selector: (row) => row.sd,
      sortable: true,
    },
    {
      name: "MI",
      selector: (row) => row.mi,
      sortable: true,
    },
    {
      name: "Paket A",
      selector: (row) => row.paket_a,
      sortable: true,
    },
    {
      name: "SDlb",
      selector: (row) => row.sdlb,
      sortable: true,
    },
    {
      name: "SMP",
      selector: (row) => row.smp,
      sortable: true,
    },
    {
      name: "MTS",
      selector: (row) => row.mts,
      sortable: true,
    },
    {
      name: "SMPlb",
      selector: (row) => row.smp_lb,
      sortable: true,
    },
    {
      name: "Paket B",
      selector: (row) => row.paket_b,
      sortable: true,
    },
    {
      name: "SMA",
      selector: (row) => row.sma,
      sortable: true,
    },
    {
      name: "SMK",
      selector: (row) => row.smk,
      sortable: true,
    },
    {
      name: "MA",
      selector: (row) => row.ma,
      sortable: true,
    },
    {
      name: "Paket C",
      selector: (row) => row.paket_c,
      sortable: true,
    },
    {
      name: "Diploma",
      selector: (row) => row.diploma,
      sortable: true,
    },
    {
      name: "S1",
      selector: (row) => row.s1,
      sortable: true,
    },
    {
      name: "Profesi",
      selector: (row) => row.profesi,
      sortable: true,
    },
    {
      name: "S2",
      selector: (row) => row.s2,
      sortable: true,
    },
    {
      name: "S3",
      selector: (row) => row.s3,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) =>
        (row.belum_sekolah || 0) +
        (row.tidak_bersekolah_lagi || 0) +
        (row.masih_sekolah || 0) +
        (row.sd || 0) +
        (row.mi || 0) +
        (row.paket_a || 0) +
        (row.sdlb || 0) +
        (row.smp || 0) +
        (row.mts || 0) +
        (row.smp_lb || 0) +
        (row.paket_b || 0) +
        (row.sma || 0) +
        (row.smk || 0) +
        (row.ma || 0) +
        (row.paket_c || 0) +
        (row.diploma || 0) +
        (row.s1 || 0) +
        (row.profesi || 0) +
        (row.s2 || 0) +
        (row.s3 || 0),
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
            onClick={() => handleEdit(row.id_data_pendidikan)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleHapus(row.id_data_pendidikan)}
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
          placeholder="Cari Tahun..."
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ButtonTambah to="/statistik/pendidikan/tambah" />
      </div>
      <DataTable
        columns={columns}
        data={filteredPendidikan}
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

export default TabelPendidikan;
