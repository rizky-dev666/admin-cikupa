import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TambahSls = () => {
  const navigate = useNavigate();

  const [dataDomisili, setDataDomisili] = useState({
    rw: "",
    rt: "",
  });

  const handleChangeDomisili = (e) => {
    setDataDomisili((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitDomisili = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/data-domisili", dataDomisili);
      alert("Data domisili berhasil dikirim!");
      navigate("/statistik/penduduk");
    } catch (error) {
      alert("Gagal kirim data domisili");
      console.error(error);
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Form Data Domisili
      </h2>
      <form onSubmit={handleSubmitDomisili} className="space-y-4">
        <div>
          <label
            htmlFor="rw"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            RW
          </label>
          <input
            type="text"
            id="rw"
            name="rw"
            placeholder="Masukkan RW"
            value={dataDomisili.rw}
            onChange={handleChangeDomisili}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="rt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            RT
          </label>
          <input
            type="text"
            id="rt"
            name="rt"
            placeholder="Masukkan RT"
            value={dataDomisili.rt}
            onChange={handleChangeDomisili}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Kirim Data Domisili
        </button>
      </form>
    </div>
  );
};

export default TambahSls;
