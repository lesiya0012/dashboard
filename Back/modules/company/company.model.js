const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
  address: String,
  country: String,
  phones:{
      number: { type: String, required: true },
      label: { type: String, default: "Main" }
    },
  email: String,
  website: String,
  category: String,
  code: String,
  number: String,
  vatNo: String,
  business: String,
  updated: {
    date: { type: Date, default: Date.now },
    by: { type: String } 
  }
});

module.exports = mongoose.model("Company", companySchema);