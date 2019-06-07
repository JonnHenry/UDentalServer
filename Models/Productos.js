const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Productos = sequelize.define('Productos',
    {
        Id:{
            type : DataTypes.BIGINT(11),
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
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
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
            allowNull: true,
            defaultValue: 0
        }
    },{
        timestamps: false
    });
    return Productos;
}