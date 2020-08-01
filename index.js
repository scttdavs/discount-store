export const createStore = obj => {
    const state = {};
    const callbacks = {};
    const onChange = (key, callback) => {
        callbacks[key] = callbacks[key] || []
        callbacks[key].push(callback);

        // return function to unsubscribe
        return () => {
            callbacks[key].filter(cb => cb !== callback)
        }
    };

    Object.keys(obj).forEach(key => {
        let value = obj[key];
        Object.defineProperty(state, key, {
            enumerable: true,
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

    return { state, onChange };
}
