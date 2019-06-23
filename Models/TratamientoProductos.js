const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const TratamientosProductos = sequelize.define('tratamiento_productos', {
        id_tratamiento: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
            references: {
                model: 'tratamientos',
                key: 'id'
            }
        },
        id_producto: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        cantidad_producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        modelName: 'tratamiento_productos',
        timestamps: false
    });
    return TratamientosProductos;
}