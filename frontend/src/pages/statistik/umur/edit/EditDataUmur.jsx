import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditDataUmur = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataUmur, setDataUmur] = useState({
    umur: "",
    laki_laki: "",
    perempuan: "",
    tahun: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/data-umur/${id}`);
        setDataUmur(res.data);
      } catch (error) {
        alert("Gagal mengambil data");
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChangeUmur = (e) => {
    setDataUmur((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitUmur = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/data-umur/${id}`, dataUmur);
      alert("Data umur berhasil diperbarui!");
      navigate("/statistik/umur");
    } catch (error) {
      alert("Gagal update data umur");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Data umur</h2>
      <form onSubmit={handleSubmitUmur}>
        <br />
        <input
          name="umur"
          placeholder="umur"
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
          placeholder="Tahun"
          value={dataUmur.tahun}
          onChange={handleChangeUmur}
          required
        />
        <br />
        <button type="submit">Update Data umur</button>
      </form>
    </div>
  );
};

export default EditDataUmur;
