"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetroClient = void 0;
const node_fetch_1 = __importStar(require("node-fetch"));
const index_1 = __importDefault(require("../errors/index"));
const events_1 = require("events");
class MetroClient extends events_1.EventEmitter {
    constructor(token, options = {}) {
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
    async _request(method, path, body) {
        var _a;
        const headers = new node_fetch_1.Headers();
        if (this.options.token)
            headers.set('Authorization', this.options.token);
        if (method !== 'GET')
            headers.set('Content-Type', 'application/json');
        let url = `https://catnip.metrobots.xyz/${path}`;
        if (body && method === 'GET')
            url += `${new URLSearchParams(body)}`;
        const response = await (0, node_fetch_1.default)(url, {
            method, headers,
            body: body && method !== 'GET' ? JSON.stringify(body) : undefined
        });
        let responseBody;
        if ((_a = response.headers.get('Content-Type')) === null || _a === void 0 ? void 0 : _a.startsWith('application/json')) {
            responseBody = await response.json();
        }
        else {
            responseBody = await response.text();
        }
        if (!response.ok) {
            throw new index_1.default(response.status, response.statusText, response);
        }
        return responseBody;
    }
    /**
     *
     * @param id Bot List ID for Metro
     * @param listInfo List Info to Update
     * @returns Updates Bot List Info
     */
    async updateList(id, listInfo) {
        if (!listInfo)
            throw new Error('[Metro API] No Parameters provided to Update');
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
        });
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
    async getList(id) {
        if (!id)
            throw new Error('[Metro API] Invalid List ID or List ID is missing!');
        return this._request('GET', `list/${id}`);
    }
    /**
     * @returns Array of all Bot Lists
     */
    async getAllLists() {
        return this._request('GET', `lists`);
    }
    async getActions(query) {
        return this._request('GET', 'actions', query);
    }
}
exports.MetroClient = MetroClient;
