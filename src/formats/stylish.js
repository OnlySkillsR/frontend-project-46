import _ from 'lodash';

const indent = (depth) => '    '.repeat(depth);

const getValue = (value, depth) => {
    if (!_.isObject(value)) {
        return value;
    }

    const keys = Object.keys(value);
    const formattedValue = keys.map((key) => `${indent(depth + 2)}${key}: ${getValue(value[key], depth + 1)}`);
    return `{\n${formattedValue.join('\n')}\n${indent(depth + 1)}}`;
};

export default (data) => {

    const iter = (innerData, depth = 0) => {
        const formattedData = innerData.flatMap((node) => {
            if (node.type === 'added') {
                return `${indent(depth)}  + ${node.name}: ${getValue(node.value, depth)}`;
            }
            if (node.type === 'deleted') {
                return `${indent(depth)}  - ${node.name}: ${getValue(node.value, depth)}`;
            }
            if (node.type === 'unchanged') {
                return `${indent(depth)}    ${node.name}: ${getValue(node.value, depth)}`;
            }
            if (node.type === 'changed') {
                return [
                `${indent(depth)}  - ${node.name}: ${getValue(node.oldValue, depth)}`,
                `${indent(depth)}  + ${node.name}: ${getValue(node.newValue, depth)}`,
                ];
            }
            if (node.type === 'hereditary') {
                return `${indent(depth)}    ${node.name}: ${iter(node.children, depth + 1)}`;
            }
            throw new Error('"${node.type}" type is not supported by the formatter');
        });

        return `{\n${formattedData.join('\n')}\n${indent(depth)}}`;
    };
    return iter(data);
}