//CommonJS syntax: const express = require('express');
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products.js'
import connectDB from './configurations/database.js'

/* Routers */
import productRouter from './routes/productRoutes.js'

dotenv.config();

/* connect to the MongoDB first */
connectDB()

const app = express();

const PORT = process.env.PORT;

app.listen(PORT || 5000, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

app.get("/", (request, response) => (response.send("The server is running.")));

/* Use Routers */
app.use("/api/products", productRouter);

/* Not Found Middleware */
app.use((request, response, next) => {
    /* this middleware is run if there is no route matched,
        it is placed close to the end of the middleware(request) pipeline */

    const error = new Error(`Not found - ${request.originalUrl}`);
    
    res.status(404)
    next(error)
});


/* Override the default Error Handler Middleware */
app.use((err, request, response, next) => {
    /* the custom error handler middleware, responsible for when there is an error */
    /* decide the status code */
    let statusCode = response.statusCode === 200 ? 500 : response.statusCode;
    // make 200 status codes, 500 
    response.status(statusCode);
    // return the error
    response.json( {
        message: err.message,
        stack: process.env.NODE_ENV == 'production' ? null : err.stack
    });

});
