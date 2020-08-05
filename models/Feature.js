const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { ObjectId } = schema;

const featureSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  itemId: {
    type: ObjectId,
    ref: "Item",
  },
});

module.exports = mongoose.model("Feature", featureSchema);
