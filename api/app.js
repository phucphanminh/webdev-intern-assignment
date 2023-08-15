const express = require('express');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const cartRouter = require('./routes/cartRoutes');
const cors = require('cors'); // Import thư viện cors

const app = express();

app.use(cors());
// Kết nối với cơ sở dữ liệu PostgreSQL
const ssl = { rejectUnauthorized: false };
const connectionString = "postgres://pmp:iqzIILYhcnXGzq26JzZcIq7XTjLT8B2v@dpg-cjds04gq339s73f3v16g-a.singapore-postgres.render.com:5432/goldensneaker?ssl=true";
const db = pgp(connectionString);

app.use(bodyParser.json());

app.use("/cart", cartRouter);

// // Khởi động ứng dụng
const port = 10000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
