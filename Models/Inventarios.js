const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Inventarios = sequelize.define('Inventarios',
    {
        id:{
            type : DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false         
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "El campo no puede ser vacio" }
            } 
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        fecha_creacion: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        fecha_actualizacion: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
            onUpdate: true
        }
    },{
        indexes: [{
            unique: false,
            fields: ['nombre', 'fecha_creacion']
        },
        {
            unique: false,
            fields: ['nombre', 'fecha_actualizacion']
        }
    ],
        timestamps: false
    });
    return Inventarios;
}