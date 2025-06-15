import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DetailPengaduan = () => {
  const { id } = useParams();
  const [pesan, setPesan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPesan = async () => {
      try {
        const response = await axios.get(`/api/pengaduan/${id}`);
        setPesan(response.data);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };

    fetchPesan();
  }, [id]);

  if (!pesan) {
    return (
      <div className="container min-h-screen mx-auto p-4">
        <div className="w-full bg-slate-200 py-3 px-2">
          <div className="flex items-center">
            <Skeleton circle height={24} width={24} className="mr-2" />
            <Skeleton width={80} />
          </div>
        </div>

        <section className="w-full px-4 bg-white py-4 rounded-r-3xl">
          <div className="flex justify-between items-center h-48 border-b-2 mb-8">
            <div className="flex space-x-4 items-center">
              <div className="flex flex-col space-y-2">
                <Skeleton width={150} height={20} />
                <Skeleton width={100} height={16} />
                <Skeleton width={120} height={16} />
              </div>
            </div>
            <div>
              <Skeleton width={112} height={112} />
            </div>
          </div>

          <section>
            <Skeleton height={28} width={200} />
            <div className="mt-8 space-y-2">
              <Skeleton count={4} />
            </div>
          </section>
        </section>
      </div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto ">
      <div className="w-full bg-slate-200 text-black py-3 px-2">
        <button
          className="flex items-center text-start"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack className="mr-2" />
          <h1>kembali</h1>
        </button>
      </div>

      <section className="w-full px-4 flex flex-col bg-white rounded-r-3xl">
        <div className="flex justify-between items-center h-48 border-b-2 mb-8">
          <div className="flex space-x-4 items-center">
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg">{pesan.nama_pengadu}</h3>
              <p className="text-light text-gray-400">+62{pesan.tlp_pengadu}</p>
              <p className="text-light text-gray-400">
                {new Date(pesan.created_at).toLocaleDateString()}{" "}
                {new Date(pesan.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div>
            <ul className="flex text-gray-400 space-x-4">
              <li className="w-28 h-28">
                {(() => {
                  const url = pesan.lampiran_pengadu;
                  const ext = url?.split(".").pop().toLowerCase();
                  const isImage = [
                    "jpg",
                    "jpeg",
                    "png",
                    "gif",
                    "webp",
                  ].includes(ext);
                  const isPDF = ext === "pdf";

                  if (isImage) {
                    return (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Lihat Gambar"
                      >
                        <img
                          src={url}
                          alt="Lampiran"
                          className="w-full h-full object-cover rounded"
                        />
                      </a>
                    );
                  } else if (isPDF) {
                    return (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                        title="Lihat PDF"
                      >
                        📄 Lihat PDF
                      </a>
                    );
                  } else {
                    return (
                      <a
                        href={url}
                        download
                        className="text-gray-700 underline text-sm"
                        title="Unduh File"
                      >
                        📎 Unduh File
                      </a>
                    );
                  }
                })()}
              </li>
            </ul>
          </div>
        </div>
        <section>
          <h1 className="font-bold text-2xl">{pesan.kategori_pengadu}</h1>
          <article className="mt-8 text-gray-500 leading-7 tracking-wider">
            <p>{pesan.pengaduan}</p>
          </article>
        </section>
      </section>
    </div>
  );
};

export default DetailPengaduan;
