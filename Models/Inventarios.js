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
        observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['nombre']
            }
        ],
        modelName: 'inventarios',
        timestamps: false
    });
    return Inventarios;
}