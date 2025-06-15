import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, data } from "react-router-dom";

const EditDomisili = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataDomisili, setDataDomisili] = useState({
    rw: "",
    rt: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/data-domisili/${id}`);
        setDataDomisili(res.data);
      } catch (error) {
        alert("Gagal mengambil data");
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChangeDomisili = (e) => {
    setDataDomisili((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitDomisili = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/data-domisili/${id}`, dataDomisili);
      alert("Data domisili berhasil diperbarui!");
      navigate("/statistik/penduduk");
    } catch (error) {
      alert("Gagal update data domisili");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Data Domisili</h2>
      <form onSubmit={handleSubmitDomisili}>
        <input
          name="rw"
          placeholder="Jumlah Perempuan"
          value={dataDomisili.rw}
          onChange={handleChangeDomisili}
          required
        />
        <br />
        <input
          name="rt"
          placeholder="Rt"
          value={dataDomisili.rt}
          onChange={handleChangeDomisili}
          required
        />
        <br />
        <button type="submit">Update Data Penduduk</button>
      </form>
    </div>
  );
};

export default EditDomisili;
