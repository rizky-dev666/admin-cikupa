import { useState, useEffect } from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

const TambahSaranaKeagamaan = () => {
  const navigate = useNavigate();

  const [dataSaranaKeagamaan, setDataSaranaKeagamaan] = useState({
    masjid: "",
    mushola: "",
    gereja: "",
    pura: "",
    vihara: "",
    klenteng: "",
    pondok_pesantren: "",
    lainnya: "",
    tahun: "",
  });

  const handleChangeSaranaKeagamaan = (e) => {
    setDataSaranaKeagamaan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitSaranaKeagamaan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data-sarana-keagamaan", dataSaranaKeagamaan);
      alert("Data sarana keagamaan berhasil dikirim!");
      navigate("/statistik/sarana-keagamaan");
    } catch (error) {
      alert("Gagal kirim data sarana keagamaan");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Data sarana keagamaan</h2>
      <form onSubmit={handleSubmitSaranaKeagamaan}>
        <input
          name="masjid"
          placeholder="Masjid"
          value={dataSaranaKeagamaan.masjid}
          onChange={handleChangeSaranaKeagamaan}
          required
        />
        <br />
        <input
          name="mushola"
          placeholder="mushola"
          value={dataSaranaKeagamaan.mushola}
          onChange={handleChangeSaranaKeagamaan}
          required
        />
        <br />
        <input
          name="gereja"
          placeholder="gereja"
          value={dataSaranaKeagamaan.gereja}
          onChange={handleChangeSaranaKeagamaan}
          required
        />
        <br />
        <input
          name="pura"
          placeholder="pura"
          value={dataSaranaKeagamaan.pura}
          onChange={handleChangeSaranaKeagamaan}
          required
        />
        <br />
        <input
          name="vihara"
          placeholder="vihara"
          value={dataSaranaKeagamaan.vihara}
          onChange={handleChangeSaranaKeagamaan}
          required
        />
        <br />
        <input
          name="pondok_pesantren"
          placeholder="pondok pesantren"
          value={dataSaranaKeagamaan.pondok_pesantren}
          onChange={handleChangeSaranaKeagamaan}
          required
        />
        <br />
        <input
          name="klenteng"
          placeholder="klenteng"
          value={dataSaranaKeagamaan.klenteng}
          onChange={handleChangeSaranaKeagamaan}
          required
        />
        <br />
        <input
          name="lainnya"
          placeholder="lainnya"
          value={dataSaranaKeagamaan.lainnya}
          onChange={handleChangeSaranaKeagamaan}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="tahun"
          value={dataSaranaKeagamaan.tahun}
          onChange={handleChangeSaranaKeagamaan}
          required
        />
        <br />
        <button type="submit">Kirim Data sarana keagamaan</button>
      </form>
    </div>
  );
};

export default TambahSaranaKeagamaan;
