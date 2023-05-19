const express = require('express');
const addressController = require('../controllers/addressController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware)

router.post('/', authMiddleware, addressController.createAddress);
router.put('/:id', authMiddleware, addressController.updateAddress);
router.get('/:userId', authMiddleware, addressController.getAddress);

module.exports = router;
