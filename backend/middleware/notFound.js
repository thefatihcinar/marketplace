
const notFound = (request, response, next) => {

    /* this middleware is run if there is no route matched,
        it is placed close to the end of the middleware(request) pipeline */

    const error = new Error(`Not found - ${request.originalUrl}`);
    
    response.status(404)
    next(error)
}

export default notFound