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
            unique: true,
            fields: ['nombre']
        }],
        modelName: 'tratamientos',
        timestamps: false
    });
    return Tratamientos;
}