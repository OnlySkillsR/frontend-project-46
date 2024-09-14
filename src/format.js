import json from './formats/json.js';
import stylish from './formats/stylish.js';

const format = {stylish, json};

export default (diff, formatName) => format[formatName](diff);
