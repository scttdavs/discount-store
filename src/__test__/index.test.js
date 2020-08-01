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

    describe('reset', () => {
        it('resets the store to be an empty object', () => {
            const { state, reset } = createStore({ foo: true });
            expect(state.foo).toBeDefined()

            reset()
            expect(state.foo).toBeUndefined()
            expect(state).toMatchObject({})
        })
    })
});
