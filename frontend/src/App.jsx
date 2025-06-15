import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import EntriAlamatKantor from "./components/EntriAlamatKantor";
import Banner from "./pages/banner/Banner";
import Pengguna from "./pages/pengguna/Pengguna";
import Riwayat from "./pages/riwayat/Riwayat";
import InformasiDesa from "./pages/desa/InformasiDesa";
import DataPenduduk from "./pages/statistik/penduduk/DataPenduduk";
import Statistik from "./pages/statistik/statistik";
import EntriDataPenduduk from "./pages/statistik/penduduk/tambah/EntriDataPenduduk";
import TambahBanner from "./pages/banner/tambah/TambahBanner";
import DataPendidikan from "./pages/statistik/pendidikan/DataPendidikan";
import DataPernikahan from "./pages/statistik/pernikahan/DataPernikahan";
import DataAgama from "./pages/statistik/agama/DataAgama";
import DataUmurPenduduk from "./pages/statistik/umur/DataUmurPenduduk";
import Login from "./pages/login/login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import TambahPengguna from "./pages/pengguna/tambah/TambahPengguna";
import Galeri from "./pages/galeri/Galeri";
import Berita from "./pages/berita/Berita";
import EditPengguna from "./pages/pengguna/edit/EditPengguna";
import TambahBerita from "./pages/berita/tambah/TambahBerita";
import BacaBerita from "./pages/berita/baca/BacaBerita";
import EditBerita from "./pages/berita/edit/EditBerita";
import SliderCard from "./pages/desa/strukturOrganisasi/CardComponent";
import CardSlider from "./pages/desa/strukturOrganisasi/CardSlider";
import CardComponent from "./pages/desa/strukturOrganisasi/CardComponent";
import TambahStaf from "./pages/desa/strukturOrganisasi/staff/TambahStaf";
import EditStaff from "./pages/desa/strukturOrganisasi/staff/EditStaff";
import AlamatKantor from "./pages/desa/alamatKantor/AlamatKantor";
import LokasiDesa from "./pages/desa/lokasiDesa/LokasiDesa";
import TentangDesa from "./pages/desa/tentangDesa/TentangDesa";
import Inbox from "./pages/inbox/Inbox";
import Pengaduan from "./components/Pengaduan";
import DetailPengaduan from "./pages/inbox/DetailPengaduan";
import EditDataPenduduk from "./pages/statistik/penduduk/edit/EditDataPenduduk";
import TambahPendidikan from "./pages/statistik/pendidikan/tambah/TambahPendidikan";
import TambahSls from "./pages/statistik/penduduk/tambah/TambahSls";
import EditDomisili from "./pages/statistik/penduduk/edit/EditDomisili";
import EditPendidikan from "./pages/statistik/pendidikan/edit/EditPendidikan";
import TambahPernikahan from "./pages/statistik/pernikahan/tambah/TambahPernikahan";
import EditPernikahan from "./pages/statistik/pernikahan/edit/EditPernikahan";
import TambahAgama from "./pages/statistik/agama/tambah/TambahAgama";
import EditAgama from "./pages/statistik/agama/edit/EditAgama";
import TambahDataUmur from "./pages/statistik/umur/tambah/TambahDataUmur";
import EditDataUmur from "./pages/statistik/umur/edit/EditDataUmur";
import SaranaOlahraga from "./pages/statistik/sarana-olahraga/SaranaOlahraga";
import TambahSaranaOlahraga from "./pages/statistik/sarana-olahraga/tambah/TambahSaranaOlahraga";
import EditSaranaOlahraga from "./pages/statistik/sarana-olahraga/edit/EditSaranaOlahraga";
import SaranaKesehatan from "./pages/statistik/sarana-kesehatan/SaranaKesehatan";
import TambahSaranaKesehatan from "./pages/statistik/sarana-kesehatan/tambah/TambahSaranaKesehatan";
import EditSaranaKesetahan from "./pages/statistik/sarana-kesehatan/edit/EditSaranaKesehatan";
import DataPekerjaan from "./pages/statistik/pekerjaan/DataPekerjaan";
import EditDataPekerjaan from "./pages/statistik/pekerjaan/edit/EditDataPekerjaan";
import TambahDataPekerjaan from "./pages/statistik/pekerjaan/tambah/TambahDataPekerjaan";
import SaranaKeagamaan from "./pages/statistik/sarana-keagamaan/SaranaKeagamaan";
import TambahSaranaKeagamaan from "./pages/statistik/sarana-keagamaan/tambah/TambahSaranaKeagamaan";
import EditSaranaKeagamaan from "./pages/statistik/sarana-keagamaan/edit/EditSaranaKeagamaan";
import SaranaPendidikan from "./pages/statistik/sarana-pendidikan/SaranaPendidikan";
import TambahSaranaPendidikan from "./pages/statistik/sarana-pendidikan/tambah/TambahSaranaPendidikan";
import EditSaranaPendidikan from "./pages/statistik/sarana-pendidikan/edit/EditSaranaPendidikan";
import PotensiEkonomi from "./pages/potensi-ekonomi/PotensiEkonomi";
import Produk from "./pages/potensi-ekonomi/produk-unggulan/Produk";
import TambahProduk from "./pages/potensi-ekonomi/produk-unggulan/tambah/TambahProduk";
import EditProduk from "./pages/potensi-ekonomi/produk-unggulan/tambah/edit/EditProduk";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pengaduan" element={<Pengaduan />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            {/* banner */}
            <Route path="banner" element={<Banner />} />
            <Route path="tambah-banner" element={<TambahBanner />} />
            {/* galeri */}
            <Route path="galeri" element={<Galeri />} />
            {/* inbox */}
            <Route path="inbox" element={<Inbox />} />
            <Route path="pengaduan/:id" element={<DetailPengaduan />} />
            {/* berita */}
            <Route path="berita" element={<Berita />} />
            <Route path="berita/:id" element={<BacaBerita />} />
            <Route path="edit-berita/:id" element={<EditBerita />} />
            <Route path="tambah-berita" element={<TambahBerita />} />
            {/* pengguna */}
            <Route path="pengguna" element={<Pengguna />} />
            <Route path="tambah-pengguna" element={<TambahPengguna />} />
            <Route path="edit-pengguna/:id" element={<EditPengguna />} />
            {/* riwayat */}
            <Route path="riwayat" element={<Riwayat />} />
            {/* informasi desa */}
            <Route path="informasi-desa" element={<InformasiDesa />} />
            {/* struktur organisasi */}
            <Route path="struktur-organisasi" element={<CardSlider />} />
            <Route path="tambah-staff" element={<TambahStaf />} />
            <Route path="edit-staff/:id" element={<EditStaff />} />
            <Route path="alamat-kantor" element={<AlamatKantor />} />
            <Route path="lokasi-desa" element={<LokasiDesa />} />
            <Route path="tentang-desa" element={<TentangDesa />} />
            {/* potensi ekonomi */}
            <Route path="potensi-ekonomi" element={<PotensiEkonomi />} />
            <Route path="potensi-ekonomi/produk-unggulan" element={<Produk />} />
            <Route path="potensi-ekonomi/produk-unggulan/tambah" element={<TambahProduk />} />
            <Route path="potensi-ekonomi/produk-unggulan/edit/:id" element={<EditProduk />} />
            {/* statistik */}
            <Route path="statistik" element={<Statistik />} />
            {/* data penduduk */}
            <Route path="statistik/penduduk" element={<DataPenduduk />} />
            <Route path="statistik/tambah-penduduk" element={<EntriDataPenduduk />} />
            <Route path="statistik/edit-penduduk/:id" element={<EditDataPenduduk />} />
            <Route path="statistik/tambah-domisili" element={<TambahSls />} />
            <Route path="statistik/edit-domisili/:id" element={<EditDomisili />} />
            {/* data pendidikan */}
            <Route path="statistik/pendidikan" element={<DataPendidikan />} />
            <Route path="statistik/pendidikan/tambah" element={<TambahPendidikan />} />
            <Route path="statistik/pendidikan/edit/:id" element={<EditPendidikan />} />
            {/* pernikahan */}
            <Route path="statistik/pernikahan" element={<DataPernikahan />} />
            <Route path="statistik/pernikahan/tambah" element={<TambahPernikahan />} />
            <Route path="statistik/pernikahan/edit/:id" element={<EditPernikahan />} />
            {/* agama */}
            <Route path="statistik/agama" element={<DataAgama />} />
            <Route path="statistik/agama/tambah" element={<TambahAgama />} />
            <Route path="statistik/agama/edit/:id" element={<EditAgama />} />
            {/* data umur */}
            <Route path="statistik/umur" element={<DataUmurPenduduk />} />
            <Route path="statistik/umur/tambah" element={<TambahDataUmur />} />
            <Route path="statistik/umur/edit/:id" element={<EditDataUmur />} />
            {/* data pekerjaan */}
            <Route path="statistik/pekerjaan" element={<DataPekerjaan />} />
            <Route path="statistik/pekerjaan/tambah" element={<TambahDataPekerjaan />} />
            <Route path="statistik/pekerjaan/edit/:id" element={<EditDataPekerjaan />} />
            {/* sarana olahraga */}
            <Route path="statistik/sarana-olahraga" element={<SaranaOlahraga />} />
            <Route path="statistik/sarana-olahraga/tambah" element={<TambahSaranaOlahraga />} />
            <Route path="statistik/sarana-olahraga/edit/:id" element={<EditSaranaOlahraga />} />
            {/* sarana kesehatan */}
            <Route path="statistik/sarana-kesehatan" element={<SaranaKesehatan />} />
            <Route path="statistik/sarana-kesehatan/tambah" element={<TambahSaranaKesehatan />} />
            <Route path="statistik/sarana-kesehatan/edit/:id" element={<EditSaranaKesetahan />} />
            {/* sarana keagamaan */}
            <Route path="statistik/sarana-keagamaan" element={<SaranaKeagamaan />} />
            <Route path="statistik/sarana-keagamaan/tambah" element={<TambahSaranaKeagamaan />} />
            <Route path="statistik/sarana-keagamaan/edit/:id" element={<EditSaranaKeagamaan />} />
            {/* sarana pendidikan */}
            <Route path="statistik/sarana-pendidikan" element={<SaranaPendidikan />} />
            <Route path="statistik/sarana-pendidikan/tambah" element={<TambahSaranaPendidikan />} />
            <Route path="statistik/sarana-pendidikan/edit/:id" element={<EditSaranaPendidikan />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
