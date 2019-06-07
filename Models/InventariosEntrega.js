const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const InventariosEntrega = sequelize.define('InventariosEntrega',
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
        PersonaEntrega: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        },
        PersonaRecibe: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        }
    },{
        timestamps: false
    });
    return InventariosEntrega;
}