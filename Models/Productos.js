const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const Productos = sequelize.define('productos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Ninguna',
            onUpdate: 'CASCADE'
        },
        precio_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
            onUpdate: 'CASCADE'
        },
        fecha_creacion: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        fecha_actualizacion: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
            onUpdate: true
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['nombre', 'fecha_creacion']
            },
            {
                unique: false,
                fields: ['nombre', 'fecha_actualizacion']
            }
        ],
        modelName: 'productos',
        timestamps: false
    });
    return Productos;
}