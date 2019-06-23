const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Instrumentos = sequelize.define('instrumentos',
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
        observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        estado:{
            type: DataTypes.ENUM('Obsoleto', 'Buen Estado', 'Reparación'), 
            allowNull: false,
            defaultValue: 'Buen Estado'
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },{
        indexes: [{
            unique: true,
            fields: ['estado']
        }],
        timestamps: false,
        modelName: 'instrumentos'
    });
    return Instrumentos;
}