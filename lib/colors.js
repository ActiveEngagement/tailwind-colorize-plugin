const Color = require('color');
const coreColors = require('tailwindcss/colors');
const useConfig = require('./useConfig');

let interval = 10;

const { parse } = useConfig()

const ignoreColors = [
  'inherit',
  'current',
  'transparent',
  'black',
  'white',
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray'
];

function decimal(i, start) {
    i = parseInt(i);

    start = parseInt(start);

    return start < 100 ? i / 100 : (i - start) / 100;
}

function walk([start, color], remaining) {
    const [next] = remaining, items = [
        [start, color]
    ];

    for(let i = parseInt(start) + interval; i < parseInt(next[0]); i+=interval) {
        items.push([i, () => Color(color).mix(Color(next[1]),decimal(i, start)).rgb().toString()]);
    }

    return items.reduce((carry, [i, item]) => Object.assign(carry, {[i]: item}), {});
}

const colorEntries = Object.keys(coreColors)
  .filter(value => !ignoreColors.includes(value))
  .map(value => [value, Object.entries(coreColors[value])])
  .map(([key, colors]) => {
    const subject = {};
    
    while(colors.length > 1) {
      Object.assign(subject, walk(colors.shift(), colors));
    }

    return [key, subject]
  })

const colors = Object.fromEntries(colorEntries);

module.exports = colors;