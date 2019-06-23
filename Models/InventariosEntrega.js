const DataTypes = require('sequelize/lib/data-types');

//TODO: Ver como crear una clave primaria compuesta

module.exports = function (sequelize) {
    const InventariosEntrega = sequelize.define('inventarios_entrega', {
        id_inventario: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
            references: {
                model: 'inventarios',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        persona_entrega: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        },
        persona_recibe: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['persona_entrega']
            },
            {
                unique: false,
                fields: ['persona_recibe']
            }
        ],
        modelName: 'inventarios_entrega',
        timestamps: false
    });
    return InventariosEntrega;
}