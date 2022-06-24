import fetch, { Headers } from 'node-fetch';
import ErrorHandler from '../errors/index';
import { EventEmitter } from 'events';

import { Snowflake, ListFlake, BotList } from '../types/BotList';
import { ActionQuery, ActionResponse } from '../types/Actions';

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

    /**
     * 
     * @param method Request Method
     * @param path Request Path
     * @param body Request Body
     * @returns Private Function used to manage Request Methods.
     */
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

    /**
     * 
     * @param id Bot List ID for Metro
     * @param listInfo List Info to Update
     * @returns Updates Bot List Info
     */
    public async updateList(id: ListFlake, listInfo: BotList): Promise<BotList> {

        if (!listInfo) throw new Error('[Metro API] No Parameters provided to Update');
        
        /**
         * eslint-disable-camelcase
         */
        await this._request('PATCH', `lists/${id}`, {
            name: listInfo.name,
            description: listInfo.description,
            domain: listInfo.domain,
            claim_bot_api: listInfo.claim_bot_api,
            unclaim_bot_api: listInfo.unclaim_bot_api,
            approve_bot_api: listInfo.approve_bot_api,
            deny_bot_api: listInfo.deny_bot_api,
            reset_secret_key: false,
            icon: listInfo.icon
        })

        /**
         * eslint-disable-camelcase
         */
        return listInfo;
    }

    /**
     * 
     * @param id Bot List ID for Metro
     * @returns Bot List Information
     */
    public async getList(id: ListFlake): Promise<BotList> {

        if (!id) throw new Error('[Metro API] Invalid List ID or List ID is missing!');
        
        return this._request('GET', `list/${id}`);
    }

    /**
     * @returns Array of all Bot Lists 
     */
    public async getAllLists(): Promise<BotList> {

        return this._request('GET', `lists`)
    }

    public async getActions(query?: ActionQuery): Promise<ActionResponse> {

        return this._request('GET', 'actions', query);
    }
}