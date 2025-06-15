const supabase = require("../supabaseClient");

exports.getAll = async (req, res) => {
  const { data, error } = await req.supabase.from("produk").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("produk")
    .select("*")
    .eq("id_produk", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await req.supabase
    .from("produk")
    .update(updatedData)
    .eq("id_produk", id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("produk")
    .delete()
    .eq("id_produk", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};

exports.tambahproduk = async (req, res) => {
  const {
    nama_produk,
    deskripsi_produk,
    no_tlp,
    harga,
    gambar_produk,
  } = req.body;

  try {
    

    const { data, error } = await supabase.from("produk").insert([
      {
        nama_produk,
        deskripsi_produk,
        no_tlp,
        harga,
        gambar_produk,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ message: "PRoduk berhasil ditambahkan", data });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan produk",
      error: error.message,
    });
  }
};