const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const Stripe = require('stripe')("sk_test_51HH6PyAjACkNvoTrHCR4x33DB7oAzzxsWCdfauZL07K3qTF6HbSonaYHsGITidzmZEyBUkMtEaUDvIZ9yKDoBKfv006YqLX5Nk");

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if(error) throw error;
    console.log('Server running on port ' + port);
});

app.post('/payment', (req, res) => {
    const body =  { 
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'inr'
    };

    Stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
});