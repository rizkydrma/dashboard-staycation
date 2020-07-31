const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bankSchema = new schema({
  bankName: {
    type: String,
    required: true,
  },
  nomorRekening: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Bank", bankSchema);
