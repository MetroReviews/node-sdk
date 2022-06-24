export declare type Snowflake = string;
export declare type ListFlake = string;
export interface BotList {
    id: ListFlake;
    state: number;
    name: string;
    description: string;
    icon: string;
    claim_bot_api: string;
    unclaim_bot_api: string;
    approve_bot_api: string;
    deny_bot_api: string;
    domain: string;
    secret_key: string;
}
