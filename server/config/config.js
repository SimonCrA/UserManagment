//=================
//Port
//=================

process.env.PORT = process.env.PORT || 3000;

//=================
//Entorno
//=================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=====================
//Vencimiento del token
//=====================
process.env.CADUCIDAD_TOKEN = '48h';

//=====================
//SEED de autenticación
//=====================

process.env.SEED_AUTH = process.env.SEED_AUTH || 'este-es-el-seed-desarrollo';


//=================
//Base de Datos
//=================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/usuariosIndoorLocation';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
