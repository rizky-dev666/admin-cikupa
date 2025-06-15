import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditSaranaKesetahan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataSaranaKesehatan, setDataSaranaKesehatan] = useState({
    puskesmas: "",
    pustu: "",
    posyandu: "",
    apotek: "",
    praktek_dokter: "",
    rumah_sakit: "",
    polindes: "",
    poskesdes: "",
    rumah_bersalin: "",
    lainnya: "",
    tahun: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/data-sarana-kesehatan/${id}`);
        setDataSaranaKesehatan(res.data);
      } catch (error) {
        alert("Gagal mengambil data");
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChangeSaranaKesehatan = (e) => {
    setDataSaranaKesehatan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitSaranaKesehatan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/data-sarana-kesehatan/${id}`, dataSaranaKesehatan);
      alert("Data sarana kesehatan berhasil diperbarui!");
      navigate("/statistik/sarana-kesehatan");
    } catch (error) {
      alert("Gagal update data sarana kesehatan");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Data sarana kesehatan</h2>
      <form onSubmit={handleSubmitSaranaKesehatan}>
        <input
          name="puskesmas"
          placeholder="puskesmas"
          value={dataSaranaKesehatan.puskesmas}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="pustu"
          placeholder="pustu"
          value={dataSaranaKesehatan.pustu}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="posyandu"
          placeholder="posyandu"
          value={dataSaranaKesehatan.posyandu}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="apotek"
          placeholder="apotek"
          value={dataSaranaKesehatan.apotek}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="praktek_dokter"
          placeholder="praktek dokter"
          value={dataSaranaKesehatan.praktek_dokter}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="rumah_sakit"
          placeholder="rumah sakit"
          value={dataSaranaKesehatan.rumah_sakit}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="polindes"
          placeholder="polindes"
          value={dataSaranaKesehatan.polindes}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="poskesdes"
          placeholder="poskesdes"
          value={dataSaranaKesehatan.poskesdes}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="rumah_bersalin"
          placeholder="rumah bersalin"
          value={dataSaranaKesehatan.rumah_bersalin}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="lainnya"
          placeholder="lainnya"
          value={dataSaranaKesehatan.lainnya}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="tahun"
          value={dataSaranaKesehatan.tahun}
          onChange={handleChangeSaranaKesehatan}
          required
        />
        <br />
        <button type="submit">Kirim Data sarana Kesehatan</button>
      </form>
    </div>
  );
};

export default EditSaranaKesetahan;
