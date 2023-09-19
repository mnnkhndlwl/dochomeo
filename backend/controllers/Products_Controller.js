const Products_Schema = require("../modals/Products");
const Brands_Schema = require("../modals/Brands");
const product_status = require("../utils/configs/product_status");
const Utils = require("../utils/Utils");

// Add a review to a product
const addReview = async (req, res) => {
  const { productId } = req.params;
  const { jwt } = req.cookies;

  try {
    if (!jwt) {
      return res.send({ message: "Please login" });
    }

    const userId = await Utils.verifying_Jwt(jwt, process.env.JWT_TOKEN_SECRET);
    const { desc, rating,username } = req.body;

    const product = await Products_Schema.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newReview = {
      userID: userId?.id,
      username: username || "user",
      desc,
      rating,
    };

    product.review.push(newReview);
    await product.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a review from a product
const deleteReview = async (req, res) => {
  const { productId, reviewId } = req.params;

  try {
    const product = await Products_Schema.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const reviewIndex = product.review.findIndex(
      (review) => review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ error: "Review not found" });
    }

    product.review.splice(reviewIndex, 1);
    await product.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Edit a review for a product
const editReview = async (req, res) => {
  const { productId, reviewId, desc } = req.body;

  try {
    const product = await Products_Schema.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const review = product.review.id(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    review.desc = desc;
   // review.rating = rating;

    await product.save();

    res.status(200).json({ message: "Review edited successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create new product

const createProducts = async (req, res) => {
  try {
    // const checkExisting = await Products_Schema.findOne({product_code:req.body.product_code})
    // if(checkExisting.length > 0 ){
    //     return res.status(203).send({status:false,message:'product code already exists !!'})

    // }
    const getProductsCount = await Products_Schema.find().count();
    console.log("prod_00" + (getProductsCount + 1));
    const productCustomId = "prod_00" + (getProductsCount + 1);
    const create = new Products_Schema({
      product_id: productCustomId,
      product_name: req.body.product_name?.toLowerCase(),
      product_slug: req.body.product_name?.toLowerCase(),
      product_code: req.body.product_code,
      product_regular_price: req.body.product_regular_price,
      product_sale_price: req.body.product_sale_price,
      quantity: req.body.product_quantity,
      original_quantity: req.body.product_quantity,
      product_images: req.body.product_images,
      product_brand: req.body.product_brand,
      product_main_category: req.body.product_main_category?.toLowerCase(),
      product_main_category_slug: req.body.product_main_category?.toLowerCase(),
      product_category: req.body.product_category?.toLowerCase(),
      product_category_slug: req.body.product_category?.toLowerCase(),
      product_subcategory: req.body.product_subcategory?.toLowerCase(),
      product_subcategory_slug: req.body.product_subcategory?.toLowerCase(),
      new_arrival: req.body?.new_arrival,
      cartoon_total_products: req.body?.cartoon_total_products,
      color: req.body?.color?.toLowerCase(),
      size: req.body?.size?.toLowerCase(),
      product_tag: req.body?.product_tag?.toLowerCase(),
      product_description: req.body.product_description?.toLowerCase(),
      product_variant: req.body.product_variant?.toLowerCase(),
    });
    const result = await create.save();
    // res.status(200).send(result)
    res
      .status(200)
      .send({ status: true, message: "product created successfully !" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong !!");
  }
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const getProductsCount = await Products_Schema.find({}).count();
    const categoryForFilter = await Brands_Schema.aggregate([
      { $group: { _id: "$main_category_name" } },
    ]);
    const all_category_for_filter = await Brands_Schema.find({});
    const allProducts = await Products_Schema.find({}).sort({ createdAt: -1 });
    // console.log(allProducts);
    res.status(200).send({
      allProducts: allProducts,
      getProductsCount: getProductsCount,
      getAllProductStatus: product_status,
      categoryForFilter: categoryForFilter,
      all_category_for_filter: all_category_for_filter,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong !!");
  }
};

// get product by id
const getproductById = async (req, res) => {
  const productId = req.params.product_id;
  try {
    if (!productId) {
      return res
        .status(404)
        .send({ status: false, message: "product not found !!" });
    }
    const findProductById = await Products_Schema.findById(productId);
    if (!findProductById) {
      return res
        .status(404)
        .send({ status: false, message: "product not found !!" });
    }
    // console.log(findProductById);
    res.status(200).send(findProductById);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong !!");
  }
};

// edit products
const editProduct = async (req, res) => {
  const productId = req.params.product_id;
  // console.log("productId=>", productId);
  // console.log(req.body);
  try {
    if (!productId) {
      return res.status(404).send("Not Found !!");
    }
    const updateProduct = await Products_Schema.findByIdAndUpdate(productId, {
      $set: req.body,
    });
    if (!updateProduct) {
      return res.status(404).send("product not found !!");
    }
    res.status(200).send(updateProduct);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong !!");
  }
};

// SEARCH IN PRODUCTS
const searchProducts = async (req, res) => {
  const searchValue = req.query.search;
  console.log(searchValue);
  const searchRegex = Utils.createRegex(searchValue);
  let result;
  try {
    result = await Products_Schema.find({
      product_name: { $regex: searchRegex },
    }).sort({ createdAt: -1 });
    if (!result.length > 0) {
      result = await Products_Schema.find({
        product_code: { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }
    if (!result.length > 0) {
      result = await Products_Schema.find({
        product_brand: { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }
    if (!result.length > 0) {
      result = await Products_Schema.find({
        product_main_category: { $regex: searchRegex },
      }).sort({ createdAt: -1 });
    }

    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong !!");
  }
};

// Filter for products table
const filterProducts = async (req, res) => {
  const { by_status, date_from, date_to, by_category, by_product_status } =
    req.query;
  let result;
  console.log("by_status,date_from,date_to", by_status, date_from, date_to);
  try {
    const endDate = new Date(`${date_to}`);
    // seconds * minutes * hours * milliseconds = 1 day
    const dayTime = 60 * 60 * 24 * 1000;
    let increaseEndDateByOne = new Date(endDate.getTime() + dayTime);
    // console.log("INCREASED DATE",increaseEndDateByOne)

    // filter users by todays date and by their status
    let user_status;
    if (date_from && date_to && by_category) {
      if (by_category != "all") {
        result = await Products_Schema.aggregate([
          {
            $match: {
              product_main_category: by_category,
              createdAt: {
                $lte: Utils.convertDate(increaseEndDateByOne),
                $gte: Utils.convertDate(date_from),
              },
            },
          },
        ]).sort({ createdAt: -1 });
        return res.status(200).send(result);
      }
    } else {
      result = await Products_Schema.find({
        product_main_category: by_category,
      }).sort({ createdAt: -1 });
      // return res.status(200).send(result)
    }

    if (date_from && date_to) {
      result = await Products_Schema.aggregate([
        {
          $match: {
            createdAt: {
              $lte: Utils.convertDate(increaseEndDateByOne),
              $gte: Utils.convertDate(date_from),
            },
          },
        },
      ]).sort({ createdAt: -1 });
      console.log("RESULT NEW----", result);
      return res.status(200).send(result);
    }

    if (by_category != "all") {
      result = await Products_Schema.find({
        product_main_category: by_category,
      }).sort({ createdAt: -1 });
      return res.status(200).send(result);
    }
    if (by_product_status != "all") {
      console.log(by_product_status);
      result = await Products_Schema.find({
        product_status: by_product_status,
      }).sort({ createdAt: -1 });
      return res.status(200).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(200).send("Somthing went wrong !!");
  }
};

// By Shashikant

// Filter for products table
const multiCategory = async (req, res) => {
  try {
    const { category } = req.body;

    if (category.length <= 0) {
      const findResult = await Products_Schema.find({}).sort({ createdAt: -1 });
      return res.status(200).send({
        allProducts: findResult,
      });
    }

    // console.log(category);

    const findResult = await Products_Schema.find({
      product_main_category: category,
    });

    // console.log(findResult);

    return res.status(200).send({
      allProducts: findResult,
    });
  } catch (err) {
    console.log(err);
    res.status(200).send("Somthing went wrong !!");
  }
};

// delete products
const deleteProducts = async (req, res) => {
  // console.log("body=>",req.body)
  // console.log("body=>",req.body?.length)
  try {
    if (req.body?.length) {
      const deleteSelected = await Products_Schema.deleteMany({
        _id: {
          $in: req.body,
        },
      });
      if (!deleteSelected) {
        return res
          .status(200)
          .send({ message: "product delete failed", status: false });
      }
      return res
        .status(200)
        .send({ message: "product delete success", status: true });
    }

    res.status(200).send({ message: "product delete failed", status: false });
  } catch (err) {
    console.log(err);
    res.status(200).send({ message: "product delete failed", status: false });
  }
};

//  delete product image
const deleteProductImage = async (req, res) => {
  const productId = req.params.product_id;
  const productImageName = req.params.product_image;
  console.log("request=>", productId, productImageName);
  try {
    if (!productId) {
      return res
        .status(404)
        .send({ status: false, message: "product not found !!" });
    }
    const findProduct = await Products_Schema.findById(productId).select(
      "product_images"
    );
    console.log(findProduct);
    let result = findProduct;
    console.log("result=>", result);
    const filteredProductsImages = await result?.product_images?.filter(
      (value, index) => value.image_name !== productImageName
    );
    console.log("result----->", result);
    const updateProductImage = await Products_Schema.findByIdAndUpdate(
      productId,
      { $set: { product_images: filteredProductsImages } }
    );
    console.log("updated products=>", updateProductImage);
    res
      .status(200)
      .send({ status: true, message: "product image deleted successfully !!" });
  } catch (err) {
    console.log(err);
    res.status(200).send({ status: false, message: "image delete failed !!" });
  }
};

// set  new arrivals products
const setNewArrivalProducts = async (req, res) => {
  // console.log("body=>",req.body)
  // console.log("body=>",req.body?.data)
  try {
    if (req.body?.data?.length) {
      const updateSelected = await Products_Schema.updateMany(
        { _id: { $in: req.body.data } },
        { $set: { new_arrival: true } },
        { multi: true }
      );
      if (!updateSelected) {
        return res.status(200).send({
          message: "product set as new arrival failed",
          status: false,
        });
      }
      return res
        .status(200)
        .send({ message: "product set as new arrival success", status: true });
    }
    res
      .status(200)
      .send({ message: "product set as new arrival failed", status: false });
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .send({ message: "product set as new arrival failed", status: false });
  }
};

// Remove new arrivals products
const removeNewArrivalProducts = async (req, res) => {
  // console.log("body=>",req.body)
  // console.log("body=>",req.body?.data)
  try {
    if (req.body?.data?.length) {
      const updateSelected = await Products_Schema.updateMany(
        { _id: { $in: req.body.data } },
        { $set: { new_arrival: false } },
        { multi: true }
      );
      if (!updateSelected) {
        return res.status(200).send({
          message: "product remove as new arrival failed",
          status: false,
        });
      }
      return res.status(200).send({
        message: "product remove as new arrival success",
        status: true,
      });
    }
    res
      .status(200)
      .send({ message: "product remove as new arrival failed", status: false });
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .send({ message: "product remove as new arrival failed", status: false });
  }
};

// set trending products
const setTrendingProducts = async (req, res) => {
  try {
    if (req.body?.data?.length) {
      const updateSelected = await Products_Schema.updateMany(
        { _id: { $in: req.body.data } },
        { $set: { trending_product: true } },
        { multi: true }
      );
      if (!updateSelected) {
        return res.status(200).send({
          message: "product set as trending product failed",
          status: false,
        });
      }
      return res.status(200).send({
        message: "product set as trending product success",
        status: true,
      });
    }
    res.status(200).send({
      message: "product set as trending product failed",
      status: false,
    });
  } catch (err) {
    console.log(err);
    res.status(200).send({
      message: "product set as trending product failed",
      status: false,
    });
  }
};

// Remove trending products
const removeTrendingProducts = async (req, res) => {
  try {
    if (req.body?.data?.length) {
      const updateSelected = await Products_Schema.updateMany(
        { _id: { $in: req.body.data } },
        { $set: { trending_product: false } },
        { multi: true }
      );
      if (!updateSelected) {
        return res.status(200).send({
          message: "product remove as trending product failed",
          status: false,
        });
      }
      return res.status(200).send({
        message: "product remove as trending product success",
        status: true,
      });
    }
    res.status(200).send({
      message: "product remove as trending product failed",
      status: false,
    });
  } catch (err) {
    console.log(err);
    res.status(200).send({
      message: "product remove as trending product failed",
      status: false,
    });
  }
};

exports.createProducts = createProducts;
exports.multiCategory = multiCategory;
exports.getAllProducts = getAllProducts;
exports.getproductById = getproductById;
exports.editProduct = editProduct;
exports.deleteProducts = deleteProducts;
exports.searchProducts = searchProducts;
exports.filterProducts = filterProducts;
exports.deleteProductImage = deleteProductImage;
exports.setNewArrivalProducts = setNewArrivalProducts;
exports.removeNewArrivalProducts = removeNewArrivalProducts;
exports.setTrendingProducts = setTrendingProducts;
exports.removeTrendingProducts = removeTrendingProducts;
exports.addReview = addReview;
exports.deleteReview = deleteReview;
exports.editReview = editReview;
