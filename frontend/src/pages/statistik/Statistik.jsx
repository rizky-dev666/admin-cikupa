import React from 'react'
import { Link } from 'react-router-dom'
import CardStatistik from '../../components/CardStatistik'

const dataStatistik = [
  {
    title: 'Data Penduduk',
    caption:
      'Data penduduk ini mencakup informasi mengenai jumlah jiwa, struktur usia, jenis kelamin, serta status pekerjaan warga dalam suatu wilayah administratif.',
    image: '/statistik/penduduk.png',
    link: '/statistik/penduduk',
  },
  {
    title: 'Data Pendidikan',
    caption:
      'Statistik ini memberikan informasi tentang tingkat pendidikan warga, distribusi lulusan, dan akses terhadap fasilitas pendidikan.',
    image: '/statistik/pendidikan.png',
    link: '/statistik/pendidikan',
  },
  {
    title: 'Data Pernikahan',
    caption:
      'Statistik ini memberikan informasi tentang jumlah pernikahan, usia rata-rata saat menikah, dan distribusi pernikahan berdasarkan jenis kelamin.',
    image: '/statistik/perkawinan.png',
    link: '/statistik/pernikahan',
  },
  {
    title: 'Data Agama',
    caption:
      'Statistik ini memberikan informasi tentang jumlah penduduk berdasarkan agama, distribusi keagamaan di berbagai wilayah, dan proporsi pemeluk tiap agama.',
    image: '/statistik/agama.png',
    link: '/statistik/agama',
  },
  {
    title: 'Data Perumahan',
    caption:
      'Statistik ini memberikan informasi tentang jumlah rumah tangga, jenis kepemilikan rumah, dan kondisi fisik tempat tinggal penduduk.',
    image: '/statistik/perumahan.png',
    link: '/statistik/perumahan',
  },
  {
    title: 'Data Pekerjaan',
    caption:
      'Statistik ini memberikan informasi tentang jenis pekerjaan warga, sebaran sektor pekerjaan, dan tren ketenagakerjaan di wilayah tertentu.',
    image: '/statistik/pekerjaan.png',
    link: '/statistik/pekerjaan',
  },
  {
    title: 'Data Umur Penduduk',
    caption:
      'Statistik ini memberikan informasi mengenai umur warga serta sebaran umur warga.',
    image: '/statistik/umur.png',
    link: '/statistik/umur',
  },
  {
    title: 'Data Sarana Kesehatan',
    caption:
      'Statistik ini memberikan informasi tentang jumlah dan jenis sarana kesehatan, seperti puskesmas, klinik, rumah sakit, dan apotek yang tersedia di wilayah tertentu.',
    image: '/statistik/sarana_kesehatan.png',
    link: '/statistik/sarana-kesehatan',
  },
  {
    title: 'Data Sarana Keagamaan',
    caption:
      'Statistik ini memberikan informasi tentang jumlah sarana keagamaan yang tersedia, seperti mushola, mesjid jami, dan fasilitas keagamaan lain.',
    image: '/statistik/sarana_keagamaan.png',
    link: '/statistik/sarana-keagamaan',
  },
  {
    title: 'Data Sarana Olahraga',
    caption:
      'Statistik ini memberikan informasi tentang jumlah dan jenis sarana olahraga yang tersedia, seperti lapangan sepak bola, gedung olahraga, dan fasilitas kebugaran.',
    image: '/statistik/sarana_olahraga.png',
    link: '/statistik/sarana-olahraga',
  },
  {
    title: 'Data Sarana Pendidikan',
    caption:
      'Statistik ini memberikan informasi tentang jumlah dan jenis sarana pendidikan, seperti sekolah dasar, sekolah menengah, dan perguruan tinggi di wilayah tertentu.',
    image: '/statistik/sarana_pendidikan.png',
    link: '/statistik/sarana-pendidikan',
  },
]

const Statistik = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center my-6">
      {dataStatistik.map((item, index) => (
        <CardStatistik
          key={index}
          title={item.title}
          caption={item.caption}
          image={item.image}
          link={item.link}
        />
      ))}
    </div>
  )
}

export default Statistik