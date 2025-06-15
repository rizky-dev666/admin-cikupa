import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const lokasiId = "f91cd017-c338-48aa-b68e-f8ac96367762";
const InformasiDesa = () => {
  const [gmapsLink, setGmapsLink] = useState("");

  useEffect(() => {
    const fetchLokasi = async () => {
      try {
        const res = await axios.get(
          `/api/lokasi-desa/${lokasiId}`
        );
        setGmapsLink(res.data.link_gmaps);
      } catch (error) {
        console.error("Gagal mengambil data lokasi:", error);
      }
    };

    fetchLokasi();
  }, []);
  return (
    <div className="container relative flex flex-col justify-between h-full max-w-7xl mx-auto xl:px-0 ">
      <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">
        Informasi Desa
      </h2>
      {gmapsLink ? (
        <div
          className="relative rounded-2xl h-0 overflow-hidden mb-6"
          style={{ paddingBottom: "30.25%" }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={gmapsLink}
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
            title="Google Map"
          ></iframe>
        </div>
      ) : (
        <Skeleton height={300} borderRadius={16} className="mb-6" />
      )}
      <div className="w-full">
        <div className="flex flex-col w-full mb-10 sm:flex-row space-x-9">
          <div className="w-full mb-10 sm:mb-0 sm:w-1/3 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <Link to={"/tentang-desa"}>
              <div className="relative h-full ml-0 mr-0 ">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Informasi Desa
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Halaman ini menampilkan data umum mengenai desa Anda,
                    seperti profil desa, potensi wilayah, data kependudukan, dan
                    fasilitas umum yang tersedia.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full sm:w-2/3 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <Link to={"/alamat-kantor"}>
              <div className="relative h-full ml-0">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Alamat Kantor Desa
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Halaman ini menampilkan alamat lengkap Kantor Desa beserta
                    informasi pendukung seperti kode pos, RT/RW, dan lokasi
                    administratif.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col w-full mb-5 sm:flex-row space-x-9">
          <div className="w-full mb-10 sm:mb-0 sm:w-1/2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <Link to={"/lokasi-desa"}>
              <div className="relative h-full ml-0 mr-0">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Lokasi Desa
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Halaman ini berisi informasi mengenai lokasi geografis desa,
                    termasuk koordinat peta, batas wilayah, dan wilayah
                    administratif seperti kecamatan dan kabupaten.
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div className="w-full mb-10 sm:mb-0 sm:w-1/2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <Link to="/struktur-organisasi">
              <div className="relative h-full ml-0 mr-0 ">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                  <div className="flex items-center -mt-1">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
                      Struktur Organisasi
                    </h3>
                  </div>
                  <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Halaman ini memuat struktur organisasi Pemerintah Desa,
                    termasuk kepala desa, perangkat desa, dan lembaga-lembaga
                    desa lainnya.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformasiDesa;
