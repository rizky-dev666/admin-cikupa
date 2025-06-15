import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import ButtonTambah from "./ButtonTambah";

const TabelSaranaPendidikan = () => {
  const [saranaPendidikan, setSaranaPendidikan] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("/api/data-sarana-pendidikan");
    setSaranaPendidikan(res.data);
    setFilteredData(res.data);
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data sarana pendidikan akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/data-sarana-pendidikan/${id}`);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data sarana pendidikan berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus data sarana pendidikan",
        });
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/statistik/sarana-pendidikan/edit/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = saranaPendidikan.filter((item) =>
      item.tahun?.toString().includes(search)
    );
    setFilteredData(filtered);
  }, [search, saranaPendidikan]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "60px",
    },
    {
      name: "Paud",
      selector: (row) => row.paud,
      sortable: true,
    },
    {
      name: "Kelompok Bermain",
      selector: (row) => row.kb,
      sortable: true,
    },
    {
      name: "Taman Kanak-kanak",
      selector: (row) => row.tk,
      sortable: true,
    },
    {
      name: "Raudhatul Athfal",
      selector: (row) => row.ra,
      sortable: true,
    },
    {
      name: "Sd Negeri",
      selector: (row) => row.sd_negeri,
      sortable: true,
    },
    {
      name: "Sd Swasta",
      selector: (row) => row.sd_swasta,
      sortable: true,
    },
    {
      name: "Mi",
      selector: (row) => row.mi,
      sortable: true,
    },
    {
      name: "SdIT",
      selector: (row) => row.sdit,
      sortable: true,
    },
    {
      name: "Sd Kristen Katolik",
      selector: (row) => row.sd_kristen_katolik,
      sortable: true,
    },
    {
      name: "Smp Negeri",
      selector: (row) => row.smp_negeri,
      sortable: true,
    },
    {
      name: "Smp Swasta",
      selector: (row) => row.smp_swasta,
      sortable: true,
    },
    {
      name: "MTS",
      selector: (row) => row.mts,
      sortable: true,
    },
    {
      name: "SMp IT",
      selector: (row) => row.smpit,
      sortable: true,
    },
    {
      name: "SMP Kristen Katolik",
      selector: (row) => row.smp_kristen_katolik,
      sortable: true,
    },
    {
      name: "SMA Negeri",
      selector: (row) => row.sma_negeri,
      sortable: true,
    },
    {
      name: "SMA Swasta",
      selector: (row) => row.sma_swasta,
      sortable: true,
    },
    {
      name: "SMK Negeri",
      selector: (row) => row.smk_negeri,
      sortable: true,
    },
    {
      name: "SMK Swasta",
      selector: (row) => row.smk_swasta,
      sortable: true,
    },
    {
      name: "MA",
      selector: (row) => row.ma,
      sortable: true,
    },
    {
      name: "MAk",
      selector: (row) => row.mak,
      sortable: true,
    },
    {
      name: "SMA IT",
      selector: (row) => row.sma_it,
      sortable: true,
    },
    {
      name: "SMA Kristen Katolik",
      selector: (row) => row.sma_kristen_katolik,
      sortable: true,
    },
    {
      name: "Universitas",
      selector: (row) => row.universitas,
      sortable: true,
    },
    {
      name: "Institut",
      selector: (row) => row.institut,
      sortable: true,
    },
    {
      name: "Seolah Tinggi",
      selector: (row) => row.sekolah_tinggi,
      sortable: true,
    },
    {
      name: "Politeknik",
      selector: (row) => row.politeknik,
      sortable: true,
    },
    {
      name: "Akademi",
      selector: (row) => row.akademi,
      sortable: true,
    },
    {
      name: "Pesantren",
      selector: (row) => row.pesantren,
      sortable: true,
    },
    {
      name: "Taman Pendidikan Al-Qur'an",
      selector: (row) => row.tpa_tpq,
      sortable: true,
    },
    {
      name: "Madrasah Diniyah",
      selector: (row) => row.madrasah_diniyah,
      sortable: true,
    },
    {
      name: "Sekolah Minggu",
      selector: (row) => row.sekolah_minggu,
      sortable: true,
    },
    {
      name: "Sekolah Sabat",
      selector: (row) => row.sekolah_sabat,
      sortable: true,
    },
    {
      name: "Pusat Kegiatan Belajar Masyarakat",
      selector: (row) => row.pkbm,
      sortable: true,
    },
    {
      name: "Lembaga Kursus dan Pelatihan",
      selector: (row) => row.lkp,
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
        (row.paud || 0) +
        (row.kb || 0) +
        (row.tk || 0) +
        (row.ra || 0) +
        (row.sd_negeri || 0) +
        (row.sd_swasta || 0) +
        (row.mi || 0) +
        (row.sdit || 0) +
        (row.smp_negeri || 0) +
        (row.smp_swasta || 0) +
        (row.smp_kristen_katolik || 0) +
        (row.smpit || 0) +
        (row.mts || 0) +
        (row.sma_negeri || 0) +
        (row.sma_swasta || 0) +
        (row.smk_negeri || 0) +
        (row.smk_swasta || 0) +
        (row.ma || 0) +
        (row.mak || 0) +
        (row.sma_it || 0) +
        (row.sma_kristen_katolik || 0) +
        (row.universitas || 0) +
        (row.institut || 0) +
        (row.politeknik || 0) +
        (row.sekolah_tinggi || 0) +
        (row.akademi || 0) +
        (row.pesantren || 0) +
        (row.tpa_tpq || 0) +
        (row.madrasah_diniyah || 0) +
        (row.sekolah_minggu || 0) +
        (row.sekolah_sabat || 0) +
        (row.pkbm || 0) +
        (row.lkp || 0),
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
            onClick={() => handleHapus(row.id_sarana_pendidikan)}
            className="bg-red-500 text-white p-2 rounded"
          >
            <FaTrash />
          </button>
          <button
            onClick={() => handleEdit(row.id_sarana_pendidikan)}
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
        <ButtonTambah to="/statistik/sarana-pendidikan/tambah" />
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

export default TabelSaranaPendidikan;
