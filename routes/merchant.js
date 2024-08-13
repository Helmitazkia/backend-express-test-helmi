const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');

module.exports = (app) => {
    // Register Merchant
    app.post('/merchant/register', async (req, res) => {
        try {
            const {
                name,
                email,
                password
            } = req.body;
            const hashedPassword = await bcrypt.hash(password, 8);
            const merchant = await db.Merchant.create({
                name,
                email,
                password: hashedPassword
            });
            const token = jwt.sign({
                id: merchant.id
            }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });
            res.json({
                merchant,
                token
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    // Login Merchant
    app.post('/merchant/login', async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body;
            const merchant = await db.Merchant.findOne({
                where: {
                    email
                }
            });
            if (!merchant || !(await bcrypt.compare(password, merchant.password))) {
                return res.status(401).json({
                    error: 'Invalid email or password'
                });
            }
            const token = jwt.sign({
                id: merchant.id
            }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });
            res.json({
                merchant,
                token
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    // Create Product
    app.post('/merchant/products', async (req, res) => {
        try {
            const {
                name,
                price
            } = req.body;
            const token = req.headers['authorization'].split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const product = await db.Product.create({
                name,
                price,
                MerchantId: decoded.id
            });
            res.json(product);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    // List Products
    app.get('/merchant/products', async (req, res) => {
        try {
            const products = await db.Product.findAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    //Merchant dapat melihat customer siapa saja yang membeli
    app.get('/merchant/customers', async (req, res) => {
        try {
            // Ambil token dari header Authorization
            const token = req.headers['authorization'].split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Cari semua transaksi yang terkait dengan produk milik merchant yang sedang login
            const transactions = await db.Transaction.findAll({
                include: [{
                        model: db.Customer,
                        attributes: ['id', 'name', 'email']
                    },
                    {
                        model: db.Product,
                        where: {
                            MerchantId: decoded.id
                        },
                        attributes: []
                    }
                ],
                attributes: [
                    [db.Sequelize.fn('DISTINCT', db.Sequelize.col('Customer.id')), 'CustomerId'],
                    'Customer.name',
                    'Customer.email'
                ],
                raw: true
            });

            // Ambil hanya customer yang unik (distinct)
            const customers = transactions.map(transaction => ({
                id: transaction.CustomerId,
                name: transaction.name,
                email: transaction.email
            }));

            res.json(customers);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    //Create Product
    app.post('/merchant/products', async (req, res) => {
        try {
            const {
                name,
                price
            } = req.body;
            const token = req.headers['authorization'].split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const product = await db.Product.create({
                name,
                price,
                MerchantId: decoded.id
            });

            res.json(product);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    //Update Product
    app.put('/merchant/products/:id', async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const {
                name,
                price
            } = req.body;
            const token = req.headers['authorization'].split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const product = await db.Product.findOne({
                where: {
                    id,
                    MerchantId: decoded.id
                }
            });

            if (!product) {
                return res.status(404).json({
                    error: 'Product not found'
                });
            }

            product.name = name;
            product.price = price;
            await product.save();

            res.json(product);
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });

    //Delete Product
    app.delete('/merchant/products/:id', async (req, res) => {
        try {
            const {
                id
            } = req.params;
            const token = req.headers['authorization'].split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const product = await db.Product.findOne({
                where: {
                    id,
                    MerchantId: decoded.id
                }
            });

            if (!product) {
                return res.status(404).json({
                    error: 'Product not found'
                });
            }

            await product.destroy();
            res.json({
                message: 'Product deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                error: error.message
            });
        }
    });




};