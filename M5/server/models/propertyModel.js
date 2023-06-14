const mongoose = require("mongoose");
const { Schema } = mongoose;

const propertySchema = new Schema({
  id: { type: Number, required: true },
  Address: { type: String, required: true },
  Suburb: { type: String, required: true },
  City: { type: String, required: true },
  Price: { type: Number, required: true },
  Bedrooms: { type: Number, required: true },
});

const PropertyModel = mongoose.model("Property", propertySchema);

module.exports = PropertyModel;
