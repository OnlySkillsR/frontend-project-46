/* eslint-disable no-undef */

import fs from 'fs'; import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
const readFile = (fileName) => fs.readFileSync(fixturePath(fileName), 'utf-8'); 

test.each( [ 
    ['file1.json', 'file2.json', 'stylish', 'expected_stylish.txt'], 
    ['file1.yml', 'file2.yml', 'stylish', 'expected_stylish.txt'],

])( 'Diff test (%#)', (file1, file2, outputFormat, expectedFile) => {
    // eslint-disable-next-line no-unused-vars
    const recived = gendiff(fixturePath(file1), fixturePath(file2), outputFormat);
    // eslint-disable-next-line no-unused-vars
    const expected = readFile(expectedFile); })