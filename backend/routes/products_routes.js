const express = require("express")
const router = express.Router()
const Product_Controllers = require("../controllers/Products_Controller")

// all products routes 
router.get("/all/products",Product_Controllers.getAllProducts);
router.get("/get/single/product/:product_id",Product_Controllers.getproductById);
router.get("/filter/products",Product_Controllers.filterProducts);
router.post("/filter/products/multi_category",Product_Controllers.multiCategory);
router.get("/search/in/products",Product_Controllers.searchProducts);
router.patch("/edit/product/:product_id",Product_Controllers.editProduct);
router.patch("/remove/product/image/:product_id/:product_image",Product_Controllers.deleteProductImage);
router.patch("/set/products/as/new/arrivals",Product_Controllers.setNewArrivalProducts);
router.patch("/remove/products/as/new/arrivals",Product_Controllers.removeNewArrivalProducts);
router.patch("/set/products/as/trending/products",Product_Controllers.setTrendingProducts);
router.patch("/remove/products/as/trending/products",Product_Controllers.removeTrendingProducts);
router.post("/add/new/product",Product_Controllers.createProducts);
router.delete("/delete/product",Product_Controllers.deleteProducts);


module.exports = router