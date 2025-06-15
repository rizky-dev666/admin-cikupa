const supabase = require("../supabaseClient");

exports.getAll = async (req, res) => {
  const { data, error } = await req.supabase
    .from("data_penduduk")
    .select("*, sls(*)"); 
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};
exports.getAllDomisili = async (req, res) => {
  const { data, error } = await req.supabase
    .from("domisili")
    .select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("data_penduduk")
    .select("*")
    .eq("id_data_penduduk", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};
exports.getByIdDomisili = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("domisili")
    .select("*")
    .eq("id_domisili", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const newData = req.body;
  const { data, error } = await req.supabase
    .from("data_penduduk")
    .insert([newData])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
exports.createDomisili = async (req, res) => {
  const newData = req.body;
  const { data, error } = await req.supabase
    .from("domisili")
    .insert([newData])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await req.supabase
    .from("data_penduduk")
    .update(updatedData)
    .eq("id_data_penduduk", id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
exports.updateDomisili = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await req.supabase
    .from("domisili")
    .update(updatedData)
    .eq("id_domisili", id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("data_penduduk")
    .delete()
    .eq("id_data_penduduk", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};

exports.removeDomisili = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("domisili")
    .delete()
    .eq("id_domisili", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};
