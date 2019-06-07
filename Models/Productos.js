const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Productos = sequelize.define('Productos',
    {
        Id:{
            type : DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
            onUpdate: 'CASCADE'         
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        Descripcion:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Ninguna',
            onUpdate: 'CASCADE'
        },
        PrecioUnitario:{
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
            onUpdate: 'CASCADE'
        },
        Stock : {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        Activo: {
            type:  DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true 
        }
    },{
        timestamps: true
    });
    return Productos;
}