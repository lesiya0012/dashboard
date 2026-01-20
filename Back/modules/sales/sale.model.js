
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  saleName: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Lost', 'Sold', 'Stalled'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'EUR' },
  stage: {
    label: { type: String, required: true },
    percentage: { type: Number, min: 0, max: 100 }
  },
  saleDate: { type: Date, default: Date.now },
  nextActivityDate: { type: Date },
  owner: { type: String },
  contact: { type: String },
  saleType: { type: String },
  company: { type: String },
  activities: [{ type: String }],
  stakeholders: [{ type: String }]
}, { timestamps: true });




module.exports = mongoose.model('Sale', saleSchema);