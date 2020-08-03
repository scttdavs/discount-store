/* eslint-disable @typescript-eslint/no-explicit-any */
type Callback = (...any) => void;
type Callbacks = {
    get: Callback[],
    set: Callback[],
    clear: Callback[],
    reset: Callback[]
}

type State = Record<string, any>
type StoreEvent = 'get' | 'set' | 'clear' | 'reset';
type OnMethod = (eventName: StoreEvent, callback: Callback) => () => void
type OnChangeMethod = (propName: string, callback: (value?: any) => void) => () => void
type GetMethod = (key: string) => any
type SetMethod = (key: string, value: any) => any
type ResetMethod = () => void;
type ClearMethod = () => void;
type UseConfig = { [key in StoreEvent]?: Callback };
type UseMethod = (config: UseConfig) => void
type StoreMethods = {
    state: State,
    on: OnMethod,
    onChange: OnChangeMethod,
    get: GetMethod,
    set: SetMethod,
    reset: ResetMethod,
    clear: ClearMethod,
    use: UseMethod
}
type CreateStore = (state: State) => StoreMethods