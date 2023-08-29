const express = require("express");
const router = express.Router();
const equ = require("../controllers/WholeSaleEnquiry_Controller");

router.post('/wholesaleEnquiry', equ.addWholeSaleEnquiry);
router.get("/wholesaleEnquires/", equ.getWholeSaleEnquiries);
router.get("/search/wholesale", equ.searchWholeSaleEnquiry);

module.exports = router;