const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bankSchema = new schema({
  nameBank: {
    type: String,
    required: true,
  },
  nomorRekening: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Bank", bankSchema);
