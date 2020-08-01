# store-global
Store data globally in your app. Generic library, no dependencies.

## API

### get

```js
const { get } = createStore({ count: 0 })
console.log(get('count')) // 0
```
