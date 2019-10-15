const jwt = require('jsonwebtoken');



//============================
//Verificar token
//============================

let verificartoken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, process.env.SEED_AUTH, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });

};

//============================
//Verificar Admin_Role
//============================

let verificarAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario debe tener permisos de administrador'
            }
        });
    }

};

//============================
//Verificar Super_Role
//============================

let verificarSuper_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'SUPER_ROLE') {
        next();
    } else {
        res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario debe tener permisos de Super usuario'
            }
        });
    }

};

module.exports = {
    verificartoken,
    verificarAdmin_Role,
    verificarSuper_Role
}