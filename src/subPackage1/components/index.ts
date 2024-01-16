// imports all file except index.js
const context = require.context('.', true, /^(?!.\/index)/);

type DynamicExports = {
  [name: string]: React.Component,
};

const modules = context.keys().reduce((acc: DynamicExports, key) => {
  const matchName = key.match(/^.+\/([^/]+)\/(.*?).jsx$/);

  if (matchName) {
    const fileName = matchName[matchName.length - 1];

    const target = context(key);
    if (target.default) {
      acc[fileName] = target.default;

      if (acc[fileName]) {
        // eslint-disable-next-line no-console
        console.warn('[dynamic exports] overwirted module', fileName, key);
      }
    }
  }

  return acc;
}, {});

export = modules;
