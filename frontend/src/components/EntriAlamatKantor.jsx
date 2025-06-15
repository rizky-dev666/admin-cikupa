import { useState } from 'react';
import axios from 'axios';

const EntriAlamatKantor = () => {
    const [alamatKantor, setAlamatKantor] = useState({
        provinsi: '',
        kota: '',
        kecamatan: '',
        kode_pos: '',
        nama_jalan: '',
    });

    const handleChangeAlamat = (e) => {
        setAlamatKantor((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleSubmitAlamat = async (e) => {
        e.preventDefault();
        try {
        await axios.post('/api/alamat-kantor', alamatKantor);
        alert('Alamat kantor desa berhasil dikirim!');
        } catch (error) {
        alert('Gagal kirim alamat kantor desa');
        console.error(error);
        }
    };

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Alamat Kantor Desa</h2>
      <form onSubmit={handleSubmitAlamat}>
        <input name="provinsi" placeholder="Provinsi" value={alamatKantor.provinsi} onChange={handleChangeAlamat} required /><br />
        <input name="kota" placeholder="Kota" value={alamatKantor.kota} onChange={handleChangeAlamat} required /><br />
        <input name="kecamatan" placeholder="Kecamatan" value={alamatKantor.kecamatan} onChange={handleChangeAlamat} required /><br />
        <input name="kode_pos" placeholder="Kode Pos" value={alamatKantor.kode_pos} onChange={handleChangeAlamat} required /><br />
        <input name="nama_jalan" placeholder="Nama Jalan" value={alamatKantor.nama_jalan} onChange={handleChangeAlamat} required /><br />
        <button type="submit">Kirim Alamat Kantor</button>
      </form>
    </div>
  )
}

export default EntriAlamatKantor