export const createStore = (initialState: Record<string, unknown>) => {
    let underlyingState = Object.create(initialState);
    const state = {};
    const callbacks: Callbacks = {
        get: [],
        set: [],
        reset: [],
        clear: []
    };

    Object.keys(initialState).forEach(key => {
        Object.defineProperty(state, key, {
            enumerable: true,
            configurable: true,
            get() {
                const value = underlyingState[key];
                callbacks.get.forEach(callback => callback(value))
                return value
            },
            set(newValue) {
                const value = underlyingState[key];
                if (newValue !== value) {
                    underlyingState[key] = newValue;
                    callbacks.set.forEach(callback => callback(key, newValue))
                }
                return value;
            }
        })
    })

    const clear = () => {
        underlyingState = {}
        callbacks.clear.forEach(callback => callback())
    }
    const reset = () => {
        underlyingState = Object.create(initialState)
        callbacks.reset.forEach(callback => callback())
    }
    const get = key => state[key]
    const set = (key, value) => state[key] = value
    const on = (eventName: string, callback) => {
        callbacks[eventName].push(callback);

        // return function to unsubscribe
        return () => {
            callbacks[eventName] = callbacks[eventName].filter(cb => cb !== callback)
        }
    };
    const onChange = (propName: string, callback: (value?: any) => void) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        const unSet = on('set', (key: string, newValue) => {
            if (key === propName) callback(newValue)
        })
        const unReset = on('reset', () => callback(initialState[propName]))
        const unClear = on('clear', () => callback(undefined))

        // return function to unsubscribe
        return () => {
            unSet();
            unReset();
            unClear();
        }
    }
    
    // TODO throw if they try to set a new field

    const use = config => {
        ['get', 'set', 'reset', 'clear'].forEach(eventName => {
            on(eventName, config[eventName])
        });
    }

    // seal the state so that no other attributes can be added
    // to support IE11, we cannot use Proxy, so we must know
    // all attributes at execution time
    Object.seal(state)

    return {
        state,
        reset,
        clear,
        get,
        set,
        use,
        on,
        onChange
    };
}
