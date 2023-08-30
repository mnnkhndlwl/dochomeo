const mongoose = require("mongoose");

const wholeSaleEnquirySchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WholeSaleEnquiry", wholeSaleEnquirySchema);
