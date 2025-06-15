import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EntriDataPenduduk = () => {
  const navigate = useNavigate();
  const [slsList, setSlsList] = useState([]);
  const [dataPenduduk, setDataPenduduk] = useState({
    sls: "",
    perempuan: "",
    laki_laki: "",
    keluarga: "",
    tahun: "",
  });

  const handleChangePenduduk = (e) => {
    setDataPenduduk((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitPenduduk = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data-penduduk", dataPenduduk);
      alert("Data penduduk berhasil dikirim!");
      navigate("/statistik/penduduk");
    } catch (error) {
      alert("Gagal kirim data penduduk");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSls = async () => {
      try {
        const response = await axios.get("/api/data-domisili");
        setSlsList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data staff:", error);
      }
    };

    fetchSls();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Data Penduduk</h2>
      <form onSubmit={handleSubmitPenduduk}>
        <select
          name="sls"
          value={dataPenduduk.sls}
          onChange={handleChangePenduduk}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          required
        >
          <option value="">Pilih SLs</option>
          {slsList.map((sls) => (
            <option key={sls.id_domisili} value={sls.id_domisili}>
              Rw{sls.rw} / Rt{sls.rt}
            </option>
          ))}
        </select>
        <br />
        <input
          name="perempuan"
          placeholder="Jumlah Perempuan"
          value={dataPenduduk.perempuan}
          onChange={handleChangePenduduk}
          required
        />
        <br />
        <input
          name="laki_laki"
          placeholder="Jumlah Laki-laki"
          value={dataPenduduk.laki_laki}
          onChange={handleChangePenduduk}
          required
        />
        <br />
        <input
          name="keluarga"
          placeholder="Jumlah Keluarga"
          value={dataPenduduk.keluarga}
          onChange={handleChangePenduduk}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="Tahun"
          value={dataPenduduk.tahun}
          onChange={handleChangePenduduk}
          required
        />
        <br />
        <button type="submit">Kirim Data Penduduk</button>
      </form>
    </div>
  );
};

export default EntriDataPenduduk;
