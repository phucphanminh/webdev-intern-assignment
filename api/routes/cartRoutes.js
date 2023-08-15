const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Định tuyến lấy tất cả các mục
router.get('/get-all-items', cartController.getAllItems);

// Định tuyến thêm một mục mới
router.post('/add-item', cartController.addItem);

// Định tuyến cập nhật số lượng (count) của một mục
router.put('/update-count', cartController.updateCount);

// Định tuyến xóa một mục
router.delete('/delete-item/:itemId', cartController.deleteItem);

// Xuất đối tượng router
module.exports = router;
