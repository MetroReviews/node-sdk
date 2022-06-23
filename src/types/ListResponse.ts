export type Snowflake = string;
export type ListFlake = string;
export type SetBoolean = boolean;
import { BotList } from './BotList';

export interface ListResponse {
    results: BotList[];
}