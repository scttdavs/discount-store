/* eslint-disable @typescript-eslint/no-explicit-any */
type Callbacks = {
    get: { (value: any): any; } [],
    set: { (key: string, value: any): any; } [],
    clear: { (): any; } [],
    reset: { (): any; } []
}