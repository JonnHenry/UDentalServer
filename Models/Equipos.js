const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Equipos = sequelize.define('Equipos',
    {
        Id:{
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
        Estado:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        Cantidad : {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    },{
        timestamps: false
    });
    return Equipos;
}