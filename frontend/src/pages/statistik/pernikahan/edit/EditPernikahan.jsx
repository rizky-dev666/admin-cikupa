import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPernikahan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [slsList, setSlsList] = useState([]);

  const [dataPernikahan, setDataPernikahan] = useState({
    sls: "",
    belum_kawin: "",
    kawin: "",
    cerai_hidup: "",
    cerai_mati: "",
    tahun: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/data-perkawinan/${id}`);
        setDataPernikahan(res.data);
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

  const handleChangePernikahan = (e) => {
    setDataPernikahan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitPernikahan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/data-perkawinan/${id}`, dataPernikahan);
      alert("Data pernikahan berhasil diperbarui!");
      navigate("/statistik/pernikahan");
    } catch (error) {
      alert("Gagal update data pernikhan");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Data Penduduk</h2>
      <form onSubmit={handleSubmitPernikahan}>
        <select
          name="sls"
          value={dataPernikahan.sls}
          onChange={handleChangePernikahan}
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
          name="belum_kawin"
          placeholder="belum kawin"
          value={dataPernikahan.belum_kawin}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <input
          name="kawin"
          placeholder="kawin"
          value={dataPernikahan.kawin}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <input
          name="cerai_mati"
          placeholder="cerai mati"
          value={dataPernikahan.cerai_mati}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <input
          name="cerai_hidup"
          placeholder="cerai hidup"
          value={dataPernikahan.cerai_hidup}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="Tahun"
          value={dataPernikahan.tahun}
          onChange={handleChangePernikahan}
          required
        />
        <br />
        <button type="submit">Update Data pernikahan</button>
      </form>
    </div>
  );
};

export default EditPernikahan;
