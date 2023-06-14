const Application = require("../models/applicationModel");

const getAllApplications = async (req, res) => {
  const applications = await Application.find({}).sort({ createdAt: -1 });
  res.status(200).json(applications);
};

const createApplication = async (req, res) => {
  const { name, number, email, message } = req.body;
  try {
    const application = await Application.create({
      name,
      number,
      email,
      message,
    });
    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
};
