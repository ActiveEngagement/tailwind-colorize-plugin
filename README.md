# Tailwind Color  

![test](./assets/banner.png)

I ❤️ Tailwind, but I loathe when I have to create new colors. 🟥 🟧 🟨 🟩 🟦 

It usually involves opening some color app, picking the color, adjusting the hue or shade in some minute way, and potentially editing the config to save the color, and repeating the process until it is correct.

### Project Goals

- Expressive, fluent, and chainable syntax that is easy to remember.
- The syntax must be truly parsed to show errors and how to fix them.
- Flexible and customizable to work for as many situations as possible.
- Make use of theme colors or arbitrary colors in `hex`, `hsl`, and `rgb` formats.
- Make use of [color](https://www.npmjs.com/package/color) to manipulate the actual colors.

## A Little Background 

I built this plugin because I found myself running out colors, or not having enough subtlety between the color variations, especially when adding dark mode to applications. And the tonal difference between `slate` and `zinc` is the difference between `blue` and `brown` when it comes to consistently gradiated applications. In addition, the difference between `800` and `900` on the standard colors is pretty large. 

Let's take a button for example which has the attribute `class="rounded p-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"`. Three different colors to represent each state, but the active state and hover state are a bit too stark for my taste.

What I really want is the ability to do something like `bg-blue-650` or `bg-blue-625` without having to define anything in the config, let alone take time to figure what those values would be for each instance. And I especially don't want to use a color picker application of any kind, but rather have consistent mathematical derivitives of the colors inline with those defined in the theme.

## Getting Started

### NPM
```bash
npm i tailwind-colorize-plugin
```

### Yarn
```bash
yarn add tailwind-colorize-plugin
```

### Tailwind Config
```js
// tailwind.config.js
const colorize = require('tailwind-colorize-plugin');

module.exports = {
    plugins: [
        colorize()
    ]
}
```

## Available Methods

This plugin uses [color](https://www.npmjs.com/package/color) under the hood to process the actual color manipulations. The parser will analyze the syntax and expose an API that is very similar to the JS syntax.

```js
color.negate()  // rgb(0, 100, 255) -> rgb(255, 155, 0)

color.lighten(0.5)  // hsl(100, 50%, 50%) -> hsl(100, 50%, 75%)
color.lighten(0.5)  // hsl(100, 50%, 0)   -> hsl(100, 50%, 0)
color.darken(0.5)   // hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)
color.darken(0.5)   // hsl(100, 50%, 0)   -> hsl(100, 50%, 0)

color.lightness(50)  // hsl(100, 50%, 10%) -> hsl(100, 50%, 50%)

color.saturate(0.5)    // hsl(100, 50%, 50%) -> hsl(100, 75%, 50%)
color.desaturate(0.5)  // hsl(100, 50%, 50%) -> hsl(100, 25%, 50%)
color.grayscale()      // #5CBF54 -> #969696

color.whiten(0.5)   // hwb(100, 50%, 50%) -> hwb(100, 75%, 50%)
color.blacken(0.5)  // hwb(100, 50%, 50%) -> hwb(100, 50%, 75%)

color.fade(0.5)     // rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)
color.opaquer(0.5)  // rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 1.0)

color.rotate(180)  // hsl(60, 20%, 20%) -> hsl(240, 20%, 20%)
color.rotate(-90)  // hsl(60, 20%, 20%) -> hsl(330, 20%, 20%)

color.mix(Color("yellow"))        // cyan -> rgb(128, 255, 128)
color.mix(Color("yellow"), 0.3)   // cyan -> rgb(77, 255, 179)

// chaining
color.green(100).grayscale().lighten(0.6)
```

## Syntax

The plugin uses a PEG parser to tokenize the syntax and parse it in real time. The expression chain must start with a color. A color may be CSS color name, a Tailwind theme color, `hex`, `rgb`, or `hsl`. 

*The syntax is sensitive to whitespace. DO NOT use any spaces.*

### Color Syntax

Colors are defined by using their name as a literal, following by an optional weight, if its a theme color that has weights defined. The following are valid color example of how one would begin an expression.

```
// Theme Colors
red.500
slate.900
yellow.200
white

// CSS Color Names
cornsilk
bisque
coral

// Color Functions
rgb(225,0,0)
hsl(0,84.2,60.2)

// Hex Codes
#eee
#e0e0e0
```

### Method Chaining

Methods arguments are recursive. Each method must return a new instance of `Color`, so each method in the chain modifies a new instance until it reaches the end of the line.

```
// Concept
[color][.method(...args)?]*

// Theme Colors
red.500.darken(.1)
red.500.darken(.1).mix(yellow.200.darken(.1),.5)

// CSS Color Names
coral.darken(.1)
coral.darken(.1).mix(bisque.darken(.1),.5)

// Hex Codes
#eee.darken(.1)
#e0e0e0.darken(.1).mix(#eee,.5)
```