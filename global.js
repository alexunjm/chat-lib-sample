'use strict';

const path = require('path');

const globalConfig = {
    port: 3000,
    path_separator: path.sep,
    setProperties: (props) => {
        for (const key in props) {
            if (props.hasOwnProperty(key)) {
                globalConfig[key] = props[key]
            }
        }
    },
    htmlFolderFile: (location = ['index.html']) =>
      path.join(globalConfig.context_path, 'html', ...location)
}

module.exports = globalConfig;