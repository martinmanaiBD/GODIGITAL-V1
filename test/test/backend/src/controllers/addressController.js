const sequelize = require('../sequelize');
const User = sequelize.models.User;
const Address = sequelize.models.Address;

exports.createAddress = async (req, res) => {
  const { userId, fullAddress, district, postcode, state } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = await Address.create({
      fullAddress,
      district,
      postcode,
      state,
      userId,
    });

    res.status(201).json({ message: 'Address created successfully', address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAddress = async (req, res) => {
  const { id, fullAddress, district, postcode, state } = req.body;

  try {
    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    address.fullAddress = fullAddress;
    address.district = district;
    address.postcode = postcode;
    address.state = state;

    await address.save();

    res.status(200).json({ message: 'Address updated successfully', address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAddress = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: { model: Address, as: 'address' }, // Update this line
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Address retrieved successfully', address: user.address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

