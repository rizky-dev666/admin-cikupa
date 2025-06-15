import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TentangDesa = () => {
  const [formData, setFormData] = useState({
    nama_desa: "",
    tlp_desa: "",
    email_desa: "",
    kepala_desa: "",
    visi_desa: "",
    misi_desa: "",
    prakata_kades: "",
    sejarah_desa: "",
    logo_desa: "",
  });
  const [staffList, setStaffList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const desaId = "273174c3-fdd6-450e-a1bd-ebfe052d5aae";

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          "/api/struktur-organisasi"
        );
        setStaffList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data staff:", error);
      }
    };

    fetchStaff();
  }, []);

  useEffect(() => {
    const fetchAlamat = async () => {
      try {
        const response = await axios.get(
          `/api/desa/${desaId}`
        );
        const data = response.data;
        setFormData({
          nama_desa: data.nama_desa,
          tlp_desa: data.tlp_desa,
          email_desa: data.email_desa,
          kepala_desa: data.kepala_desa,
          visi_desa: data.visi_desa,
          misi_desa: data.misi_desa,
          prakata_kades: data.prakata_kades,
          sejarah_desa: data.sejarah_desa,
          logo_desa: data.logo_desa,
        });
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchAlamat();
  }, []);

  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      let logoUrl = formData.logo_desa;
      if (formData.logo_desa) {
        const formDataUpload = new FormData();
        formDataUpload.append("logo", formData.logo_desa);

        const uploadRes = await axios.post(
          "/api/upload/logo",
          formDataUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        logoUrl = uploadRes.data.url;
      }

      await axios.put(`/api/desa/${desaId}`, {
        ...formData,
        logo_desa: logoUrl,
      });

      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Informasi desa berhasil diperbarui.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Gagal memperbarui data. Silakan coba lagi.",
        confirmButtonColor: "#d33",
        confirmButtonText: "Tutup",
      });
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">Informasi Desa</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-6 gap-6">
            {["nama_desa", "tlp_desa", "email_desa"].map((field) => (
              <div key={field} className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 block mb-2">
                  {field.replace("_", " ").toUpperCase()}
                </label>
                <input
                  type={field === "tlp_desa" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  required
                />
              </div>
            ))}

            <div className="col-span-6 sm:col-span-3">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                KEPALA DESA
              </label>
              <select
                name="kepala_desa"
                value={formData.kepala_desa}
                onChange={handleChange}
                disabled={!isEditing}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                required
              >
                <option value="">Pilih Kepala Desa</option>
                {staffList.map((staff) => (
                  <option
                    key={staff.id_struktur_organisasi}
                    value={staff.id_struktur_organisasi}
                  >
                    {staff.nama_staff}
                  </option>
                ))}
              </select>
            </div>

            {["visi_desa", "misi_desa", "prakata_kades", "sejarah_desa"].map(
              (field) => (
                <div key={field} className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 block mb-2">
                    {field.replace("_", " ").toUpperCase()}
                  </label>
                  <textarea
                    type="text"
                    name={field}
                    rows="6"
                    value={formData[field]}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                    required
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label className="text-sm font-medium text-gray-900 block mb-2">
            LOGO DESA
          </label>

          {(logoPreview || formData.logo_desa) && (
            <img
              src={logoPreview || formData.logo_desa}
              alt="Logo Desa"
              className="w-24 h-24 mb-2 object-contain border rounded"
            />
          )}

          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData((prev) => ({
                    ...prev,
                    logo_desa: file,
                  }));
                  setLogoPreview(URL.createObjectURL(file));
                }
              }}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          )}
        </div>

        <div className="p-6 border-t border-gray-200 rounded-b">
          <button
            type="submit"
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isEditing ? "Simpan" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TentangDesa;
