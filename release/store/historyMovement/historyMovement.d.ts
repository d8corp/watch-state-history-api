import { Cache } from 'watch-state';
export type HistoryMovement = 'back' | 'forward' | 'same';
export declare const historyMovement: Cache<HistoryMovement>;
