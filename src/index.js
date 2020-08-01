export const createStore = initialState => {
    let state = {};
    const callbacks = {};

    const onChange = (key, callback) => {
        callbacks[key] = callbacks[key] || []
        callbacks[key].push(callback);

        // return function to unsubscribe
        return () => {
            callbacks[key].filter(cb => cb !== callback)
        }
    };

    const setState = (obj) => {
        Object.keys(obj).forEach(key => {
            let value = obj[key];
            Object.defineProperty(state, key, {
                enumerable: true,
                configurable: true,
                get() { return value },
                set(newValue) {
                    if (newValue !== value) {
                        value = newValue;
                        (callbacks[key] || []).forEach(callback => callback(value))
                    }
                    return value
                }
            })
        })
    }
    setState(initialState)

    const reset = () => {
        Object.keys(state).forEach(key => {
            delete state[key]
        })
    }
    const dispose = () => {
        reset()
        setState(initialState)
    }
    const get = key => state[key]
    const set = (key, value) => { return state[key] = value }

    const use = config => {
        const eventNames = Object.keys(config);
        eventNames.forEach(eventName => {
            onChange(eventName, config[eventName])
        });
    }

    return {
        state,
        reset,
        dispose,
        get,
        set,
        use,
        onChange
    };
}
