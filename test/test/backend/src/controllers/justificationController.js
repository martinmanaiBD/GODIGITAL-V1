const sequelize = require('../sequelize');
const CartItem = sequelize.models.CartItem;

exports.addJustificationToCartItem = async (req, res) => {
  const itemId = req.params.itemId;
  const { justification } = req.body;
  const userId = req.user.id;

  try {
    const item = await CartItem.findOne({
      where: { id: itemId, userId: req.user.id },
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.update({
      justification,
    });

    res.status(200).json({ message: 'Justification added to cart item', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getJustificationFromCartItem = async (req, res) => {
  const itemId = req.params.itemId;
  const userId = req.user.id;

  try {
    const item = await CartItem.findOne({
      where: { id: itemId, userId: req.user.id },
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ justification: item.justification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};