
exports.sendSuccess = (req, res, options, data) => {
    const code = options.code || 200;

    const responsePayload = {
        status: 'success',
        code,
        state: options.state || 'requestSucceeded',
        message: options.message || 'Request succeeded.',
        data,
        meta: options.meta,
    };

    res.status(code).json(responsePayload)
};

exports.sendError = (req, res, options) => {
    console.log(options.error);
    const code = options.code || 500;

    const responsePayload = {
        status: 'error',
        code,
        state: options.state || 'internalError',
        message: options.message || options.error.message || 'Something failed.',
    };

    res.status(code).json(responsePayload)
};

exports.sendNotFound = (res, resource) => {
    resource = resource || 'Resource';
    const state = `${resource.toLowerCase()}NotFound`;
    const message = `${resource} not found.`;

    res.status(404).json({
        status: 'error',
        code: 404,
        state: state,
        message,
    })
};

exports.sendForbidden = (res, message) => {
    res.status(401).json({
        status: 'error',
        code: 401,
        state: 'forbidden',
        message: message || 'You are not authorized.',
    })
};

