const PropertyModel = require("../models/propertyModel");

const getAllProperties = async (req, res) => {
  const getProperties = async () => {
    const properties = await PropertyModel.find();
    return properties;
  };
  getProperties().then((properties) => res.json({ properties }));
};

const addProperty = async (req, res) => {
  const { Address, Suburb, City, Price, Bedrooms } = req.body;
  try {
    const property = await PropertyModel.create({
      Address,
      Suburb,
      City,
      Price,
      Bedrooms,
    });
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllProperties, addProperty };
