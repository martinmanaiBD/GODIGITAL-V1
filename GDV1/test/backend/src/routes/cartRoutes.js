const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const justificationController = require('../controllers/justificationController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', authMiddleware, cartController.addToCart);
router.put('/:itemId', authMiddleware, cartController.updateCartItem);
router.delete('/:itemId', authMiddleware, cartController.removeFromCart);
router.get('/', authMiddleware, cartController.fetchCartItems);
router.put('/:itemId/justification', authMiddleware, justificationController.addJustificationToCartItem);
router.get('/:itemId/justification', authMiddleware, justificationController.getJustificationFromCartItem);

module.exports = router;
