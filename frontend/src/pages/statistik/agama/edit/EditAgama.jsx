import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, data } from "react-router-dom";

const EditAgama = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slsList, setSlsList] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/data-agama/${id}`);
        setDataAgama(res.data);
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

  const handleChangeAgama = (e) => {
    setDataAgama((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitAgama = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/data-agama/${id}`, dataAgama);
      alert("Data agama berhasil diperbarui!");
      navigate("/statistik/agama");
    } catch (error) {
      alert("Gagal update data agama");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Data agama</h2>
      <form onSubmit={handleSubmitAgama}>
        <select
          name="sls"
          value={dataAgama.sls}
          onChange={handleChangeAgama}
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
          name="islam"
          placeholder="Data agama islam"
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

        <button type="submit">Update Data Penduduk</button>
      </form>
    </div>
  );
};

export default EditAgama;
