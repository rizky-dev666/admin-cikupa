import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, data } from "react-router-dom";

const EditDataPekerjaan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataPekerjaan, setDataPekerjaan] = useState({
    pelajar: "",
    mengurus_rumah_tangga: "",
    tidak_bekerja: "",
    karyawan_swasta: "",
    petani: "",
    wiraswasta: "",
    perangkat_desa: "",
    pns: "",
    lainnya: "",
    tahun: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/data-pekerjaan/${id}`);
        setDataPekerjaan(res.data);
      } catch (error) {
        alert("Gagal mengambil data");
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChangePekerjaan = (e) => {
    setDataPekerjaan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitPekerjaan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/data-pekerjaan/${id}`, dataPekerjaan);
      alert("Data pekerjaan berhasil diperbarui!");
      navigate("/statistik/pekerjaan");
    } catch (error) {
      alert("Gagal update data pekerjaan");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Data pekerjaan</h2>
      <form onSubmit={handleSubmitPekerjaan}>
        <input
          name="pelajar"
          placeholder="pelajar"
          value={dataPekerjaan.pelajar}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <input
          name="mengurus_rumah_tangga"
          placeholder="MEngurus rumah tangga"
          value={dataPekerjaan.mengurus_rumah_tangga}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <input
          name="tidak_bekerja"
          placeholder="tidak bekerja"
          value={dataPekerjaan.tidak_bekerja}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <input
          name="karyawan_swasta"
          placeholder="karyawan swasta"
          value={dataPekerjaan.karyawan_swasta}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <input
          name="petani"
          placeholder="petani"
          value={dataPekerjaan.petani}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <input
          name="wiraswasta"
          placeholder="wiraswasta"
          value={dataPekerjaan.wiraswasta}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <input
          name="perangkat_desa"
          placeholder="perangkat desa"
          value={dataPekerjaan.perangkat_desa}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <input
          name="pns"
          placeholder="PNS"
          value={dataPekerjaan.pns}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <input
          name="lainnya"
          placeholder="lainnya"
          value={dataPekerjaan.lainnya}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="tahun"
          value={dataPekerjaan.tahun}
          onChange={handleChangePekerjaan}
          required
        />
        <br />
        <button type="submit">Kirim Data Pekerjaan</button>
      </form>
    </div>
  );
};

export default EditDataPekerjaan;
