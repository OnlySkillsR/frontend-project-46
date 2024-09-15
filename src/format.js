import json from './formats/json.js';
import stylish from './formats/stylish.js';
import plain from './formats/plain.js'

const formatters = { stylish, json, plain };

export default (diff, formatName) => formatters[formatName](diff);
