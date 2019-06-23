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
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "No especificada"
        },
        observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        estado: {
            type: DataTypes.ENUM('Obsoleto', 'Buen Estado', 'Reparación'),
            allowNull: false,
            defaultValue: 'Buen Estado'
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['marca']
            },
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