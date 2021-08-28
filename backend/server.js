//CommonJS syntax: const express = require('express');
import express from 'express'
import products from './data/products.js'

const app = express();

app.listen(5000, console.log('Server is running on port 5000'));

app.get("/", (request, response) => (response.send("The server is running.")));

/* Fetch all products */
app.get("/products", (request, response) => (
    response.json(products)
));

