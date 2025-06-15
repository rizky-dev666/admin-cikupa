const supabase = require("../supabaseClient");

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("informasi_desa")
    .select("*")
    .eq("id_informasi_desa", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const { data, error } = await req.supabase
    .from("informasi_desa")
    .update(updatedData)
    .eq("id_informasi_desa", id)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
