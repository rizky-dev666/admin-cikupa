const bcrypt = require("bcrypt");
const supabase = require("../supabaseClient");

exports.addUser = async (req, res) => {
  const {
    email_pengguna,
    nama_pengguna,
    password,
    level_pengguna,
    foto_pengguna,
  } = req.body;

  try {
    const { data: existing } = await supabase
      .from("pengguna")
      .select("*")
      .eq("email_pengguna", email_pengguna)
      .single();

    if (existing) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase.from("pengguna").insert([
      {
        email_pengguna,
        nama_pengguna,
        password: hashedPassword,
        level_pengguna,
        foto_pengguna,
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

exports.penggunaId = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("pengguna")
      .select(
        "id_pengguna, email_pengguna, nama_pengguna, level_pengguna, foto_pengguna"
      )
      .eq("id_pengguna", id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPengguna = async (req, res) => {
  const { data, error } = await req.supabase
    .from("pengguna")
    .select("*"); 
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.updateLevelPengguna = async (req, res) => {
  const { id } = req.params;
  const { level_pengguna } = req.body;

  const { error } = await supabase
    .from("pengguna")
    .update({ level_pengguna })
    .eq("id_pengguna", id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: "Level pengguna berhasil diperbarui." });
};

exports.hapusPengguna = async (req, res) => {
  const id = req.params.id;

  try {
    const { error } = await supabase
      .from("pengguna")
      .delete()
      .eq("id_pengguna", id);

    if (error) {
      console.error("Gagal hapus pengguna:", error);
      return res.status(500).json({ message: "Gagal menghapus pengguna" });
    }

    res.json({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    console.error("Error server:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.updatePengguna = async (req, res) => {
  const { id } = req.params;
  const {
    email_pengguna,
    nama_pengguna,
    password,
    level_pengguna,
    foto_pengguna,
  } = req.body;

  try {
    const updateData = {
      email_pengguna,
      nama_pengguna,
      level_pengguna,
      foto_pengguna,
    };

    if (password && password.trim() !== "") {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updateData.password = hashedPassword;
    }

    const { data, error } = await supabase
      .from("pengguna")
      .update(updateData)
      .eq("id_pengguna", id);

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
