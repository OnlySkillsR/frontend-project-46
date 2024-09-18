import _ from 'lodash';

const getForm = (value) => {
  if (!_.isObject(value)) {
    const formValue = _.isString(value) ? `'${value}'` : `${value}`;
    return formValue;
  }
  return '[complex value]';
};

export default (data) => {
  const iter = (inData, path = []) => {
    const formData = inData.map((node) => {
      const pathElem = [...path, node.name];
      const newPath = pathElem.join('.');
      if (node.type === 'added') {
        return `Property '${newPath}' was added with value: ${getForm(node.value)}`;
      }
      if (node.type === 'deleted') {
        return `Property '${newPath}' was removed`;
      }
      if (node.type === 'changed') {
        return `Property '${newPath}' was updated. From ${getForm(node.oldValue)} to ${getForm(node.newValue)}`;
      }
      if (node.type === 'hereditary') {
        return `${iter(node.children, pathElem)}`;
      }
      if (node.type === 'unchanged') {
        return null;
      }
      throw new Error(`"${node.type}" type is not supported by the formatter`);
    })
      .filter((elem) => elem !== null);
    return `${formData.join('\n')}`;
  };
  return iter(data);
};
