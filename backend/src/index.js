const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const config = require('../../mobile/src/config')
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago')
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //Requisiçoes POST
app.use(bodyParser.json()) //Utilizando JSON p/ as requisições

app.use(cors()); // modulo de segurança
app.use(express.json()); //Utilizando JSON p/ as requisições
app.use(routes); //uso das rotas da "const rout"

mercadopago.configure({access_token: config.token});//acesso as config do ambiente sandbox mercado pago

app.listen(3333);