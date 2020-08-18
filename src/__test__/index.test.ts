export default (createStore: CreateStore) => {
    describe('createStore', () => {
        it('creates a store', () => {
            const { state } = createStore({})
            expect(state).toBeTruthy()
        })
    
        describe('state', () => {
            it('sets a state property', () => {
                const { state } = createStore({ foo: true })
                expect(state.foo).toBeTruthy()
        
                state.foo = false
                
                expect(state.foo).toBeFalsy()
            })
        })
    
        describe('onChange', () => {
            it('calls a callback when the store changes', () => {
                const { state, onChange } = createStore({ foo: true, bar: 0 })
                expect(state.foo).toBeTruthy()
        
                const callback = jest.fn()
                onChange('foo', callback)
        
                state.foo = false
                state.bar += 1
                
                expect(state.foo).toBeFalsy()
                expect(callback).toHaveBeenCalledTimes(1)
            })
    
            it('calls a callback when the store changes via set', () => {
                const { state, onChange, set } = createStore({ foo: true })
                expect(state.foo).toBeTruthy()
        
                const callback = jest.fn()
                onChange('foo', callback)
        
                set('foo', false)
                
                expect(state.foo).toBeFalsy()
                expect(callback).toHaveBeenCalledTimes(1)
                expect(callback).toHaveBeenCalledWith(false)
            })
    
            it('calls a callback when the store changes via reset', () => {
                const { state, onChange, reset } = createStore({ foo: 1 })
                state.foo += 1
                expect(state.foo).toBe(2)
        
                const callback = jest.fn()
                onChange('foo', callback)
        
                reset()
                
                expect(callback).toHaveBeenCalledTimes(1)
                expect(callback).toHaveBeenCalledWith(1)
            })
    
            it('calls a callback when the store changes via clear', () => {
                const { state, onChange, clear } = createStore({ foo: 1 })
                expect(state.foo).toBe(1)
        
                const callback = jest.fn()
                onChange('foo', callback)
        
                clear()
                
                expect(callback).toHaveBeenCalledTimes(1)
                expect(callback).toHaveBeenCalledWith(undefined)
            })
    
            it('returns a function to unsubscribe', () => {
                const { state, onChange, clear } = createStore({ foo: 1 })
                expect(state.foo).toBe(1)
        
                const callback = jest.fn()
                const unClear = onChange('foo', callback)
        
                clear()
    
                unClear()
    
                clear()
                
                expect(callback).toHaveBeenCalledTimes(1)
            })

            it('only unsubscribes from a single event, with same callback as other events', () => {
                const { state, onChange } = createStore({ foo: 1 })
                expect(state.foo).toBe(1)
        
                const callback = jest.fn()
                const unClear = onChange('foo', callback)
                onChange('foo', callback)
        
                state.foo += 1

                expect(callback).toHaveBeenCalledTimes(2)
    
                unClear()
    
                state.foo += 1
                
                expect(callback).toHaveBeenCalledTimes(3)
            })
    
            it('does not call the callback if the value does not change', () => {
                const { state, onChange } = createStore({ foo: 1 })
        
                const callback = jest.fn()
                onChange('foo', callback)
        
                state.foo = 1
                
                expect(callback).not.toHaveBeenCalled()
            })
    
            it('does not call the callback if the value does not change via reset', () => {
                const { onChange, reset } = createStore({ foo: 1 })
        
                const callback = jest.fn()
                onChange('foo', callback)
        
                reset()
                
                expect(callback).not.toHaveBeenCalled()
            })
    
            it('does not call the callback if the value does not change via clear', () => {
                const { onChange, clear } = createStore({ foo: undefined })
        
                const callback = jest.fn()
                onChange('foo', callback)
        
                clear()
                
                expect(callback).not.toHaveBeenCalled()
            })
        })
    
        describe('get', () => {
            it('gets a value', () => {
                const { get } = createStore({ foo: true })
                expect(get('foo')).toBeTruthy()
            })
        })
    
        describe('set', () => {
            it('sets a value', () => {
                const { get, set } = createStore({ foo: true })
                expect(get('foo')).toBeTruthy()
    
                const value = set('foo', 4)
                expect(value).toBe(4)
                expect(get('foo')).toBe(4)
            })
    
            it('throws when trying to set a new field', () => {
                const { set } = createStore({ foo: true })
    
                expect(() => set('bar', 1)).toThrow()
            })
        })
    
        describe('clear', () => {
            it('resets the store to be an empty object', () => {
                const { state, clear } = createStore({ foo: true });
                expect(state.foo).toBeDefined()
    
                clear()
                expect(state.foo).toBeUndefined()
                expect(state).toMatchObject({})
            })
        })
    
        describe('reset', () => {
            it('resets the store to its original state', () => {
                const { state, reset } = createStore({ foo: true, bar: 5 });
                expect(state.foo).toBeTruthy()
                expect(state.bar).toBe(5)
    
                state.bar = 10
                state.foo = false
    
                expect(state.foo).toBeFalsy()
                expect(state.bar).toBe(10)
    
                reset()
    
                expect(state.foo).toBeTruthy()
                expect(state.bar).toBe(5)
            })
        })
    
        describe('on', () => {
            it('fires a callback when a value is gotten', () => {
                const { state, get, on } = createStore({ foo: true, bar: 5 });
                const callback = jest.fn();
    
                on('get', callback)
                expect(get('foo')).toBeTruthy()
                expect(state.bar).toBe(5)
    
                expect(callback).toHaveBeenCalledTimes(2)
            })
    
            it('fires a callback when a value is set', () => {
                const { state, set, on } = createStore({ foo: true, bar: 5 });
                const callback = jest.fn();
                on('set', callback)
    
                expect(state.foo).toBeTruthy()
                expect(state.bar).toBe(5)
    
                set('foo', false);
                state.bar = 10;
                
                expect(state.foo).toBeFalsy()
                expect(state.bar).toBe(10)
    
                expect(callback).toHaveBeenCalledTimes(2)
            })
    
            it('fires a callback when the store is reset', () => {
                const { state, reset, on } = createStore({ foo: true, bar: 5 });
                const callback = jest.fn();
                on('reset', callback)
    
                expect(state.bar).toBe(5)
    
                state.bar = 10;
                
                expect(state.bar).toBe(10)
    
                reset()
    
                expect(state.bar).toBe(5)
    
                expect(callback).toHaveBeenCalledTimes(1)
            })
    
            it('fires a callback when the store is cleared', () => {
                const { state, clear, on } = createStore({ foo: true, bar: 5 });
                const callback = jest.fn();
                on('clear', callback)
    
                expect(state.bar).toBeDefined()
    
                clear()
    
                expect(state.bar).toBeUndefined()
                expect(callback).toHaveBeenCalledTimes(1)
            })
    
            it('returns a function to unsubscribe', () => {
                const { state, clear, on } = createStore({ foo: true, bar: 5 });
                const callback = jest.fn();
                const unClear = on('clear', callback)
    
                expect(state.bar).toBeDefined()
    
                clear()
    
                unClear()
    
                clear()
    
                expect(state.bar).toBeUndefined()
                expect(callback).toHaveBeenCalledTimes(1)
            })
        })
    
        describe('use', () => {
            it('uses a config to set onChange listeners', () => {
                const { state, use, clear, reset } = createStore({ foo: true, bar: 5 });
                const callbacks = {
                    get: jest.fn(),
                    set: jest.fn(),
                    clear: jest.fn(),
                    reset: jest.fn()
                }
                
                use(callbacks)
    
                state.bar
                state.foo = false
                reset()
                clear()
    
                expect(callbacks.get).toHaveBeenCalledTimes(1)
                expect(callbacks.set).toHaveBeenCalledTimes(1)
                expect(callbacks.clear).toHaveBeenCalledTimes(1)
                expect(callbacks.reset).toHaveBeenCalledTimes(1)
            })
    
            it('uses does nothing if some callbacks are missing', () => {
                const { use } = createStore({ foo: true, bar: 5 });
                expect(() => use({})).not.toThrow()
            })
        })
    })
}
