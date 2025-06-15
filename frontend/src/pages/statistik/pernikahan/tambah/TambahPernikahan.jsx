import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahPernikahan = () => {
  const navigate = useNavigate();
  const [slsList, setSlsList] = useState([]);
  const [DataPernikahan, setDataPernikahan] = useState({
    sls: "",
    belum_kawin: "",
    kawin: "",
    cerai_hidup: "",
    cerai_mati: "",
    tahun: "",
  });

  const handleChangePernikahan = (e) => {
    setDataPernikahan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitPernikahan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data-perkawinan", DataPernikahan);
      alert("Data pernikahan berhasil dikirim!");
      navigate("/statistik/pernikahan");
    } catch (error) {
      alert("Gagal kirim data pernikahan");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSls = async () => {
      try {
        const response = await axios.get("/api/data-domisili");
        setSlsList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data domisili:", error);
      }
    };

    fetchSls();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Data Penduduk</h2>
      <form onSubmit={handleSubmitPernikahan}>
        <select
          name="sls"
          value={DataPernikahan.sls}
          onChange={handleChangePernikahan}
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
          name="belum_kawin"
          placeholder="data belum kawin"
          value={DataPernikahan.belum_kawin}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <input
          name="kawin"
          placeholder="kawin"
          value={DataPernikahan.kawin}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <input
          name="cerai_hidup"
          placeholder="cerai hidup"
          value={DataPernikahan.cerai_hidup}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <input
          name="cerai_mati"
          placeholder="cerai mati"
          value={DataPernikahan.cerai_mati}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="tahun"
          value={DataPernikahan.tahun}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <button type="submit">Kirim Data Perkawinan</button>
      </form>
    </div>
  );
};

export default TambahPernikahan;
