/* eslint-disable @typescript-eslint/no-explicit-any */
type Callbacks = {
    get: { (value: any): any; } [],
    set: { (key: string, value: any): any; } [],
    clear: { (): any; } [],
    reset: { (): any; } []
}

type OnMethod = (eventName: string, callback: (...any) => void) => () => void
type OnChangeMethod = (propName: string, callback: (value?: any) => void) => void