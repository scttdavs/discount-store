import { createStore } from '../index'

describe('createStore', () => {
    it('creates a store', () => {
        const { state } = createStore({})
        expect(state).toBeTruthy()
    })

    it('sets a state property', () => {
        const { state, onChange } = createStore({ foo: true })
        expect(state.foo).toBeTruthy()

        state.foo = false
        
        expect(state.foo).toBeFalsy()
    })

    it('calls a callback when the store changes', () => {
        const { state, onChange } = createStore({ foo: true })
        expect(state.foo).toBeTruthy()

        const callback = jest.fn()
        onChange('foo', callback)

        state.foo = false
        
        expect(state.foo).toBeFalsy()
        expect(callback).toHaveBeenCalledTimes(1)
    })
});
