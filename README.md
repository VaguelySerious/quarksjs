# QuarksJS Animations

Animation library to create quark animations

Go to [the website](https://wielander.me/quarks) for documentation and an interactive playground.

## How to use

Include `lib/quarks.min.js` in your code, create a `canvas` html element, then use like so:

```js
const quark = new QuarkAnimation({
  id: 'canvas',
  bounds: { x: 600, y: 600 },
  padding: 100,
})

quark.start()
```
