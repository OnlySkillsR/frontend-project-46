import json from './formats/json.js';
import stylish from './formats/stylish.js';
import plain from './formats/plain.js'

const format = { stylish, json, plain };

export default (diff, formatName) => format[formatName](diff);
