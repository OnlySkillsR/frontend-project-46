import yaml from 'js-yaml';

const getPars = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
};

export default (data, format) => getPars[format](data);