import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahPendidikan = () => {
  const navigate = useNavigate();
  const [dataPendidikan, setDataPendidikan] = useState({
    belum_sekolah: "",
    masih_sekolah: "",
    tidak_bersekolah_lagi: "",
    sd: "",
    mi: "",
    paket_a: "",
    sdlb: "",
    smp: "",
    mts: "",
    smp_lb: "",
    paket_b: "",
    sma: "",
    smk: "",
    ma: "",
    paket_c: "",
    diploma: "",
    s1: "",
    profesi: "",
    s2: "",
    s3: "",
    sls: "",
  });

  const [slsList, setSlsList] = useState([]);

  useEffect(() => {
    const fetchSls = async () => {
      try {
        const response = await axios.get("/api/data-domisili");
        setSlsList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data staff:", error);
      }
    };

    fetchSls();
  }, []);

  const handleChangePendidikan = (e) => {
    setDataPendidikan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitPendidikan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data-pendidikan/", dataPendidikan);
      alert("Data pendidikan berhasil dikirim!");
      navigate("/statistik/pendidikan");
    } catch (error) {
      alert("Gagal kirim data pendidikan");
      console.error(error);
      console.log(dataPendidikan);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Data Pendidikan</h2>
      <form onSubmit={handleSubmitPendidikan}>
        <select
          name="sls"
          value={dataPendidikan.sls}
          onChange={handleChangePendidikan}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          required
        >
          <option value="">Pilih SLs</option>
          {slsList.map((sls) => (
            <option key={sls.id_domisili} value={sls.id_domisili}>
              Rw{sls.rw} / Rt{sls.rt}
            </option>
          ))}
        </select>
        <input
          name="belum_sekolah"
          placeholder="Data belum sekolah"
          value={dataPendidikan.belum_sekolah}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="masih_sekolah"
          placeholder="Data masih sekolah"
          value={dataPendidikan.masih_sekolah}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="tidak_bersekolah_lagi"
          placeholder="Data tidak sekolah"
          value={dataPendidikan.tidak_bersekolah_lagi}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="sd"
          placeholder="Data siswa Sd"
          value={dataPendidikan.sd}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="mi"
          placeholder="Data siswa MI"
          value={dataPendidikan.mi}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="paket_a"
          placeholder="Data siswa paket A"
          value={dataPendidikan.paket_a}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="sdlb"
          placeholder="Data siswa sdlb"
          value={dataPendidikan.sdlb}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="smp"
          placeholder="Data siswa Smp"
          value={dataPendidikan.smp}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="mts"
          placeholder="Data siswa mts"
          value={dataPendidikan.mts}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="smp_lb"
          placeholder="Data siswa Smp LB"
          value={dataPendidikan.smp_lb}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="paket_b"
          placeholder="Data siswa paket B"
          value={dataPendidikan.paket_b}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="sma"
          placeholder="Data siswa sma"
          value={dataPendidikan.sma}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="smk"
          placeholder="Data siswa SMK"
          value={dataPendidikan.smk}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="ma"
          placeholder="Data siswa MA"
          value={dataPendidikan.ma}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="paket_c"
          placeholder="Data siswa paket C"
          value={dataPendidikan.paket_c}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="diploma"
          placeholder="Data mahasiswa diploma"
          value={dataPendidikan.diploma}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="s1"
          placeholder="Data mahasiswa S1"
          value={dataPendidikan.s1}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="profesi"
          placeholder="Data mahasiswa Profesi"
          value={dataPendidikan.profesi}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="s2"
          placeholder="Data mahasiswa S2"
          value={dataPendidikan.s2}
          onChange={handleChangePendidikan}
          required
        />
        <br />
        <input
          name="s3"
          placeholder="Data mahasiswa S3"
          value={dataPendidikan.s3}
          onChange={handleChangePendidikan}
          required
        />
        <br />

        <button type="submit">Kirim Data Pendidikan</button>
      </form>
    </div>
  );
};

export default TambahPendidikan;
