import { useState } from "react";
import axios from "axios";

const Pengaduan = () => {
  const [dataPengaduan, setDataPengaduan] = useState({
    nama_pengadu: "",
    tlp_pengadu: "",
    kategori_pengadu: "",
    pengaduan: "",
  });
  const [lampiranFile, setLampiranFile] = useState(null);

  const handleChangePengaduan = (e) => {
    const { name, value, files } = e.target;
    if (name === "lampiran_pengadu") {
      setLampiranFile(files[0]);
    } else {
      setDataPengaduan((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitPengaduan = async (e) => {
    e.preventDefault();
    try {
      let lampiranUrl = "";
      if (lampiranFile) {
        const formData = new FormData();
        formData.append("pengaduan", lampiranFile);
        const uploadRes = await axios.post("/api/upload/pengaduan", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        lampiranUrl = uploadRes.data.url;
      }

      const finalData = { ...dataPengaduan, lampiran_pengadu: lampiranUrl };
      await axios.post("/api/data-pengaduan", finalData);
      alert("Data pengaduan berhasil dikirim!");
    } catch (error) {
      console.error(error);
      alert("Gagal kirim data pengaduan");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Form Data Pengaduan</h2>
      <form onSubmit={handleSubmitPengaduan} className="space-y-4">
        <input
          type="text"
          name="nama_pengadu"
          placeholder="Nama Lengkap"
          value={dataPengaduan.nama_pengadu}
          onChange={handleChangePengaduan}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="tlp_pengadu"
          placeholder="Telpon / Whatsapp"
          value={dataPengaduan.tlp_pengadu}
          onChange={handleChangePengaduan}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <select
          name="kategori_pengadu"
          value={dataPengaduan.kategori_pengadu}
          onChange={handleChangePengaduan}
          required
          className="w-full px-4 py-2 border rounded-lg bg-white"
        >
          <option value="">-- Pilih Kategori --</option>
          <option value="umum">Umum</option>
          <option value="sosial">Sosial</option>
          <option value="keamanan">Keamanan</option>
          <option value="kesehatan">Kesehatan</option>
          <option value="kebersihan">Kebersihan</option>
          <option value="permintaan">Permintaan</option>
        </select>

        <textarea
          name="pengaduan"
          placeholder="Pengaduan"
          value={dataPengaduan.pengaduan}
          onChange={handleChangePengaduan}
          required
          rows={4}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="file"
          name="lampiran_pengadu"
          onChange={handleChangePengaduan}
          required
          className="w-full border rounded-lg py-2 px-4 bg-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg"
        >
          Kirim Data Pengaduan
        </button>
      </form>
    </div>
  );
};

export default Pengaduan;
