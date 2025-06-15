const supabase = require("../supabaseClient");

exports.tambahStaff = async (req, res) => {
  const { nama_staff, jabatan, foto_staff } = req.body;

  try {
    const { data, error } = await supabase.from("struktur_organisasi").insert([
      {
        nama_staff,
        jabatan,
        foto_staff,
      },
    ]);

    if (error) throw error;

    res.status(201).json({ message: "staf berhasil ditambahkan", data });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menambahkan staf",
      error: error.message,
    });
  }
};

exports.tambahBagan = async function (req, res) {
  const { url } = req.body;

  if (!url)
    return res.status(400).json({ error: "URL gambar tidak ditemukan" });

  const { data, error } = await supabase
    .from("bagan")
    .insert([{ gambar_bagan: url }])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: "Gambar berhasil disimpan", data });
};

exports.getBagan = async (req, res) => {
  const { data, error } = await supabase
    .from("bagan")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getAll = async (req, res) => {
  const { data, error } = await req.supabase
    .from("struktur_organisasi")
    .select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("struktur_organisasi")
    .select("*")
    .eq("id_struktur_organisasi", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const newData = req.body;
  const { data, error } = await req.supabase
    .from("struktur_organisasi")
    .insert([newData])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await req.supabase
    .from("struktur_organisasi")
    .update(updatedData)
    .eq("id_struktur_organisasi", id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("bagan")
    .delete()
    .eq("id_bagan", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};

exports.hapusStaff = async (req, res) => {
  const id = req.params.id;

  try {
    const { error } = await supabase
      .from("struktur_organisasi")
      .delete()
      .eq("id_struktur_organisasi", id);

    if (error) {
      console.error("Gagal hapus staff:", error);
      return res.status(500).json({ message: "Gagal menghapus staff" });
    }

    res.json({ message: "staff berhasil dihapus" });
  } catch (error) {
    console.error("Error server:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.updateStaff = async (req, res) => {
  const { id } = req.params;
  const { nama_staff, jabatan, foto_staff } = req.body;

  try {
    const updateData = {
      nama_staff,
      jabatan,
      foto_staff,
    };
    const { data, error } = await supabase
      .from("struktur_organisasi")
      .update(updateData)
      .eq("id_struktur_organisasi", id);

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({ error: "Gagal memperbarui data pengguna" });
    }

    res.json({ message: "Data pengguna berhasil diperbarui", data });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};
