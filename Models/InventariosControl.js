const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const InventariosControl = sequelize.define('InventariosControl',
    {
        IdInventario:{
            type : DataTypes.BIGINT(11),
            primaryKey: true,
            unique: true,
            allowNull: false ,
            references: {
                model: 'Inventarios',
                key: 'Id'
            }          
        },
        PersonaRealiza: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        }
    },{
        timestamps: false
    });
    return InventariosControl;
}