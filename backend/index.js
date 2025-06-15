require("dotenv").config();
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173','http://192.168.50.154:5173','http://192.168.56.1:5173'],
  credentials: true                
}));
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/uploadRoutes"));
app.use("/api", require("./routes/penggunaRoutes"));
app.use("/api", require("./routes/informasiDesaRoutes"));
app.use("/api", require("./routes/strukturOrganisasiRoutes"));
app.use("/api", require("./routes/bannerRoutes"));
app.use("/api", require("./routes/produkRoutes"));
app.use("/api", require("./routes/alamatKantorRoutes"));
app.use("/api", require("./routes/lokasiDesaRoutes"));
app.use("/api", require("./routes/tentangDesaRoutes"));
app.use("/api", require("./routes/galeriDesaRoutes"));
app.use("/api", require("./routes/beritaRoutes"));
app.use("/api", require("./routes/dataPendudukRoutes"));
app.use("/api", require("./routes/pengaduanRoutes"));
app.use("/api", require("./routes/dataAgamaRoutes"));
app.use("/api", require("./routes/dataPerkawinanRoutes"));
app.use("/api", require("./routes/dataPekerjaanRoutes"));
app.use("/api", require("./routes/dataUmurPendudukRoutes"));
app.use("/api", require("./routes/dataPendidikanRoutes"));
app.use("/api", require("./routes/saranaOlahragaRoutes"));
app.use("/api", require("./routes/saranaKesehatanRoutes"));
app.use("/api", require("./routes/saranaKeagamaanRoutes"));
app.use("/api", require("./routes/saranaPendidikanRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
