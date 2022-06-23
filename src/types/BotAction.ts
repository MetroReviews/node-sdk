export type Snowflake = string;
export type ListFlake = string;
export type SetBoolean = boolean;

export interface BotAction {
    id: Snowflake;
    bot_id: bigint;
    action: number;
    reason: string;
    reviewer: string;
    action_time: number;
    list_source: bigint;
}