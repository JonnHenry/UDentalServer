const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Insumos = sequelize.define('Insumos',
    {
        Id: {
            type : DataTypes.BIGINT(11),
            primaryKey: true,
            unique: true,
            allowNull: false         
        },
        Observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        Stock : {
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
        timestamps: false
    });
    return Insumos;
}