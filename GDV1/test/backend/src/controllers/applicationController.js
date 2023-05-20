const sequelize = require('../sequelize');
const Application = sequelize.models.Application;

exports.createApplication = async (req, res) => {
  const userId = req.user.id;
  const { total } = req.body instanceof FormData
    ? Object.fromEntries(req.body.entries())
    : req.body;
  
  try {
    const newApplication = await Application.create({
      userId,
      total,
      status: 'pending',
    });

    res.status(201).json({ message: 'Application created', application: newApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();

    res.status(200).json({ message: 'Applications fetched', applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getApplicationByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    const applications = await Application.findAll({
      where: {
        userId: userId
      }
    });

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this user' });
    }

    res.status(200).json({ message: 'Applications fetched', applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  try {
    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await application.update({ status });

    res.status(200).json({ message: 'Application status updated', application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteApplication = async (req, res) => {
  const id = req.params.id;

  try {
    const application = await Application.findByPk(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await application.destroy();

    res.status(200).json({ message: 'Application deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
