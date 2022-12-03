const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { upload } = require('../utils/fileUpload')
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/productController')

router.post("/", protect, upload.single("image"), createProduct)
router.patch("/:id", protect, upload.single("image"), updateProduct)
router.get("/", protect, getProducts)
router.get("/:id", protect, getProduct)
router.delete("/:id", protect, deleteProduct)

module.exports = router