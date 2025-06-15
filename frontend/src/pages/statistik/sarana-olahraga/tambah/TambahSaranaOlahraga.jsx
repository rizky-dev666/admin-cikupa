import { useState, useEffect } from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

const TambahSaranaOlahraga = () => {
  const navigate = useNavigate();

  const [dataSaranaOlahraga, setDataSaranaOlaharaga] = useState({
    lapang_sepak_bola: "",
    lapang_bola_voli: "",
    lapang_basket: "",
    lapang_bulu_tangkis: "",
    lapang_serbaguna: "",
    meja_tenis_meja: "",
    lainnya: "",
    tahun: "",
  });

  const handleChangeSaranaOlahraga = (e) => {
    setDataSaranaOlaharaga((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitSaranaOlahraga = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data-sarana-olahraga", dataSaranaOlahraga);
      alert("Data sarana olahraga berhasil dikirim!");
      navigate("/statistik/sarana-olahraga");
    } catch (error) {
      alert("Gagal kirim data sarana olaharag");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Data sarana olahraga</h2>
      <form onSubmit={handleSubmitSaranaOlahraga}>
        <input
          name="lapang_sepak_bola"
          placeholder="lapang sepak bola"
          value={dataSaranaOlahraga.lapang_sepak_bola}
          onChange={handleChangeSaranaOlahraga}
          required
        />
        <br />
        <input
          name="lapang_bola_voli"
          placeholder="lapang bola voli"
          value={dataSaranaOlahraga.lapang_bola_voli}
          onChange={handleChangeSaranaOlahraga}
          required
        />
        <br />
        <input
          name="lapang_basket"
          placeholder="lapang basket"
          value={dataSaranaOlahraga.lapang_basket}
          onChange={handleChangeSaranaOlahraga}
          required
        />
        <br />
        <input
          name="meja_tenis_meja"
          placeholder="meja tenis meja"
          value={dataSaranaOlahraga.meja_tenis_meja}
          onChange={handleChangeSaranaOlahraga}
          required
        />
        <br />
        <input
          name="lapang_serbaguna"
          placeholder="lapang serba guna"
          value={dataSaranaOlahraga.lapang_serbaguna}
          onChange={handleChangeSaranaOlahraga}
          required
        />
        <br />
        <input
          name="lapang_bulu_tangkis"
          placeholder="lapang bulu tangkis"
          value={dataSaranaOlahraga.lapang_bulu_tangkis}
          onChange={handleChangeSaranaOlahraga}
          required
        />
        <br />
        <input
          name="lainnya"
          placeholder="lainnya"
          value={dataSaranaOlahraga.lainnya}
          onChange={handleChangeSaranaOlahraga}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="tahun"
          value={dataSaranaOlahraga.tahun}
          onChange={handleChangeSaranaOlahraga}
          required
        />
        <br />
        <button type="submit">Kirim Data sarana olahraga</button>
      </form>
    </div>
  );
};

export default TambahSaranaOlahraga;
