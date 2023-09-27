const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

const adminCollection = mongoose.model("adminCollection", adminSchema);

module.exports = adminCollection;
