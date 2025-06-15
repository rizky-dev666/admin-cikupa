const supabase = require("../supabaseClient");

exports.getAll = async (req, res) => {
  const { data, error } = await req.supabase
    .from("lokasi_desa")
    .select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("lokasi_desa")
    .select("*")
    .eq("id_lokasi", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const newData = req.body;
  const { data, error } = await req.supabase
    .from("lokasi_desa")
    .insert([newData])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const { data, error } = await req.supabase
    .from("lokasi_desa")
    .update(updatedData)
    .eq("id_lokasi", id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("lokasi_desa")
    .delete()
    .eq("id_lokasi", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};
