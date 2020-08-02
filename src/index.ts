export const createStore = (initialState: Record<string, unknown>) => {
    let underlyingState = Object.create(initialState);
    
    // these are defined so we can cache the old states
    // so we can determine if a value changed.
    // this needs to be done for onChange callbacks
    let clearedState;
    let resetState;
    
    const state: State = {};
    const callbacks: Callbacks = {
        get: [],
        set: [],
        reset: [],
        clear: []
    };

    // Proxy all the properties to reference the underlying state
    Object.keys(initialState).forEach(key => {
        Object.defineProperty(state, key, {
            enumerable: true,
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

    const clear: ClearMethod = () => {
        clearedState = underlyingState
        underlyingState = {}
        callbacks.clear.forEach(callback => callback())
        clearedState = null;
    }
    const reset: ResetMethod = () => {
        resetState = underlyingState
        underlyingState = Object.create(initialState)
        callbacks.reset.forEach(callback => callback())
        resetState = null;
    }
    const get: GetMethod = key => state[key]
    const set: SetMethod = (key, value) => state[key] = value
    const on: OnMethod = (eventName, callback) => {
        callbacks[eventName].push(callback);

        // return function to unsubscribe
        return () => {
            callbacks[eventName] = callbacks[eventName].filter(cb => cb !== callback)
        }
    };
    const onChange: OnChangeMethod = (propName, callback) => {
        const unSet = on('set', (key: string, newValue) => {
            if (key === propName) callback(newValue)
        })
        const unReset = on('reset', () => {
            // only if the value is changing!
            if (resetState[propName] !== initialState[propName]) {
                callback(initialState[propName])
            }
        })
        const unClear = on('clear', () => {
            // only if the value is changing!
            if (clearedState[propName] !== undefined) {
                callback(undefined)
            }
        })

        // return function to unsubscribe
        return () => {
            unSet();
            unReset();
            unClear();
        }
    }
    
    const use: UseMethod = config => {
        if (config.get) on('get', config.get)
        if (config.set) on('set', config.set)
        if (config.clear) on('clear', config.clear)
        if (config.reset) on('reset', config.reset)
    }

    // seal the state so that no other attributes can be added.
    // Needed for IE11, so we cannot use Proxy, we must know
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
