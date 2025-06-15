import { useState, useEffect } from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

const TambahDataUmur = () => {
  const navigate = useNavigate();

  const [dataUmur, setDataUmur] = useState({
    umur: "",
    laki_laki: "",
    perempuan: "",
    tahun: "",
  });

  const handleChangeUmur = (e) => {
    setDataUmur((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitUmur = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data-umur", dataUmur);
      alert("Data umur berhasil dikirim!");
      navigate("/statistik/umur");
    } catch (error) {
      alert("Gagal kirim data pernikahan");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Data Umur</h2>
      <form onSubmit={handleSubmitUmur}>
        <input
          name="umur"
          placeholder="data umur"
          value={dataUmur.umur}
          onChange={handleChangeUmur}
          required
        />
        <br />
        <input
          name="laki_laki"
          placeholder="laki laki"
          value={dataUmur.laki_laki}
          onChange={handleChangeUmur}
          required
        />
        <br />
        <input
          name="perempuan"
          placeholder="perempuan"
          value={dataUmur.perempuan}
          onChange={handleChangeUmur}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="tahun"
          value={dataUmur.tahun}
          onChange={handleChangeUmur}
          required
        />

        <br />
        <button type="submit">Kirim Data umur</button>
      </form>
    </div>
  );
};

export default TambahDataUmur;
