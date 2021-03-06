const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const Equipos = sequelize.define('equipos', {
        id_producto: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        },
        observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        estado: {
            type: DataTypes.ENUM('Dañado', 'Buen estado', 'Reparación'),
            allowNull: false,
            defaultValue: 'Buen estado'
        }
    },{ 
        indexes: [
            {
                unique: false,
                fields: ['estado']
            }
        ],
        modelName: 'equipos',
        timestamps: false
    });
    
    return Equipos;
}