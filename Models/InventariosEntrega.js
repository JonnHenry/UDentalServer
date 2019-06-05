const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const InventariosEntrega = sequelize.define('InventariosEntrega',
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
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        },
        PersonaRecibe: {
            type: DataTypes.STRING, //Es la cedula para poder identificar a la persona
            allowNull: false
        },
        Categoria: {
            type: DataTypes.ENUM('Equipos', 'Instrumentos','Insumos'),
            allowNull: false,
            validate: {
                notEmpty: { msg: "El campo no puede ser vacio" }
            }
        },
        Cantidad: {
            type: DataTypes.INTEGER, //Es la cedula para poder identificar a la persona
            allowNull: false
        }
    },{
        timestamps: false
    });
    return InventariosEntrega;
}