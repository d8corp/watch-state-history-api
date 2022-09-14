import { Cache } from 'watch-state';
export declare type Step = {
    url: string;
    position: number;
};
export declare type Steps = Step[];
export declare type State = {
    key: string;
    steps: Steps;
};
export declare type BackChk = (url: string) => boolean;
export declare class History {
    constructor(locales?: string, key?: string);
    readonly destructor: () => void;
    protected readonly defaultState: State;
    protected readonly key: string;
    protected getCache: {
        [reg: number]: {
            [index: string]: Cache<string>;
        };
    };
    protected isCache: {
        [reg: string]: Cache<boolean>;
    };
    movement: 'back' | 'forward' | undefined;
    state: State;
    locales: string;
    protected _url: string;
    protected onChange(state: State): void;
    get locale(): string;
    set locale(locale: string);
    get localUrl(): string;
    get url(): string;
    get path(): string;
    get hash(): string;
    get href(): string;
    get search(): string;
    getSearch(key: string): string;
    back(is?: RegExp | BackChk, def?: string, scrollFirst?: boolean): this;
    forward(): this;
    go(delta: number): this;
    replace(url: string, position?: number | string, scrollFirst?: boolean): this;
    push(url: string, position?: number | string, scrollFirst?: boolean): this;
    is(reg: string): boolean;
    get(reg: string, index?: number, defaultValue?: string): string;
    protected changeState(callback: (newUrl: string) => void, locale: string, url: string, position: number | string, scrollFirst?: boolean): void;
}
export default History;
