/* eslint-disable @typescript-eslint/no-explicit-any */
type Callback = (...any) => void;
type Callbacks = {
    get: Callback[],
    set: Callback[],
    clear: Callback[],
    reset: Callback[]
}

type State = Record<string, any>
type StoreEventNames = 'get' | 'set' | 'clear' | 'reset';
type OnMethod = (eventName: StoreEventNames, callback: Callback) => () => void
type OnChangeMethod = (propName: string, callback: (value?: any) => void) => () => void
type GetMethod = (key: string) => any
type SetMethod = (key: string, value: any) => any
type ResetMethod = () => void;
type ClearMethod = () => void;
type UseConfig = Record<StoreEventNames, Callback>;
type UseMethod = (config: UseConfig) => void