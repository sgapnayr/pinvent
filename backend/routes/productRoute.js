const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { upload } = require('../utils/fileUpload')
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/productController')

router.post("/", upload.single("image"), createProduct)
router.patch("/:id", upload.single("image"), updateProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.delete("/:id", deleteProduct)

module.exports = router