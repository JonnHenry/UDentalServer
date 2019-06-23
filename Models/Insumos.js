const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Insumos = sequelize.define('insumos',
    {
        id_producto:{
            type : DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
            references: {
                model: 'productos',
                key: 'id'
            }         
        },
        fecha_caducidad: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },{
        indexes: [{
            unique: true,
            fields: ['fecha_caducidad']
        }],
        timestamps: false,
        modelName: 'insumos'
    });
    return Insumos;
}