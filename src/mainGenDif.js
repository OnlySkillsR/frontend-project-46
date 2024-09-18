import _ from 'lodash';

const mainGenDif = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  const sortKeys = _.sortBy(_.union(keysObj1, keysObj2));

  const result = sortKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        name: key, type: 'added', value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key, type: 'deleted', value: obj1[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        name: key, type: 'hereditary', children: mainGenDif(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
      };
    }
    return {
      name: key, type: 'unchanged', value: obj1[key],
    };
  });
  return result;
};

export default mainGenDif;
