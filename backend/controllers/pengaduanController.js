const supabase = require("../supabaseClient");

exports.getAll = async (req, res) => {
  const { data, error } = await req.supabase
    .from("pengaduan")
    .select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from("pengaduan")
    .select("*")
    .eq("id_pengaduan", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.create = async (req, res) => {
  const newData = req.body;
  const { data, error } = await req.supabase
    .from("pengaduan")
    .insert([newData])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const { data, error } = await req.supabase
    .from("pengaduan")
    .update(updatedData)
    .eq("id_pengaduan", id)
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  const { error } = await req.supabase
    .from("pengaduan")
    .delete()
    .eq("id_pengaduan", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Deleted successfully" });
};


exports.getMessages = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pengaduan')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('pengaduan')
      .select('*')
      .eq('id_pengaduan', id)
      .single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  const { id_pengaduan } = req.params;

  try {
    const { data, error } = await supabase
      .from('pengaduan')
      .update({ is_read: true })
      .eq('id_pengaduan', id_pengaduan);

    if (error) throw error;

    res.status(200).json({ message: 'Message marked as read', data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message status', details: error.message });
  }
};