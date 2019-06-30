const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const Inventarios = sequelize.define('inventarios', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El campo no puede ser vacio"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        fecha_creacion: {
            type: DataTypes.DATEONLY
        },
        fecha_actualizacion: {
            type: DataTypes.DATEONLY
        }
    }, {
        indexes: [{
                unique: false,
                fields: ['fecha_creacion']
            },
            {
                unique: false,
                fields: ['nombre']
            }
        ],
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        modelName: 'inventarios',
        timestamps: false
    });
    return Inventarios;
}