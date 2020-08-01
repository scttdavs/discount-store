import { createStore } from '../index'

describe('createStore', () => {
    it('creates a store', () => {
        const { state } = createStore({})
        expect(state).toBeTruthy()
    })
});
