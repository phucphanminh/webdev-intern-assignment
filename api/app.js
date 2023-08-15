const express = require('express');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');

const app = express();

// Kết nối với cơ sở dữ liệu PostgreSQL
const ssl = { rejectUnauthorized: false };
const connectionString = "postgres://pmp:iqzIILYhcnXGzq26JzZcIq7XTjLT8B2v@dpg-cjds04gq339s73f3v16g-a.singapore-postgres.render.com/goldensneaker?ssl=true";
const db = pgp(connectionString);

app.use(bodyParser.json());

// Tạo schema và bảng
app.get('/create-schema-and-table', (req, res) => {
  db.connect()
    .then(obj => {
      return obj.none(`
        CREATE SCHEMA IF NOT EXISTS goldensneaker;
        SET search_path TO goldensneaker;
        CREATE TABLE IF NOT EXISTS items (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255),
          description TEXT,
          color VARCHAR(7),
          price DECIMAL(10, 2),
          image TEXT,
          inCart BOOLEAN,
          count INT
        );
      `);
    })
    .then(() => {
      console.log('Schema and table created');
      res.send('Schema and table created');
    })
    .catch(error => {
      console.error('Error connecting to database:', error);
      res.status(500).send('Error connecting to database');
    });
});

// Thêm một mục mới vào bảng items
app.post('/add-item', (req, res) => {
  const newItem = req.body;
  db.none(`
    INSERT INTO items (name, description, color, price, image, inCart, count)
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `, [
    newItem.name,
    newItem.description,
    newItem.color,
    newItem.price,
    newItem.image,
    newItem.inCart,
    newItem.count
  ])
    .then(() => {
      console.log('Item added:', newItem);
      res.send('Item added');
    })
    .catch(error => {
      console.error('Error adding item:', error);
      res.status(500).send('Error adding item');
    });
});

// Cập nhật số lượng (count) của một mục trong bảng items
app.put('/update-count/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const newCount = req.body.count;
  db.none(`
    UPDATE items
    SET count = $1
    WHERE id = $2;
  `, [newCount, itemId])
    .then(() => {
      console.log('Item count updated:', itemId, newCount);
      res.send('Item count updated');
    })
    .catch(error => {
      console.error('Error updating item count:', error);
      res.status(500).send('Error updating item count');
    });
});

// Xóa một mục khỏi bảng items
app.delete('/delete-item/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  db.none(`
    DELETE FROM items
    WHERE id = $1;
  `, [itemId])
    .then(() => {
      console.log('Item deleted:', itemId);
      res.send('Item deleted');
    })
    .catch(error => {
      console.error('Error deleting item:', error);
      res.status(500).send('Error deleting item');
    });
});

// Khởi động ứng dụng
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
