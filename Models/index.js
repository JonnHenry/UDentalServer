module.exports = function (sequelize){
    //Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos los datos
	const Equipos = require('./Equipos')(sequelize);
	const Instrumentos = require('./Instrumentos')(sequelize);
    const Insumos = require('./Insumos')(sequelize);
    const InventariosControl = require('./InventariosControl')(sequelize);
    const InventariosEntrega = require('./InventariosEntrega')(sequelize);
	//Un Equipo,insumo o instrumento pertenece a una Inventario ya sea de control o entrega
    InventariosControl.hasMany(Equipos, {foreignKey: 'id'});
    InventariosControl.hasMany(Instrumentos, {foreignKey: 'id'});
    InventariosControl.hasMany(Insumos, {foreignKey: 'id'});

    Equipos.belongsTo(InventariosControl);
    Insumos.belongsTo(InventariosControl);
    Instrumentos.belongsTo(InventariosControl);
    
	return {
		Equipos: Equipos,
		Instrumentos: Instrumentos,
        Insumos: Insumos,
        InventariosControl: InventariosControl,
        InventariosEntrega: InventariosEntrega
	};
};