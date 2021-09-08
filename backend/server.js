//CommonJS syntax: const express = require('express');
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/products.js'
import connectDB from './configurations/database.js'

/* Routers */
import productRouter from './routes/productRoutes.js'

/* Middleware */
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config();

/* connect to the MongoDB first */
connectDB()

const app = express();

/* Body Parser */
app.use(express.json()); // it parses JSON body

const PORT = process.env.PORT;

app.listen(PORT || 5000, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

app.get("/", (request, response) => (response.send("The server is running.")));

/* Use Routers */
app.use("/api/products", productRouter);

/* Not Found Middleware */
app.use(notFound);

/* Use Custom Error Handler Middleware */
app.use(errorHandler);
