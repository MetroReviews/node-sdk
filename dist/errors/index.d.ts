import { Response } from 'node-fetch';
export default class ErrorHandler extends Error {
    response?: Response;
    constructor(status: number, message: string, response: Response);
}
