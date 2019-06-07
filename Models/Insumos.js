const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Insumos = sequelize.define('Insumos',
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
        FechaCaducidad: {
            type: DataTypes.DATEONLY,//Solo se debe de ingresar la fecha
            allowNull: false
        }
    },{
        timestamps: false
    });
    return Insumos;
}