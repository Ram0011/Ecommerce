import fs from "fs";
import slugify from "slugify";
import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import categoryModel from "../models/categoryModel.js"; // Ensure correct import path

// Create product
export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;

        // Validations
        if (!name) return res.status(400).send({ error: "Name is required" });
        if (!description)
            return res.status(400).send({ error: "Description is required" });
        if (!price) return res.status(400).send({ error: "Price is required" });
        if (!category)
            return res.status(400).send({ error: "Category is required" });
        if (!quantity)
            return res.status(400).send({ error: "Quantity is required" });
        if (photo && photo.size > 1000000) {
            return res
                .status(400)
                .send({ error: "Photo should be less than 1MB" });
        }

        // Fetch the category document
        const categoryDoc = await categoryModel.findById(category); // Lookup by ID
        if (!categoryDoc) {
            return res.status(404).send({ error: "Category not found" });
        }

        // Create the product
        const newProduct = new productModel({
            ...req.fields,
            slug: slugify(name),
            category: categoryDoc._id, // Use the ObjectId of the category
        });

        // Handle photo if provided
        if (photo) {
            newProduct.photo.data = fs.readFileSync(photo.path);
            newProduct.photo.contentType = photo.type;
        }

        await newProduct.save();

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product: newProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while creating product",
            error,
        });
    }
};

// Get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate("category")
            .select("-photo")
            .limit(18)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "All Products",
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while getting products",
            error,
        });
    }
};

// Get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Get Single Product Successfully",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error,
        });
    }
};

// Get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel
            .findById(req.params.pid)
            .select("photo");
        if (product.photo.data) {
            res.set("Content-Type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};

// controllers/productController.js
export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel
            .findByIdAndDelete(req.params.id)
            .select("-photo");
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).send({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error with deleting product",
            error,
        });
    }
};

//update product
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;

        // Validations
        if (!name) return res.status(400).send({ error: "Name is required" });
        if (!description)
            return res.status(400).send({ error: "Description is required" });
        if (!price) return res.status(400).send({ error: "Price is required" });
        if (!category)
            return res.status(400).send({ error: "Category is required" });
        if (!quantity)
            return res.status(400).send({ error: "Quantity is required" });
        if (photo && photo.size > 1000000) {
            return res
                .status(400)
                .send({ error: "Photo should be less than 1MB" });
        }

        // Fetch the category document
        const categoryDoc = await categoryModel.findById(category);
        if (!categoryDoc) {
            return res.status(404).send({ error: "Category not found" });
        }

        // Update the product
        const updateData = {
            ...req.fields,
            slug: slugify(name),
            category: categoryDoc._id, // Use the ObjectId of the category
        };

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.pid,
            updateData,
            { new: true }
        );

        // Handle photo if provided
        if (photo) {
            updatedProduct.photo.data = fs.readFileSync(photo.path);
            updatedProduct.photo.contentType = photo.type;
        }

        await updatedProduct.save();

        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error while updating product",
            error,
        });
    }
};

//filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Products",
            error,
        });
    }
};

//product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

//product list
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Product List",
            error,
        });
    }
};

//search prouct
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in search Product api",
            error,
        });
    }
};

//category wise product
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel
            .find({ category })
            .populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting product category",
            error,
        });
    }
};

//payment controller
export const paymentController = async (req, res) => {
    try {
        const { cart } = req.body;
        let total = 0;
        cart.forEach((item) => {
            total += item.price;
        });
        const order = await new orderModel({
            products: cart.map((item) => item._id),
            payment: "cod",
            buyer: req.user._id,
            status: "Processing",
        }).save();
        // Check if order was saved successfully
        if (!order) {
            console.log("Failed to create order"); // Throw a specific error
        }

        res.status(200).send({
            success: true,
            message: "Order Placed Successfully",
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};
