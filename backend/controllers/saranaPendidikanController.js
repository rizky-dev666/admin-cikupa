exports.getAll = async (req, res) => {
  const { data, error } = await req.supabase
    .from("sarana_pendidikan")
    .select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("sarana_pendidikan")
    .select("*")
    .eq("id_sarana_pendidikan", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const newData = req.body;
  const { data, error } = await req.supabase
    .from("sarana_pendidikan")
    .insert([newData])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await req.supabase
    .from("sarana_pendidikan")
    .update(updatedData)
    .eq("id_sarana_pendidikan", id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("sarana_pendidikan")
    .delete()
    .eq("id_sarana_pendidikan", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};
