const sequelize = require('../sequelize');
const User = sequelize.models.User;
const Business = sequelize.models.Business;

exports.createBusiness = async (req, res) => {
  console.log("Request headers:", req.headers);
  console.log("Request file:", req.file);
  const { userId, companyName, businessAddress, averageRevenue, businessNature, registrationNumber, franchiseStatus, franchiseNumber } = req.body;

  // Get the document path from the uploaded file
  const documentPath = req.file ? req.file.path : null;

  try {
    const user = await User.findByPk(userId);
    console.log('user', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const business = await Business.create({
      userId,
      companyName,
      businessAddress,
      averageRevenue,
      businessNature,
      registrationNumber,
      franchiseStatus,
      franchiseNumber,
      documentPath,
    });

    res.status(201).json({ message: 'Business created successfully', business });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBusiness = async (req, res) => {
  console.log("Request headers:", req.headers);
  //add console.log(req.body) to see what is being sent from the front end
  console.log('createBusiness request received');
  console.log('Request body:', req.body);
  const { id } = req.params;
  const { companyName, businessAddress, averageRevenue, businessNature, registrationNumber, franchiseStatus, franchiseNumber } = req.body;

  // Get the document path from the uploaded file (if any)
  const documentPath = req.file ? req.file.path : null;

  try {
    const business = await Business.findByPk(id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    business.companyName = companyName;
    business.businessAddress = businessAddress;
    business.averageRevenue = averageRevenue;
    business.businessNature = businessNature;
    business.registrationNumber = registrationNumber;
    business.franchiseStatus = franchiseStatus;
    business.franchiseNumber = franchiseNumber;
    
    // Update the document path only if a new file is uploaded
    if (documentPath) {
      business.documentPath = documentPath;
    }

    await business.save();

    res.status(200).json({ message: 'Business updated successfully', business });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBusiness = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: { model: Business, as: 'business' },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Business retrieved successfully', business: user.business });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
