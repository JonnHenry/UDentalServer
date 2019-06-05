const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Instrumentos = sequelize.define('Instrumentos',
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
        Cantidad : {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        Estado:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        FechaAdquisicion: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },{
        timestamps: true
    });
    return Instrumentos;
}