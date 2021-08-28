const express = require('express');

const app = express();

app.listen(5000, console.log('Server is running on port 5000'));

app.get("/", (request, response) => (response.send("Hello")));