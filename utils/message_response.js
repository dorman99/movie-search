let unatuhorizedResponse = () =>{
    return {
        code: 401,
        message: 'Unauthorized',
        data: null
    }
}

let forbbidenAccess = () => {
    return {
        code: 403,
        message: 'Forbidden Access',
        data: null
    }
}

let badRequestResponse = ({validation}) => {
    return {
        code: 400,
        message: 'Bad Request',
        validation
    }
}

let duplicateResponse = ({detail}) => {
    return {
        code: 409,
        message: 'Duplicate Object',
        detail: detail
    } 
}

let internalServerResponse = ({error}) => {
    return  {
        code: 500,
        message: 'Internal Server Error',
        detail: error
    }
}

let acceptResponse = () => {
    return {
        code: 202,
        message: 'Accepted'
    }
}
let successDefaultResponse = ({data}) =>{
    return {
        code: 200,
        message: 'Success',
        data
    }
}

let notFound = () => {
    return {
        code: 404,
        message: 'Not Found Path'
    }
}

module.exports = {
    successDefaultResponse,
    acceptResponse,
    internalServerResponse,
    duplicateResponse,
    unatuhorizedResponse,
    forbbidenAccess,
    badRequestResponse,
    notFound
}