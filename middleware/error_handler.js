const MessageResponse = require("../utils/message_response");
const errorHandler = (req, res, _) => {
    let error = req.error;
    let code = error.code && !(Number.isNaN(error.code)) ? parseInt(error.code) : 500;
    let errorObject = {};
    switch (code) {
        case 401:
            errorObject = MessageResponse.unatuhorizedResponse();
            break;
        case 403:
            errorObject = MessageResponse.forbbidenAccess();
            break;
        case 400:
            errorObject = MessageResponse.badRequestResponse({validation: error.validation});
            break;
        case 409:
            errorObject = MessageResponse.duplicateResponse({detail: error.detail});
            break;
        case 404:
            errorObject = MessageResponse.notFound();
            break;
        default:
            errorObject = MessageResponse.internalServerResponse({error: error.message || error.detail || 'Internal Server Error'});
            break;
    }
    res.status(code).json(errorObject);
    return;
}

module.exports = errorHandler;