const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/usuario');
const app = express();
const { verificartoken, verificarAdmin_Role, verificarSuper_Role } = require('../middlewares/autenticacion');



//================================
//Consultar los usuarios
//================================
app.get('/usuario', verificartoken ,(req, res) =>{

    User.find({state: true})
            .populate('client')
            .exec((err, usuariosDB) =>{

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                };

                User.countDocuments({state: true}, (err, conteo) =>{

                    res.json({
                        ok:true,
                        usuarios: usuariosDB,
                        cantidad: conteo
                    });

                });

            });

});

//================================
//Consultar un usuario
//================================
app.get('/usuario/:id', verificartoken ,(req, res) =>{

    let id = req.params.id;

    User.findById(id)
            .exec( (err, usuarioDB) =>{

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'No existe un usuario con ese id'
                }
            });
        };

        res.json({
            ok:true,
            usuarioDB
        })


    });

});

//================================
//Crear usuarios
//================================
app.post('/usuario', [verificartoken, verificarSuper_Role], (req, res) => {

    let body = req.body;
    console.log(body);

    let usuario =  new User ({
        name: body.name,
        surname: body.surname,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        state: body.state,
        department: body.department,
        client: body.client
    });

    usuario.save( (err, usuarioCreado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok:true,
            usuarioCreado
        });

    });
    

});

//================================
//Actualizar usuario
//================================
app.put('/usuario/:id', [verificartoken, verificarSuper_Role || verificarAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name','surname','email','role','state','department']);

    User.findByIdAndUpdate(id, body, {new: true, runValidators: true, useFindAndModify: false }, (err, usuarioModificado) =>{

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        };
        if (!usuarioModificado) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: ' El id no existe'
                }
            });
        };

        res.json({
            ok:true,
            usuarioModificado
        });

    });

});

//================================
//Borrar usuarios
//================================
app.delete('/usuario/:id', [verificartoken, verificarSuper_Role], (req, res) => {

    let id = req.params.id;
    let cambiaEstado = {
        state: false
    }

    User.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true, useFindAndModify: false }, (err, usuarioInhabilitado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarioBorrado: usuarioInhabilitado
        });

    });

});

module.exports = app;