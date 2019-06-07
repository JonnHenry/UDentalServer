const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Equipos = sequelize.define('Equipos',
    {
        IdProducto:{
            type : DataTypes.BIGINT(11),
            primaryKey: true,
            unique: true,
            allowNull: false,
            references: {
                model: 'Productos',
                key: 'Id'
            }         
        },
        Marca: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "No especificada"
        },
        Observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        Estado:{
            type: DataTypes.ENUM('Obsoleto', 'Buen Estado','Reparación'), //Estados que puede tener un producto
            allowNull: true,
            defaultValue: false
        }
    },{
        timestamps: false
    });
    return Equipos;
}