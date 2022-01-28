const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/api/products', (req, res, next) => {
    Product.find()
        .then(products => res.status(200).json({products: products}))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({_id: req.params.id})
        .then(product => res.status(200).json({product: product}))
        .catch(error => res.status(400).json({ error }));
});

app.post('/api/products', (req, res, next) => {
    delete req.body._id;
    const _product = new Product({
        ...req.body
    });
    _product.save()
        .then(() => res.status(201).json({ product: _product }))
        .catch(error => res.status(400).json({ error }));
});

app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'Modified!' }))
        .catch(error => res.status(400).json({ error }));
});

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Deleted' }))
        .catch(error => res.status(400).json({ error }));
});




module.exports = app;