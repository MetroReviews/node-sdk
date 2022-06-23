import fetch, { Headers } from 'node-fetch';
import ErrorHandler from '../errors/index';
import { EventEmitter } from 'events';

import { Snowflake, ListFlake, BotList } from '../typings';

import server from 'express';

interface MetroOptions {
    token?: string;
}

export class MetroClient extends EventEmitter {
    private options: MetroOptions;

    constructor(token: string, options: MetroOptions = {}) {
        super();

        this.options = {
            token: token,
            ...options
        };
    }

    private async _request(method: string, path: string, body?: Record<string, any>): Promise<any> {
        const headers = new Headers();

        if (this.options.token) headers.set('Authorization', this.options.token);
        if (method !== 'GET') headers.set('Content-Type', 'application/json');

        let url = `https://catnip.metrobots.xyz/${path}`;

        if (body && method === 'GET') url += `${new URLSearchParams(body)}`;

        const response = await fetch(url, {
            method, headers,
            body: body && method !== 'GET' ? JSON.stringify(body) : undefined 
        });

        let responseBody;

        if (response.headers.get('Content-Type')?.startsWith('application/json')) {
            responseBody = await response.json();
        } else {
            responseBody = await response.text();
        }

        if (!response.ok) {
            throw new ErrorHandler(response.status, response.statusText, response);
        }

        return responseBody;
    }

    public async getList(id: ListFlake): Promise<BotList> {

        if (!id) throw new Error('[Metro API] Invalid List ID or List ID is missing!');
        
        return this._request('GET', `list/${id}`);
    }
}