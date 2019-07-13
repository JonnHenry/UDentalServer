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
            type: DataTypes.ENUM('Equipo', 'Insumo', 'Instrumento'),
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        activo:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
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
                fields: ['fecha_creacion','nombre']
            }
        ],
        updatedAt: 'fecha_actualizacion',
        createdAt: 'fecha_creacion',
        modelName: 'productos',
        timestamps: false
    });
    return Productos;
}