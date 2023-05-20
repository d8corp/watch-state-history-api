import { State } from 'watch-state';
export interface HistoryStep {
    url: string;
    position: number;
}
export interface HistoryState {
    steps: HistoryStep[];
}
export declare const historyState: State<HistoryState>;
export declare function getHistoryStateRaw(): HistoryState;
export declare function updateHistoryState(): void;
