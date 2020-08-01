export const createStore = initialState => {
    let state = {};
    const callbacks = {
        get: [],
        set: [],
        reset: [],
        clear: []
    };

    const setState = (obj) => {
        Object.keys(obj).forEach(key => {
            let value = obj[key];
            Object.defineProperty(state, key, {
                enumerable: true,
                configurable: true,
                get() {
                    callbacks.get.forEach(callback => callback(value))
                    return value
                },
                set(newValue) {
                    if (newValue !== value) {
                        value = newValue;
                        callbacks.set.forEach(callback => callback(key, value))
                    }
                    return value
                }
            })
        })
    }
    setState(initialState)

    const clear = () => {
        Object.keys(state).forEach(key => {
            delete state[key]
        })
        callbacks.clear.forEach(callback => callback())
    }
    const reset = () => {
        Object.keys(state).forEach(key => {
            delete state[key]
        })
        setState(initialState)
        callbacks.reset.forEach(callback => callback())
    }
    const get = key => state[key]
    const set = (key, value) => { return state[key] = value }
    const on = (eventName, callback) => {
        callbacks[eventName].push(callback);

        // return function to unsubscribe
        return () => {
            callbacks[eventName].filter(cb => cb !== callback)
        }
    };
    const onChange = (propName, callback) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) callback(newValue)
        })
        const unCallback = () => callback(initialState[propName])
        const unReset = on('reset', unCallback)
        const unClear = on('clear', unCallback)

        // return function to unsubscribe
        return () => {
            unSet();
            unReset();
            unClear();
        }
    }
    

    const use = config => {
        ['get', 'set', 'reset'].forEach(eventName => {
            on(eventName, config[eventName])
        });
    }

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
