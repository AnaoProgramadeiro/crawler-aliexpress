const fs = require('fs')
const express = require('express')
const path = require('path');

const app = express()
const port = 3000
app.use(express.static(__dirname + '/'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'src/front/index.html'));
  });

app.get('/api/:pesquisa', async function(req, res) {
    var minha = require('./src/getID');
    var pesquisa = req.params.pesquisa 
    var codigo = minha(pesquisa);
    var codigo = await codigo
    var listaId = []
    for (let x = 0; x < codigo.length; x++){
        var loja = codigo[x].slice(31, 47)
        var loja = loja.replace(/\D/g, "");
        listaId.push(loja)
    }
    res.send(listaId);

});


app.get('/image/:id/:pag', async function(req, res) {
    var photos = require('./src/getPhotos');
    var id = req.params.id 
    var paginas = req.params.pag 
    var fotos = photos(id, 15178487, paginas);
    var fotos = await fotos
    res.send(fotos);
})




app.listen(port, () => {
  console.log(`Server iniciado em: http://127.0.0.1:${port}`)
})


