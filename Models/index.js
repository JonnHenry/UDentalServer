module.exports = function (sequelize){
    //Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos los datos
    const Productos = require('./Productos')(sequelize);
	//const Equipos = require('./Equipos')(sequelize);
	//const Instrumentos = require('./Instrumentos')(sequelize);
   // const Insumos = require('./Insumos')(sequelize);
   // const Inventarios = require('./Inventarios')(sequelize);
   // const InventariosControl = require('./InventariosControl')(sequelize);
   // const InventariosEntrega = require('./InventariosEntrega')(sequelize);
   // const Tratamientos = require('./Tratamientos')(sequelize);
    //Un Equipo,insumo o instrumento pertenece a una Inventario ya sea de control o entrega

	return {
        Productos: Productos/*,
		Equipos: Equipos,
		Instrumentos: Instrumentos,
        Insumos: Insumos,
        Inventarios: Inventarios,
        InventariosControl: InventariosControl,
        InventariosEntrega: InventariosEntrega,
        Tratamientos: Tratamientos*/
	};
};