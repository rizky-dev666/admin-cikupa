import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Inbox = () => {
  const [pengaduans, setPengaduans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPengaduans = async () => {
      try {
        const response = await axios.get('/api/pengaduan');
        setPengaduans(response.data);
      } catch (error) {
        console.error('Error fetching pengaduan:', error);
      }
    };

    fetchPengaduans();
  }, []);

  const handleClickPengaduans = async (id_pengaduan) => {
    try {
      await axios.put(`/api/pengaduan/${id_pengaduan}`, { is_read: true });

      setPengaduans((prevPengaduans) =>
        prevPengaduans.map((pengaduan) =>
          pengaduan.id_pengaduan === id_pengaduan ? { ...pengaduan, is_read: true } : pengaduan
        )
      );

      navigate(`/pengaduan/${id_pengaduan}`);
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  return (
    <div className="container min-h-screen mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Pengaduan</h1>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-200 p-2 font-medium text-sm">
          <div className="col-span-1">Nama</div>
          <div className="col-span-1">Kategori</div>
          <div className="col-span-1 text-right">Tanggal</div>
        </div>
        {pengaduans.map((pengaduan) => (
          <div 
            key={pengaduan.id_pengaduan}  
            onClick={() => handleClickPengaduans(pengaduan.id_pengaduan)}
            className={`grid grid-cols-3 p-2 border-b hover:bg-gray-100 text-sm cursor-pointer ${
              !pengaduan.is_read ? 'font-semibold' : 'font-normal'
            }`}
          >
            <div className="col-span-1">{pengaduan.nama_pengadu}</div>
            <div className="col-span-1">{pengaduan.kategori_pengadu}</div>
            <div className="col-span-1 text-right">
              {new Date(pengaduan.created_at).toLocaleDateString()} {new Date(pengaduan.created_at).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Inbox;
