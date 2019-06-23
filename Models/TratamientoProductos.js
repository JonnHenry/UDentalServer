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
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        id_producto: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'productos',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
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