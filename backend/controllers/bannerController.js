const supabase = require("../supabaseClient");

exports.getAll = async (req, res) => {
  const { data, error } = await req.supabase.from("banner").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("banner")
    .select("*")
    .eq("id_banner", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await req.supabase
    .from("banner")
    .update(updatedData)
    .eq("id_banner", id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("banner")
    .delete()
    .eq("id_banner", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};

exports.tambahBanner = async (req, res) => {
  const { isi_banner, gambar_banner } = req.body;

  try {
    const { data, error } = await supabase.from("banner").insert([
      {
        isi_banner,
        gambar_banner,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ message: "Pengguna berhasil ditambahkan", data });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan pengguna",
      error: error.message,
    });
  }
};
