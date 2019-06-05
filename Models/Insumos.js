const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Insumos = sequelize.define('Insumos',
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
            allowNull: false,
            defaultValue: 0
        },
        SolicitadosFrecuentemente : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        FechaAdquisicion: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        FechaCaducidad: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },{
        timestamps: true
    });
    return Insumos;
}