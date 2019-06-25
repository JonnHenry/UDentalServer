const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const Tratamientos = sequelize.define('tratamientos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        duracion_dias: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onUpdate: 'CASCADE',
            defaultValue: 1
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
            onUpdate: 'CASCADE'
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
        },
        fecha_creacion: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        fecha_actualizacion: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }
    }, {
        indexes: [{
            unique: false,
            fields: ['nombre']
        }],
        updatedAt: 'fecha_actualizacion',
        createdAt: 'fecha_creacion',
        modelName: 'tratamientos',
        timestamps: false
    });
    return Tratamientos;
}