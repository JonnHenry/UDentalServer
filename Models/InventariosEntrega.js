const DataTypes = require('sequelize/lib/data-types');


module.exports = function (sequelize) {
    const InventariosEntrega = sequelize.define('inventario_entregas', {
        id_inventario: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'inventarios',
                key: 'id'
            }
        },
        id_producto: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        fecha: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            primaryKey: true
        },
        persona_entrega: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        },
        persona_recibe: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        },
        cantidad:{
            type: DataTypes.BIGINT,
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
        modelName: 'inventario_entregas',
        timestamps: false
    });
    return InventariosEntrega;
}