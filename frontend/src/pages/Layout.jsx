import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-gray-800 bg-gray-200 rounded-lg"
      : "text-gray-500";

  useEffect(() => {
    axios
      .get("/api/auth/user", {
        withCredentials: true,
      })
      .then((res) => {
        const userData = res.data;
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <div>
      <div>
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
        />

        <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex items-center justify-between z-50 px-4">
          <button className="lg:hidden text-3xl" onClick={toggleSidebar}>
            <FiMenu />
          </button>
          <div className="text-xl font-semibold hidden md:block">
            Desa Cikupa
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span>{user.nama_pengguna || user.email}</span>
                <img
                  src={
                    user.foto_pengguna ||
                    "https://ativysenubpjviwimbrd.supabase.co/storage/v1/object/public/desacikupa/strukturorganisasi/pp%20kosong%20wa%20default.jpg"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Skeleton height={20} width={120} />
                <Skeleton circle height={40} width={40} />
              </div>
            )}
          </div>
        </div>

        <div
          className={`fixed top-16 left-0 lg:left-0 h-full lg:w-56 w-64 bg-white shadow-md z-40 lg:translate-x-0 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
            <ul className="flex flex-col py-4">
              <li>
                <Link
                  to="/"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx bx-home"></i>
                  </span>
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/banner"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/banner"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx bx-carousel"></i>
                  </span>
                  <span className="text-sm font-medium">Banner</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/pengguna"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/pengguna"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx bx-user"></i>
                  </span>
                  <span className="text-sm font-medium">Pengguna</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/statistik"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/statistik"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx bx-category"></i>
                  </span>
                  <span className="text-sm font-medium">Statistik</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/potensi-ekonomi"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/potensi-ekonomi"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx bx-line-chart"></i>
                  </span>
                  <span className="text-sm font-medium">Potensi Ekonomi</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/galeri"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/galeri"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx  bx-photo-album"></i>
                  </span>
                  <span className="text-sm font-medium">Galeri</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/berita"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/berita"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx  bx-news"></i>
                  </span>
                  <span className="text-sm font-medium">Berita</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/inbox"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/inbox"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx  bx-chat"></i>
                  </span>
                  <span className="text-sm font-medium">Pengaduan</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/riwayat"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/riwayat"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx bx-history"></i>
                  </span>
                  <span className="text-sm font-medium">Riwayat</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/informasi-desa"
                  className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 ${isActive(
                    "/informasi-desa"
                  )}`}
                >
                  <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                    <i className="bx bx-store-alt"></i>
                  </span>
                  <span className="text-sm font-medium">Informasi Desa</span>
                </Link>
              </li>
              <li
                onClick={handleLogout}
                className={`flex mb-14 cursor-pointer text-gray-500 flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 `}
              >
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="text-sm font-medium ">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="lg:ml-56 ml-0 pt-16 px-4 bg-slate-100 min-h-screen pb-4 mt-5">
        <div className="bg-white min-h-screen rounded-lg border-2 p-4 border-gray-100 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
