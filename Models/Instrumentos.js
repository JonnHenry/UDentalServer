const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Instrumentos = sequelize.define('Instrumentos',
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
        Observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        Estado:{
            type: DataTypes.ENUM('Obsoleto', 'Buen Estado'), //Estados que puede tener un producto
            allowNull: true
        }
    },{
        timestamps: false
    });
    return Instrumentos;
}