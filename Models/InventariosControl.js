const DataTypes = require('sequelize/lib/data-types');

//TODO: Ver como crear una clave primaria compuesta

module.exports = function(sequelize){
    const InventariosControl = sequelize.define('inventarios_control',
    {
        id_inventario:{
            type : DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false ,
            references: {
                model: 'inventarios',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
            }          
        },
        persona_realiza: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        }
    },{
        indexes: [{
            unique: false,
            fields: ['persona_realiza']
        }],
        modelName: 'inventarios_control',
        timestamps: false
    });
    return InventariosControl;
}