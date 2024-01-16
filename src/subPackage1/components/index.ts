import React from 'react';

// imports all file except index.js
const context = require.context('.', true, /^(?!.\/index)/);

const modules = context.keys().reduce((acc: DynamicExports, key) => {
  const matchName = key.match(/^.+\/([^/]+)\/(.*?).jsx$/);

  if (matchName) {
    const fileName = matchName[matchName.length - 1];

    const target = context(key);

    if (target.default) {
      const component = target.default;
      if (React.isValidElement(component) === false) {
        console.warn('[dynamic exports] it not React Component', fileName, key);
        return acc;
      }

      acc[fileName] = target.default;
      if (acc[fileName]) {
        console.warn('[dynamic exports] overwirted module', fileName, key);
      }
    }
  }

  return acc;
}, {});

export = modules;

// define's types or interfaces
type DynamicExports = {
  [name: string]: React.FC,
};
