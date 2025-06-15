const supabase = require("../supabaseClient");

exports.getAll = async (req, res) => {
  const { data, error } = await req.supabase.from("galeri_desa").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("galeri_desa")
    .select("*")
    .eq("id_galeri", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const newData = req.body;
  const { data, error } = await req.supabase
    .from("galeri_desa")
    .insert([newData])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await req.supabase
    .from("galeri_desa")
    .update(updatedData)
    .eq("id_galeri", id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("galeri_desa")
    .delete()
    .eq("id_galeri", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};

exports.tambahGaleri = async function (req, res) {
  const { url, caption } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL tidak ditemukan" });
  }

  const { data, error } = await supabase.from("galeri_desa").insert([
    {
      gambar_galeri: url,
      keterangan_gambar: caption || null,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Gambar dan caption berhasil disimpan", data });
};
