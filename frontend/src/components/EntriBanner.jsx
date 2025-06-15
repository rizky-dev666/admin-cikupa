import { useState } from "react";
import axios from "axios";

const EntriBanner = () => {
  const [isiBanner, setIsiBanner] = useState("");
  const [gambarBanner, setGambarBanner] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setGambarBanner(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gambarBanner) {
      alert("Harap pilih gambar banner");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("gambar_banner", gambarBanner);
    formData.append("isi_banner", isiBanner);

    try {
      const res = await axios.post("/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Banner berhasil diupload");
      setIsiBanner("");
      setGambarBanner(null);
      setPreview(null);
      console.log("Response:", res.data);
    } catch (error) {
      console.error(
        "Error upload banner:",
        error.response?.data || error.message
      );
      alert("Gagal upload banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto" }}>
      <h2>Upload Banner</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        {preview && (
          <div style={{ margin: "10px 0" }}>
            <img
              src={preview}
              alt="Preview Banner"
              style={{ maxWidth: "100%" }}
            />
          </div>
        )}
        <textarea
          placeholder="Isi banner"
          value={isiBanner}
          onChange={(e) => setIsiBanner(e.target.value)}
          required
          rows={4}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Mengupload..." : "Upload Banner"}
        </button>
      </form>
    </div>
  );
};
export default EntriBanner;
