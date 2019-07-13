const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const InventariosControl = sequelize.define('inventario_controles',
    {
        id_inventario:{
            type : DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false ,
            references: {
                model: 'inventarios',
                key: 'id'
            }          
        },
        persona_realiza: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        },
        fecha_creacion: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        indexes: [{
            unique: false,
            fields: ['persona_realiza']
        }],
        createdAt: 'fecha_creacion',
        modelName: 'inventario_controles',
        timestamps: false
    });
    return InventariosControl;
}