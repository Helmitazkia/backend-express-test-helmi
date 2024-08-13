const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports = (app) => {
    // Register Customer
    app.post('/customer/register', async (req, res) => {
        try {
            const {
                name,
                email,
                password
            } = req.body;
            const hashedPassword = await bcrypt.hash(password, 8);
            const customer = await db.Customer.create({
                name,
                email,
                password: hashedPassword
            });
            const token = jwt.sign({
                id: customer.id
            }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });
            res.json({
                customer,
                token
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    // Login Customer
    app.post('/customer/login', async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;
            const customer = await db.Customer.findOne({
                where: {
                    email
                }
            });
            if (!customer || !(await bcrypt.compare(password, customer.password))) {
                return res.status(401).json({
                    error: 'Invalid email or password'
                });
            }
            const token = jwt.sign({
                id: customer.id
            }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });
            res.json({
                customer,
                token
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    // List Products
    app.get('/customer/products', async (req, res) => {
        try {
            const products = await db.Product.findAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    //Transaksi
    app.post('/customer/transaction', async (req, res) => {
        try {
            const {
                productId,
                quantity
            } = req.body;

            const token = req.headers['authorization'].split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const product = await db.Product.findOne({
                where: {
                    id: productId
                }
            });

            if (!product) {
                return res.status(404).json({
                    error: 'Product not found'
                });
            }

            const totalAmount = product.price * quantity;
            let shippingFee = 0;
            let discount = 0;

            if (totalAmount > 50000) {
                discount = totalAmount * 0.1; // Diskon 10%
            } else if (totalAmount > 15000) {
                shippingFee = 0; // Bebas ongkir
            }

            const finalAmount = totalAmount - discount + shippingFee;

            const transaction = await db.Transaction.create({
                totalAmount,
                discount,
                shippingFee,
                finalAmount,
                quantity,
                CustomerId: decoded.id,
                ProductId: product.id
            });

            res.json(transaction);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });


}