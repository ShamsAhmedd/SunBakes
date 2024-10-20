const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken");
const Cart = require("../models/cart");
const { Product } = require("../models/product");
const asyncHandler = require("express-async-handler");

const calculateTotalPrice = async (cart) => {
    let totalPrice = 0;
    for (const item of cart.products) {
        const product = await Product.findById(item.productId);
        if (product && product.price && item.quantity) {
            totalPrice += (product.price * item.quantity);
        }
    }
    return totalPrice || 0;
};

router.post("/", verifyToken, asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1; 
        } else {
            cart.products.push({ productId, quantity: 1 });
        }
    } else {
        cart = new Cart({
            userId,
            products: [{ productId, quantity: 1 }],
            totalPrice: 0 
        });
    }

    cart.totalPrice = await calculateTotalPrice(cart);

    await cart.save();
    return res.status(200).json({
        status: "success",
        message: "Product added to cart",
        numberOfItemInCart: cart.products.length,
        cart
    });
}));

router.put("/:id", verifyToken, asyncHandler(async (req, res) => {
    const { count } = req.body; 
    const userId = req.user.id;
    const productId = req.params.id;

    if (!count || count < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex > -1) {
        cart.products[productIndex].quantity = count; // Update quantity

        cart.totalPrice = await calculateTotalPrice(cart);
        
        await cart.save();
        return res.status(200).json({ message: "Cart updated", cart });
    } else {
        return res.status(404).json({ message: "Product not found in cart" });
    }
}));

 router.get("/", verifyToken, asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({
        status: "success",
        cart
    });
}));

router.get("/all", asyncHandler(async (req, res) => {
    const carts = await Cart.find()
        .populate({
            path: 'products.productId',
            select: 'title' 
        })
        .populate({
            path: 'userId',
            select: 'email' 
        });

    if (!carts || carts.length === 0) {
        return res.status(404).json({ message: "No carts found" });
    }

    const formattedCarts = carts.map(cart => ({
        email: cart.userId.email,
        products: cart.products.map(p => ({
            title: p.productId.title,
            quantity: p.quantity
        })),
        totalPrice: cart.totalPrice
    }));

    return res.status(200).json({
        status: "success",
        carts: formattedCarts 
    });
}));

router.delete("/:id", verifyToken, asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);

    cart.totalPrice = await calculateTotalPrice(cart);
    cart.updatedAt = Date.now();
    await cart.save();

    return res.status(200).json({
        status: "success",
        message: "Product removed from cart",
        numberOfItemInCart: cart.products.length,
        cart
    });
}));

router.delete("/", verifyToken, asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = [];
    cart.totalPrice = 0; 
    await cart.save();

    return res.status(200).json({
        status: "success",
        message: "Cart cleared",
        numberOfItemInCart: cart.products.length,
        cart
    });
}));

module.exports = router;
