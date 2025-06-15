import { useState } from "react";
import axios from "axios";

const EntriLokasiDesa = () => {
  const [lokasiDesa, setLokasiDesa] = useState({
    link_gmaps: "",
    luas_desa: "",
    batas_utara: "",
    batas_timur: "",
    batas_selatan: "",
    batas_barat: "",
  });

  const handleChangeLokasi = (e) => {
    setLokasiDesa((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitLokasi = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/lokasi-desa", lokasiDesa);
      alert("Lokasi desa berhasil dikirim!");
    } catch (error) {
      alert("Gagal kirim lokasi desa");
      console.error(error);
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Form Lokasi Desa</h2>
      <form onSubmit={handleSubmitLokasi}>
        <input
          name="link_gmaps"
          placeholder="link_gmaps"
          value={lokasiDesa.link_gmaps}
          onChange={handleChangeLokasi}
          required
        />
        <br />
        <input
          name="luas_desa"
          placeholder="luas_desa"
          value={lokasiDesa.luas_desa}
          onChange={handleChangeLokasi}
          required
        />
        <br />
        <input
          name="batas_utara"
          placeholder="batas_utara"
          value={lokasiDesa.batas_utara}
          onChange={handleChangeLokasi}
          required
        />
        <br />
        <input
          name="batas_timur"
          placeholder="batas_timur"
          value={lokasiDesa.batas_timur}
          onChange={handleChangeLokasi}
          required
        />
        <br />
        <input
          name="batas_barat"
          placeholder="batas_barat"
          value={lokasiDesa.batas_barat}
          onChange={handleChangeLokasi}
          required
        />
        <br />
        <input
          name="batas_selatan"
          placeholder="batas_selatan"
          value={lokasiDesa.batas_selatan}
          onChange={handleChangeLokasi}
          required
        />
        <br />
        <button type="submit">Kirim lokasi desa</button>
      </form>
    </div>
  );
};

export default EntriLokasiDesa;
