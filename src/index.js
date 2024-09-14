import { readFileSync } from 'node:fs';
import getPars from "./parsing.js"
import path from 'path';
import mainGenDif from './mainGenDif.js';
import format from './format.js';


const gendiff = (filepath1, filepath2, formatFile = 'stylish') => {
    const getReadFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath));
    const getFormatFile = (filepath) => path.extname(filepath).slice(1); 

    const obj1 = getPars(getReadFile(filepath1), getFormatFile(filepath1));
    const obj2 = getPars(getReadFile(filepath2), getFormatFile(filepath2));

    const dif = mainGenDif(obj1, obj2);

    return format(dif, formatFile);
}

export default gendiff;