const mongoose = require("mongoose");
const schema = mongoose.Schema;

const imageSchema = new schema({
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);
