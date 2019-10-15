const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Client = require('../models/client');
const app = express();
const { verificartoken, verificarAdmin_Role, verificarSuper_Role } = require('../middlewares/autenticacion');


//================================
//Consultar los usuarios
//================================
app.get('/client', verificartoken, (req, res) => {

    Client.find({})
        .exec((err, clientDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            Client.countDocuments({}, (err, conteo) => {

                res.json({
                    ok: true,
                    users: clientDB,
                    quantity: conteo
                });

            });

        });

});

//================================
//Consultar un usuario
//================================
app.get('/client/:id', verificartoken, (req, res) => {

    let id = req.params.id;

    Client.findById(id)
        .exec((err, ClientDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            };

            if (!ClientDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: 'No existe un Cliente con ese id'
                    }
                });
            };

            res.json({
                ok: true,
                ClientDB
            })


        });

});


//================================
//Crear client
//================================
app.post('/client', [verificartoken, verificarSuper_Role],(req, res) => {

    let body = req.body;
    console.log(body);

    let client = new Client({
        enterprise: body.enterprise,
        business: body.business,
        location: body.location
    });

    client.save((err, clientCreado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            clientCreado
        });

    });


});






module.exports = app;