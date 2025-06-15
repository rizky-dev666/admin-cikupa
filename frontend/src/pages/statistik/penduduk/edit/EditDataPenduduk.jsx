import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditDataPenduduk = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [slsList, setSlsList] = useState([]);

  const [dataPenduduk, setDataPenduduk] = useState({
    sls: "",
    perempuan: "",
    laki_laki: "",
    keluarga: "",
    tahun: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/data-penduduk/${id}`);
        setDataPenduduk(res.data);
      } catch (error) {
        alert("Gagal mengambil data");
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

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

  const handleChangePenduduk = (e) => {
    setDataPenduduk((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitPenduduk = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/data-penduduk/${id}`, dataPenduduk);
      alert("Data penduduk berhasil diperbarui!");
      navigate("/statistik/penduduk");
    } catch (error) {
      alert("Gagal update data penduduk");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Data Penduduk</h2>
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
              RW{sls.rw} / RT{sls.rt}
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
        <button type="submit">Update Data Penduduk</button>
      </form>
    </div>
  );
};

export default EditDataPenduduk;
