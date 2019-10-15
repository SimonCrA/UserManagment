const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');


app.get('/imagen/:tipo/:img', (req, res) =>{

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);
    
    if (fs.existsSync( pathImagen )) {
        res.sendFile( pathImagen );
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImagePath);
    }

});

app.delete('/imagen/:tipo/:img', (req, res) => {

    let tipo = req.params.tipo;
    let nombreImagen = req.params.img;
    
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    };

 Client.findById(id, (err, clientDB) => {
     if (err) {
         borrarArchivo(nombreArchivo, 'maps');

         return res.status(500).json({
             ok: false,
             err
         });
     };
     if (!clientDB) {
         borrarArchivo(nombreArchivo, 'maps');

         return res.status(400).json({
             ok: true,
             err: {
                 mensaje: 'no existe un client con ese id'
             }
         });
     };

     console.log(clientDB.img);

     clientDB.img = nombreArchivo;

     clientDB.save((err, clienteActualizado) => {

         res.json({
             ok: true,
             client: clienteActualizado,
             img: nombreArchivo
         });
     });

 });


})


module.exports = app;