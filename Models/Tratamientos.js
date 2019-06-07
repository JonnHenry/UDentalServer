const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Tratamientos = sequelize.define('Tratamientos',
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
        Duracion:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'No definido',
            onUpdate: 'CASCADE'
        },
        Precio:{
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
            onUpdate: 'CASCADE'
        },
        Descripcion : {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 0
        }
    },{
        timestamps: false
    });
    return Tratamientos;
}