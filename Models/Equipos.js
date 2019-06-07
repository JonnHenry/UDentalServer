const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Equipos = sequelize.define('Equipos',
    {
        IdProducto:{
            type : DataTypes.BIGINT,
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
            allowNull: false,
            defaultValue: "No especificada"
        },
        Observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        Estado:{
            type: DataTypes.ENUM('Obsoleto', 'Buen Estado','Reparación'), //Estados que puede tener un producto
            allowNull: true
        }
    },{
        timestamps: false
    });
    return Equipos;
}