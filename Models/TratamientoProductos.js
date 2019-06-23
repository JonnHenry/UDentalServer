const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const Productos = sequelize.define('tratamiento_productos', {
        id_tratamiento: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        id_producto: {
            type: DataTypes.STRING,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        cantidad_producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        modelName: 'tratamiento_productos',
        timestamps: false
    });
    return Productos;
}