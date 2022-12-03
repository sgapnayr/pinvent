const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const { fileSizeFormatter } = require('../utils/fileUpload')
const cloudinary = require('cloudinary').v2

const createProduct = asyncHandler(async (req, res) => {
    const { Name, Sku, Category, Quantity, Price, Description } = req.body;

    //   Validation
    if (!Name || !Category || !Quantity || !Price || !Description) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    let fileData = {};
    if (req.file) {
        let uploadedFile

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, { folder: "Prestige App", resource_type: "image" })
        } catch (error) {
            res.status(500)
            throw new Error("Image Could Not Be Uploaded.")
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
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

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort("-createdAt")
    res.status(200).json(products)
})

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(404)
        throw new Error("Could Not Locate Product.")
    }

    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User Not Authorized.")
    }

    res.status(200).json(product)

})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
        res.status(404)
        throw new Error("Could Not Locate Product.")
    }

    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User Not Authorized.")
    }

    await product.remove()
    res.status(200).json({ message: "Product Deleted Successfully" })
})

const updateProduct = asyncHandler(async (req, res) => {
    const { Name, Category, Quantity, Price, Description } = req.body;

    const { id } = req.params

    const product = await Product.findById(id)

    if (!product) {
        res.status(404)
        throw new Error("Could Not Locate Product.")
    }

    if (product.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("User Not Authorized.")
    }

    let fileData = {};
    if (req.file) {
        let uploadedFile

        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, { folder: "Prestige App", resource_type: "image" })
        } catch (error) {
            res.status(500)
            throw new Error("Image Could Not Be Uploaded.")
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
            Name,
            Category,
            Quantity,
            Price,
            Description,
            image: Object.keys(fileData).length === 0 ? product?.image : fileData,
        },
        {
            new: true,
            runValidators: true
        }
    )

    res.status(201).json(updatedProduct);
})


module.exports = { createProduct, getProducts, getProduct, deleteProduct, updateProduct }