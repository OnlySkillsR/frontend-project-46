import _ from 'lodash';

const indent = (depth) => '   '.repeat(depth);

const valueTree = (value, depth) => {
    if (!_.isObject(value)) {
        return value;
    }

    const keys = Object.keys(value);
    const formValue = keys.map((key) => `${indent(depth + 2)}${key}: ${valueTree(value[key], depth + 1)}`) 
        return `{\n${formValue.join('\n')}\n${indent(depth + 1)}}`;
};

    export default (data) => {
        const iter = (inData, depth = 0) => {
            const formData = inData.flatMap((node) => {
                if (node.type === 'added') {
                    return `${`  + `}${node.name}: ${valueTree(node.value, depth)}`;
                };
                if (node.type === 'deleted') {
                    return `${`  - `}${node.name}: ${valueTree(node.value, depth)}`;
                };
                if (node.type === 'changed') {
                    return [`${`  - `}${node.name}: ${valueTree(node.oldValue, depth)}`,
                    `${`  + `}${node.name}: ${valueTree(node.newValue, depth)}`,
                ];
                };
                if (node.type === 'hereditary') {
                    return `${`    `}${node.name}: ${valueTree(node.value, depth + 1)}`;
                };
                if (node.type === 'unchanged') {
                    return `${`    `}${node.name}: ${valueTree(node.value, depth)}`;
                };
                throw new Error(`"${node.type}" type is not supported by the formatter`);
            });
            return `{\n${formData.join('\n')}\n}`;
        }
        return iter(data)
    }