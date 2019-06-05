module.exports = function (sequelize){
    //Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos los datos
	const Equipos = require('./Equipos')(sequelize);
	const Instrumentos = require('./Instrumentos')(sequelize);
    const Insumos = require('./Insumos')(sequelize);
    const InventariosControl = require('./InventariosControl')(sequelize);
    const InventariosEntrega = require('./InventariosEntrega')(sequelize);
	//Un Equipo,insumo o instrumento pertenece a una Inventario ya sea de control o entrega
    InventariosControl.hasMany(Equipos,{foreignKey: 'id',onDelete: 'Cascade'})
    InventariosControl.hasMany(Instrumentos,{foreignKey: 'id',onDelete: 'Cascade'})
    InventariosControl.hasMany(Insumos,{foreignKey: 'id',onDelete: 'Cascade'})

    Equipos.belongsTo(InventariosControl);
    Insumos.belongsTo(InventariosControl);
    Instrumentos.belongsTo(InventariosControl);

    InventariosEntrega.hasMany(Equipos,{foreignKey: 'id',onDelete: 'Cascade'})
    InventariosEntrega.hasMany(Instrumentos,{foreignKey: 'id',onDelete: 'Cascade'})
    InventariosEntrega.hasMany(Insumos,{foreignKey: 'id',onDelete: 'Cascade'})
    
    Equipos.belongsTo(InventariosEntrega);
    Insumos.belongsTo(InventariosEntrega);
    Instrumentos.belongsTo(InventariosEntrega);
    
    
	//Una oganización tiene muchos usuarios o ninguno en caso de que sea null la clave externa
	Organization.hasMany(User);
	//Una licencia es creada por un usuario ("pertenece" a un usuario). 
	//Si el usuario se borra, se pierde la referencia al usuario poniendose el campo UserId a null
	License.belongsTo(User);
	//Una licencia pertenece a una organizacion, y no puede no pertener a ninguna (no puede ser null)
	//Si una organización se borra, se borrarán todas las licencias asociadas a ella
	Organization.hasMany(License, {foreignKey: {allowNull: false}, onDelete: 'Cascade'});
	return {
		Equipos: Equipos,
		Instrumentos: Instrumentos,
        Insumos: Insumos,
        InventariosControl: InventariosControl,
        InventariosEntrega: InventariosEntrega
	};
};