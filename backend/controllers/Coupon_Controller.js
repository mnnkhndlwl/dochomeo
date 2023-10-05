const Coupon = require('../modals/Coupon');
const Utils = require("../utils/Utils");

// Add a new coupon
exports.addCoupon = async (req, res) => {
  console.log(req.body);
  try {
    const coupon = new Coupon({
      title: req.body?.title,
      description: req.body?.description ,
      discountValue: req.body?.discountValue,
      discountType: req.body?.discountType,
      expiryDate: req.body?.expiryDate
    });
    await coupon.save();
    res.status(201).json({ message: 'Coupon added successfully', coupon });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// SEARCH IN Coupons
exports.searchCoupons = async (req, res) => {
  const searchValue = req.query.search;
  console.log(searchValue);
  const searchRegex = Utils.createRegex(searchValue);
  let result;
  try {
    result = await Coupon.find({
      title: { $regex: searchRegex },
    }).sort({ createdAt: -1 });
    if (!result.length > 0) {
      result = await Coupon.find({
        discountType : { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }
    if (!result.length > 0) {
      result = await Coupon.find({
        discountValue: { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }
    if (!result.length > 0) {
      result = await Coupon.find({
        expiryDate: { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }

    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong !!");
  }
};

// Delete a coupon by its ID
exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndRemove(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon deleted successfully', coupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a coupon by its ID
exports.updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon updated successfully', coupon });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a coupon by its title
exports.getCouponByTitle = async (req, res) => {
  console.log(req.params.title);
  try {
    const coupon = await Coupon.findOne({ title: req.params.title });
    console.log(coupon);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Check if the coupon has expired
    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

   // console.log(coupon);

    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all coupons
exports.getAllCoupons = async (req, res) => {
    try {
      const coupons = await Coupon.find();
  
      // // Filter out expired coupons
      // const validCoupons = coupons.filter(coupon => coupon.expiryDate >= new Date());
  
      res.status(200).json({ coupons: coupons });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };  

// Get a coupon by its total percentage or amount of discount
exports.getCouponByDiscount = async (req, res) => {
  try {
    const { discountType, discountValue } = req.query;
    const query = {
      discountType,
      discountValue,
    };

    const coupons = await Coupon.find(query);

    if (coupons.length === 0) {
      return res.status(404).json({ message: 'No coupons found with the specified discount' });
    }

    // Filter out expired coupons
    const validCoupons = coupons.filter(coupon => coupon.expiryDate >= new Date());

    res.status(200).json({ coupons: validCoupons });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


