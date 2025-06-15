import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditSaranaPendidikan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataSaranaPendidikan, setDataSaranaPendidikan] = useState({
    paud: "",
    kb: "",
    tk: "",
    ra: "",
    sd_negeri: "",
    sd_swasta: "",
    mi: "",
    sdit: "",
    sd_kristen_katolik: "",
    smp_negeri: "",
    smp_swasta: "",
    mts: "",
    smpit: "",
    smp_kristen_katolik: "",
    sma_negeri: "",
    sma_swasta: "",
    smk_negeri: "",
    smk_swasta: "",
    ma: "",
    mak: "",
    sma_it: "",
    sma_kristen_katolik: "",
    universitas: "",
    institut: "",
    sekolah_tinggi: "",
    politeknik: "",
    akademi: "",
    pesantren: "",
    tpa_tpq: "",
    madrasah_diniyah: "",
    sekolah_minggu: "",
    sekolah_sabat: "",
    pkbm: "",
    lkp: "",
    tahun: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/data-sarana-pendidikan/${id}`);
        setDataSaranaPendidikan(res.data);
      } catch (error) {
        alert("Gagal mengambil data");
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChangeSaranaPendidikan = (e) => {
    setDataSaranaPendidikan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitSaranaPendidikan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/data-sarana-pendidikan/${id}`,
        dataSaranaPendidikan
      );
      alert("Data sarana pendidikan berhasil diperbarui!");
      navigate("/statistik/sarana-pendidikan");
    } catch (error) {
      alert("Gagal update data sarana pendidikan");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Data sarana pendidikan</h2>
      <form onSubmit={handleSubmitSaranaPendidikan}>
        <input
          name="paud"
          placeholder="paud"
          value={dataSaranaPendidikan.paud}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="kb"
          placeholder="kb"
          value={dataSaranaPendidikan.kb}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="tk"
          placeholder="tk"
          value={dataSaranaPendidikan.tk}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="ra"
          placeholder="ra"
          value={dataSaranaPendidikan.ra}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sd_negeri"
          placeholder="sd_negeri"
          value={dataSaranaPendidikan.sd_negeri}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sd_swasta"
          placeholder="sd swasta"
          value={dataSaranaPendidikan.sd_swasta}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="mi"
          placeholder="mi"
          value={dataSaranaPendidikan.mi}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sdit"
          placeholder="sdit"
          value={dataSaranaPendidikan.sdit}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sd_kristen_katolik"
          placeholder="sd kristen "
          value={dataSaranaPendidikan.sd_kristen_katolik}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="smp_negeri"
          placeholder="smp negeri"
          value={dataSaranaPendidikan.smp_negeri}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="smp_swasta"
          placeholder="smp swasta"
          value={dataSaranaPendidikan.smp_swasta}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="mts"
          placeholder="mts"
          value={dataSaranaPendidikan.mts}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="smpit"
          placeholder="smpit"
          value={dataSaranaPendidikan.smpit}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="smp_kristen_katolik"
          placeholder="smp kristen"
          value={dataSaranaPendidikan.smp_kristen_katolik}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sma_negeri"
          placeholder="sma negeri"
          value={dataSaranaPendidikan.sma_negeri}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sma_swasta"
          placeholder="sma swasta"
          value={dataSaranaPendidikan.sma_swasta}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="smk_negeri"
          placeholder="smk negeri"
          value={dataSaranaPendidikan.smk_negeri}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="smk_swasta"
          placeholder="smk swasta"
          value={dataSaranaPendidikan.smk_swasta}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="ma"
          placeholder="ma"
          value={dataSaranaPendidikan.ma}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="mak"
          placeholder="mak"
          value={dataSaranaPendidikan.mak}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sma_it"
          placeholder="sma it"
          value={dataSaranaPendidikan.sma_it}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sma_kristen_katolik"
          placeholder="sma kristen"
          value={dataSaranaPendidikan.sma_kristen_katolik}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="universitas"
          placeholder="universitas"
          value={dataSaranaPendidikan.universitas}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="institut"
          placeholder="institut"
          value={dataSaranaPendidikan.institut}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sekolah_tinggi"
          placeholder="sekolah tinggi"
          value={dataSaranaPendidikan.sekolah_tinggi}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="akademi"
          placeholder="akademi"
          value={dataSaranaPendidikan.akademi}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="politeknik"
          placeholder="politeknik"
          value={dataSaranaPendidikan.politeknik}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="pesantren"
          placeholder="pesantren"
          value={dataSaranaPendidikan.pesantren}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="tpa_tpq"
          placeholder="tpa"
          value={dataSaranaPendidikan.tpa_tpq}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="madrasah_diniyah"
          placeholder="madrasah diniyah"
          value={dataSaranaPendidikan.madrasah_diniyah}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sekolah_minggu"
          placeholder="sekolah minggu"
          value={dataSaranaPendidikan.sekolah_minggu}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="sekolah_sabat"
          placeholder="sekolah sabat"
          value={dataSaranaPendidikan.sekolah_sabat}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="pkbm"
          placeholder="pkbm"
          value={dataSaranaPendidikan.pkbm}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="lkp"
          placeholder="lkp"
          value={dataSaranaPendidikan.lkp}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="lainnya"
          placeholder="lainnya"
          value={dataSaranaPendidikan.lainnya}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <input
          name="tahun"
          placeholder="tahun"
          value={dataSaranaPendidikan.tahun}
          onChange={handleChangeSaranaPendidikan}
          required
        />
        <br />
        <button type="submit">Kirim Data sarana pendidikan</button>
      </form>
    </div>
  );
};

export default EditSaranaPendidikan;
