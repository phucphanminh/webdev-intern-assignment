const db = require('../config'); 

const cartController = {};

cartController.getAllItems = async (req, res) => {
  try {
    const items = await db.query('SELECT * FROM items;');
    console.log('All items:', items.rows);
    return res.json(items.rows);
  } catch (error) {
    console.error('Error getting items:', error);
    res.status(500).json({ msg: "Error getting items", error: error.message });
  }
};

cartController.addItem = async (req, res) => {
  const { id, name, description, color, price, image, inCart, count } = req.body;
    console.log('Item added:', req.body);
  try {
    await db.query(`
      INSERT INTO items (id, name, description, color, price, image, inCart, count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `, [ id, name, description, color, price, image, inCart, count ]);
    return res.json({ msg: "Item added"});
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ msg: "Error adding item", error: error.message });
  }
};

cartController.updateCount = async (req, res) => {
  const { id, count } = req.body;
  try {
    await db.query(`
      UPDATE items
      SET count = $1
      WHERE id = $2;
    `, [count, id]);
    console.log('Item count updated:', id, count);
    return res.json({ msg: "Item count updated" });
  } catch (error) {
    console.error('Error updating item count:', error);
    res.status(500).json({ msg: "Error updating item count", error: error.message });
  }
};

cartController.deleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  try {
    await db.query(`
      DELETE FROM items
      WHERE id = $1;
    `, [itemId]);
    console.log('Item deleted:', itemId);
    return res.json({ msg: "Item deleted" });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ msg: "Error deleting item", error: error.message });
  }
};

// Xuất đối tượng controller
module.exports = cartController;
