import { Response } from 'node-fetch';

const messages = {
    200: 'Request successful.',
    400: 'Malformed Request',
    401: 'Unauthorized Request',
    403: 'Forbidden Authorization',
    429: 'You are being ratelimited',
    500: 'Internal Server Error',
    522: 'Connection Timed Out'
}

export default class ErrorHandler extends Error {
    public response?: Response;

    constructor(status: number, message: string, response: Response) {
        if (status in messages) {
            super(`${status} ${message} (${messages[status as keyof typeof messages]})`);
        } else {
            super(`${status} ${message}`)
        }

        this.response = response;
    }
}