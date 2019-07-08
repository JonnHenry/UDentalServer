const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const InventariosProductos = sequelize.define('inventario_productos', {
        id_producto: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        id_inventario: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            references: {
                model: 'inventarios',
                key: 'id'
            }
        },
        cantidad: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        }
    }, {
        timestamps: false
    });
    return InventariosProductos;
}