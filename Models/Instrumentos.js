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
        Observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        Stock : {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        Estado:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        }
    },{
        timestamps: false
    });
    return Instrumentos;
}