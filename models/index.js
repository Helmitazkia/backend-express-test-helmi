const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Merchant = require('./merchant')(sequelize, DataTypes);
db.Product = require('./product')(sequelize, DataTypes);
db.Customer = require('./customer')(sequelize, DataTypes);
db.Transaction = require('./transaction')(sequelize, DataTypes);

// Define Relationships
db.Merchant.hasMany(db.Product);
db.Product.belongsTo(db.Merchant);

db.Customer.hasMany(db.Transaction);
db.Transaction.belongsTo(db.Customer);

db.Product.hasMany(db.Transaction);
db.Transaction.belongsTo(db.Product);

module.exports = db;