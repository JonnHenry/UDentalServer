//TODO: Se borro el campo duración se debe de inicializar la base de datos de nuevo 

const DataTypes = require('sequelize/lib/data-types');

/*
id,
nombre,
precio,
descripcion,
fecha_creacion,
fecha_actualizacion



*/


module.exports = function (sequelize) {
    const Tratamientos = sequelize.define('tratamientos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activo:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
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