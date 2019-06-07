const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Inventarios = sequelize.define('Inventarios',
    {
        Id:{
            type : DataTypes.BIGINT,
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
        }
    },{
        timestamps: true
    });
    return Inventarios;
}