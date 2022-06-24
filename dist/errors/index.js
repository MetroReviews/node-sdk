"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = {
    200: 'Request successful.',
    400: 'Malformed Request',
    401: 'Unauthorized Request',
    403: 'Forbidden Authorization',
    429: 'You are being ratelimited',
    500: 'Internal Server Error',
    522: 'Connection Timed Out'
};
class ErrorHandler extends Error {
    constructor(status, message, response) {
        if (status in messages) {
            super(`${status} ${message} (${messages[status]})`);
        }
        else {
            super(`${status} ${message}`);
        }
        this.response = response;
    }
}
exports.default = ErrorHandler;
