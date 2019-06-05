const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const InventariosControl = sequelize.define('InventariosControl',
    {
        Id:{
            type : DataTypes.BIGINT(11),
            primaryKey: true,
            unique: true,
            allowNull: false         
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "El campo no puede ser vacio" }
            } 
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        Fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        PersonaEntrega: {
            type: DataTypes.BIGINT(11), //Es la cedula para poder identificar a la persona
            allowNull: false
        },
        PersonaRecibe: {
            type: DataTypes.BIGINT(11), //Es la cedula para poder identificar a la persona
            allowNull: false
        }
    },{
        timestamps: true
    });
    return InventariosControl;
}