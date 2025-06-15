import { useState } from "react";
import axios from "axios";

const entriDataUmur = () => {
  const [dataUmur, setDataUmur] = useState({
    umur: "",
    laki_laki: "",
    perempuan: "",
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
      alert("Data Umur berhasil dikirim!");
    } catch (error) {
      alert("Gagal kirim data umur");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Data Umur</h2>
      <form onSubmit={handleSubmitUmur}>
        <input
          name="umur"
          placeholder="umur"
          value={alamatKantor.umur}
          onChange={handleChangeUmur}
          required
        />
        <br />
        <input
          name="laki_laki"
          placeholder="laki_laki"
          value={alamatKantor.laki_laki}
          onChange={handleChangeUmur}
          required
        />
        <br />
        <input
          name="perempuan"
          placeholder="perempuan"
          value={alamatKantor.perempuan}
          onChange={handleChangeUmur}
          required
        />
        <br />
        <button type="submit">Kirim data umur</button>
      </form>
    </div>
  );
};

export default entriDataUmur;
