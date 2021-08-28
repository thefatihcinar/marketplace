//CommonJS syntax: const express = require('express');
import express from 'express'
import products from './data/products.js'

const app = express();

app.listen(5000, console.log('Server is running on port 5000'));

app.get("/", (request, response) => (response.send("The server is running.")));

/* Fetch all products */
app.get("/api/products", (request, response) => (
    response.json(products)
));

/* Fetch a specific product */
app.get("/api/products/:id", (request, response) => {
    let productId = request.params.id;
    let product = products.find( p => p._id == productId);
    response.json(product);
})