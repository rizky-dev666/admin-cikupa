exports.getAll = async (req, res) => {
  const { data, error } = await req.supabase
    .from("data_pendidikan")
    .select("*, sls(*)"); 

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await req.supabase
    .from("data_pendidikan")
    .select("*")
    .eq("id_data_pendidikan", id)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const newData = req.body;
  const { data, error } = await req.supabase
    .from("data_pendidikan")
    .insert([newData])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const { data, error } = await req.supabase
    .from("data_pendidikan")
    .update(updatedData)
    .eq("id_data_pendidikan", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  const { error } = await req.supabase
    .from("data_pendidikan")
    .delete()
    .eq("id_data_pendidikan", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};
