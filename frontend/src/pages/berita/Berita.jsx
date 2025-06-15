import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonTambah from "../../components/ButtonTambah";

const BeritaCard = ({ berita }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative pt-6 flex flex-col w-full rounded-xl bg-white text-gray-700 shadow-md h-full">
        <div className="relative mx-4 -mt-10 h-40 overflow-hidden rounded-xl">
          <img
            src={berita.gambar_berita}
            alt={berita.judul_berita}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-6 flex-grow">
          <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">
            {berita.judul_berita}
          </h5>
          <div className="text-base font-light text-gray-700 line-clamp-3">
            {berita.isi_berita.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
        <div className="p-6 pt-0">
          <button
            onClick={() => navigate(`/berita/${berita.id_berita}`)}
            type="button"
            className="rounded-lg bg-blue-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

const Berita = () => {
  const [beritaList, setBeritaList] = useState([]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await axios.get("/api/berita");
        setBeritaList(res.data);
      } catch (err) {
        console.error("Gagal mengambil berita:", err);
      }
    };

    fetchBerita();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-6 text-center">Berita</h1>
        <div className="flex space-x-1">
          <div className="mb-4 ml-3 text-center">
            <select className="border rounded p-2 bg-gray-50">
              <option value="">All</option>
            </select>
          </div>
          <ButtonTambah to="/tambah-berita" />
        </div>
      </div>
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {beritaList.length === 0 ? (
          <p className="text-center col-span-3">Tidak ada berita</p>
        ) : (
          beritaList.map((berita) => (
            <BeritaCard key={berita.id_berita} berita={berita} />
          ))
        )}
      </div>
    </div>
  );
};

export default Berita;
