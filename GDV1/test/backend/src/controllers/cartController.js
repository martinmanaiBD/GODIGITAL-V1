const sequelize = require('../sequelize');
const CartItem = sequelize.models.CartItem;

exports.addToCart = async (req, res) => {
  const { name, qty, price, imgUrl } = req.body;
  const userId = req.user.id;

  try {
    const newItem = await CartItem.create({
      name,
      qty,
      price,
      imgUrl,
      userId,
    });

    res.status(201).json({ message: 'Item added to cart', item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateCartItem = async (req, res) => {
  const itemId = req.params.itemId;
  const { name, qty, price, imgUrl } = req.body;

  try {
    let item = await CartItem.findOne({
      where: { id: itemId, userId: req.user.id },
    });

    if (!item) {
      // If the item does not exist, create a new cart item
      item = await CartItem.create({
        name,
        qty,
        price,
        imgUrl,
        userId: req.user.id,
      });

      return res.status(201).json({ message: 'New item added to cart', item });
    }

    await item.update({
      name,
      qty,
      price,
      imgUrl,
    });

    res.status(200).json({ message: 'Item updated', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.removeFromCart = async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const item = await CartItem.findOne({
      where: { id: itemId, userId: req.user.id },
    });

    if (!item) {
      // If the item does not exist, return a 404 error
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.destroy();

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.fetchCartItems = async (req, res) => {
  try {
    const items = await CartItem.findAll({ where: { userId: req.user.id } });

    res.status(200).json({ message: 'Cart items fetched', items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
