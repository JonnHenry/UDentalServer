const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const Inventarios = sequelize.define('inventarios', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        fecha_creacion: {
            type: 'TIMESTAMP'
        },
        fecha_actualizacion: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['fecha_creacion','nombre']
            }
        ],
        updatedAt: 'fecha_creacion',
        createdAt: 'fecha_actualizacion',
        modelName: 'inventarios',
        timestamps: false
    });
    return Inventarios;
}