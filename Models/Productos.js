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
            onUpdate: 'CASCADE'
        },
        categoria:{
            type: DataTypes.STRING,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        fecha_creacion: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        fecha_actualizacion: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            onUpdate: true,
            allowNull: false
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['fecha_creacion']
            },
            {
                unique: false,
                fields: ['fecha_actualizacion']
            },
            {
                unique: false,
                fields: ['nombre']
            }
        ],
        updatedAt: 'fecha_actualizacion',
        createdAt: 'fecha_creacion',
        modelName: 'productos',
        timestamps: false
    });
    return Productos;
}