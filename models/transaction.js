module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        shippingFee: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        finalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false
    });
    return Transaction;
};