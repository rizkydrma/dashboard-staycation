const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { ObjectId } = schema;

const categorySchema = new schema({
  name: {
    type: String,
    required: true,
  },
  itemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
