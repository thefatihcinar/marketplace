
/* Overriding the custom error handling middleware 
    this should be the last one at the request pipeline
    because when there is an error happened in a controller it should fall here */
const errorHandler = (err, request, response, next) => {
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
}

export default errorHandler