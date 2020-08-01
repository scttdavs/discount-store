import { createStore } from '../index'

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
            const { state, onChange } = createStore({ foo: true })
            expect(state.foo).toBeTruthy()
    
            const callback = jest.fn()
            onChange('foo', callback)
    
            state.foo = false
            
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
        })

        it('calls a callback when the store changes via reset', () => {
            const { state, onChange, reset } = createStore({ foo: 1 })
            expect(state.foo).toBe(1)
    
            const callback = jest.fn()
            onChange('foo', callback)
    
            reset()
            
            expect(callback).toHaveBeenCalledTimes(1)
        })

        it('calls a callback when the store changes via clear', () => {
            const { state, onChange, clear } = createStore({ foo: 1 })
            expect(state.foo).toBe(1)
    
            const callback = jest.fn()
            onChange('foo', callback)
    
            clear()
            
            expect(callback).toHaveBeenCalledTimes(1)
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
    })

    describe('use', () => {
        it('uses a config to set onChange listeners', () => {
            const { state, reset } = createStore({ foo: true, bar: 5 });
        })
    })
});
