import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Galeri = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("/api/galeri");
      setImageUrls(res.data);
    } catch (error) {
      console.error("Gagal memuat data galeri:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Pilih gambar terlebih dahulu!",
      });
    }

    try {
      const formData = new FormData();
      formData.append("gambar_galeri", selectedFile);

      const uploadRes = await axios.post(
        "/api/upload/galeri",
        formData
      );
      const imageUrl = uploadRes.data.url;

      const saveRes = await axios.post("/api/galeri", {
        url: imageUrl,
        caption: caption,
      });

      const newImage = {
        id_galeri: saveRes.data.id_galeri,
        gambar_galeri: imageUrl,
        keterangan_gambar: caption,
      };

      setImageUrls((prev) => [newImage, ...prev]);
      setSelectedFile(null);
      setPreviewUrl("");
      setCaption("");

      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Gambar berhasil diupload dan disimpan.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      setUploadStatus("Gagal mengupload/simpan gambar.");

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengupload atau menyimpan gambar.",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Ingin menghapus gambar ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`/api/galeri/${id}`);
      setImageUrls((prev) => prev.filter((img) => img.id_galeri !== id));

      Swal.fire({
        icon: "success",
        title: "Terhapus!",
        text: "Gambar berhasil dihapus.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Gagal menghapus gambar:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal menghapus gambar.",
      });
    }
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="mb-5">
        <label className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer w-fit">
          <FaPlus className="mr-2" /> Pilih Gambar
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {previewUrl && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative group col-span-2 md:col-span-1 h-80">
              <img
                className="rounded-md w-full h-full object-cover"
                src={previewUrl}
                alt="Preview"
              />
            </div>

            <div className="col-span-2 h-80">
              <textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Tulis caption gambar di sini..."
                className="w-full h-full resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleUpload}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload Gambar
          </button>

          <p className="text-sm text-gray-700 mt-2">{uploadStatus}</p>
        </>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {imageUrls.map((item, index) => (
          <div
            key={index}
            className="rounded-md bg-white shadow-lg transition-colors duration-500 w-full h-full flex flex-col"
          >
            <img
              src={item.gambar_galeri}
              alt={`gallery-${index}`}
              className="h-[200px] w-full rounded-t-md object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <p className="line-clamp-3 text-sm text-gray-600">
                {item.keterangan_gambar || "Caption Gambar"}
              </p>
              <div className="flex space-x-1 mt-4">
                <button
                  onClick={() => handleDelete(item.id_galeri)}
                  type="button"
                  className="w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-300"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeri;
