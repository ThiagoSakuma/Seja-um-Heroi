const express = require('express');
const OngController = require('./controllers/OngController');
const CasoController = require('./controllers/CasoController');
const PerfilController = require('./controllers/PerfilController');
const SessaoController = require('./controllers/SessaoController');
const mercadopago = require('mercadopago')

const routes = express.Router(); //Tira o modulo de rota do express e coloca em uma variavel

//Rotas da aplicação
routes.post('/sessao', SessaoController.create);

//routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create); 

routes.get('/caso', CasoController.index);
routes.post('/caso', CasoController.create);
routes.delete('/caso/:id', CasoController.delete);

routes.get('/perfil', PerfilController.index);

//Rota da API do mercado pago
routes.post('/',(req,res)=>{
    //console.log(req.body)

    const preference = {
        items:[{
            title: req.body.title,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: parseFloat(req.body.price)
        }],
        payer:{
            name: "Teste",
            email: "userteste@gmail.com"
        },
        payment_methods: {
            installments:3,
            excluded_payment_types: [
                {"id":"debit_card"},
            ],
            excluded_payment_methods: [
                {"id":"paypal"},
                {"id":"pec"}
            ]
        },
        back_urls:{
            failure:"https://reactnative.dev/failure",
            pending:"https://reactnative.dev/pending",
            success:"https://reactnative.dev/success",
        },
    };
    mercadopago.preferences.create(preference).then(function (data) {
        res.send(JSON.stringify(data.response.sandbox_init_point));
    }).catch(function (error) {
        console.log(error);
    });
});

module.exports = routes; //Exportando as rotas(variaveis) para acesso no index