const supabase = require("../supabaseClient");

exports.getAll = async (req, res) => {
  try {
    const { data, error } = await supabase.from("berita").select("*").order("id_berita", { ascending: false });

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error("Gagal mengambil data berita:", error.message);
    res.status(500).json({ error: "Gagal mengambil data berita" });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("berita")
    .select("*")
    .eq("id_berita", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const newData = req.body;
  const { data, error } = await req.supabase
    .from("berita")
    .insert([newData])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.update = async (req, res) => {
 const id = req.params.id;
  const { judul_berita, isi_berita, penulis_berita, gambar_berita } = req.body;

  try {
    const { data, error } = await supabase
      .from("berita")
      .update({
        judul_berita,
        isi_berita,
        penulis_berita,
        gambar_berita,
      })
      .eq("id_berita", id);

    if (error) {
      console.error("Gagal update berita:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Berita berhasil diperbarui", data });
  } catch (err) {
    console.error("Kesalahan server:", err.message);
    res.status(500).json({ error: "Kesalahan server saat update berita" });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("berita")
    .delete()
    .eq("id_berita", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};

exports.tambahBerita = async (req, res) => {
  const { penulis_berita, judul_berita, isi_berita, gambar_berita } = req.body;

  const { error } = await supabase.from("berita").insert([
    {
      penulis_berita,
      judul_berita,
      isi_berita,
      gambar_berita,
    },
  ]);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Gagal menambahkan berita" });
  }

  res.json({ message: "Berita berhasil ditambahkan" });
};