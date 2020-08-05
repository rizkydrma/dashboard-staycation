const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { ObjectId } = schema;

const activitySchema = new schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  itemId: {
    type: ObjectId,
    ref: "Item",
  },
});

module.exports = mongoose.model("Activity", activitySchema);
