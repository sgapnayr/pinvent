const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const { fileSizeFormatter } = require('../utils/fileUpload')

const createProduct = asyncHandler(async (req, res) => {
    const { Name, Sku, Category, Quantity, Price, Description } = req.body;

    //   Validation
    if (!Name || !Category || !Quantity || !Price || !Description) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    let fileData = {};
    if (req.file) {
        fileData = {
            fileName: req.file.originalname,
            filePath: req.file.filePath,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
    }

    const product = await Product.create({
        user: req.user.id,
        Name,
        Sku,
        Category,
        Quantity,
        Price,
        Description,
        image: fileData,
    });

    res.status(201).json(product);
});


module.exports = { createProduct }