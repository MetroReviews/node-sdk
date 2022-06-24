/// <reference types="node" />
import { EventEmitter } from 'events';
import { ListFlake, BotList } from '../types/BotList';
import { ActionQuery, ActionResponse } from '../types/Actions';
interface MetroOptions {
    token?: string;
}
export declare class MetroClient extends EventEmitter {
    private options;
    constructor(token: string, options?: MetroOptions);
    /**
     *
     * @param method Request Method
     * @param path Request Path
     * @param body Request Body
     * @returns Private Function used to manage Request Methods.
     */
    private _request;
    /**
     *
     * @param id Bot List ID for Metro
     * @param listInfo List Info to Update
     * @returns Updates Bot List Info
     */
    updateList(id: ListFlake, listInfo: BotList): Promise<BotList>;
    /**
     *
     * @param id Bot List ID for Metro
     * @returns Bot List Information
     */
    getList(id: ListFlake): Promise<BotList>;
    /**
     * @returns Array of all Bot Lists
     */
    getAllLists(): Promise<BotList>;
    getActions(query?: ActionQuery): Promise<ActionResponse>;
}
export {};
