import { useState, useEffect } from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

const TambahAgama = () => {
  const navigate = useNavigate();
  const [dataAgama, setDataAgama] = useState({
    islam: "",
    kristen: "",
    hindu: "",
    budha: "",
    konghucu: "",
    kepercayaan_lain: "",
    tahun: "",
    sls: "",
  });

  const [slsList, setSlsList] = useState([]);

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

  const handleChangeAgama = (e) => {
    setDataAgama((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitAgama = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data-agama/", dataAgama);
      alert("Data agama berhasil dikirim!");

      navigate("/statistik/agama");
    } catch (error) {
      alert("Gagal kirim data agama");
      console.log(dataAgama);
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Data Agama</h2>
      <form onSubmit={handleSubmitAgama}>
        <select
          name="sls"
          value={dataAgama.sls}
          onChange={handleChangeAgama}
          //   disabled={!isEditing}
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
        <input
          name="islam"
          placeholder="data agama islam"
          value={dataAgama.islam}
          onChange={handleChangeAgama}
          required
        />
        <br />
        <input
          name="kristen"
          placeholder="Data agama kristen"
          value={dataAgama.kristen}
          onChange={handleChangeAgama}
          required
        />
        <br />
        <input
          name="hindu"
          placeholder="Data agama hindu"
          value={dataAgama.hindu}
          onChange={handleChangeAgama}
          required
        />
        <br />
        <input
          name="budha"
          placeholder="Data agama budha"
          value={dataAgama.budha}
          onChange={handleChangeAgama}
          required
        />
        <br />
        <input
          name="konghucu"
          placeholder="Data agama konghucu"
          value={dataAgama.konghucu}
          onChange={handleChangeAgama}
          required
        />
        <br />
        <input
          name="kepercayaan_lain"
          placeholder="Data kepercayaan lain"
          value={dataAgama.kepercayaan_lain}
          onChange={handleChangeAgama}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="tahun"
          value={dataAgama.tahun}
          onChange={handleChangeAgama}
          required
        />
        <br />
        <button type="submit">Kirim Data agama</button>
      </form>
    </div>
  );
};

export default TambahAgama;
