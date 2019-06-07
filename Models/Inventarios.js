const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Inventarios = sequelize.define('Inventarios',
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
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        }
    },{
        timestamps: false
    });
    return Inventarios;
}