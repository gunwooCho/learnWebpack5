// imports all file except index.js
const context = require.context('.', true, /^(?!.\/index)/);

context.keys().reduce((acc: DynamicExports, key) => {
  const matchName = key.match(/^.+\/([^/]+)\/(.*?).jsx$/);
  if (matchName) {
    const fileName = matchName[matchName.length - 1];

    const target = context(key);

    if (target.default) {
      module.exports[fileName] = target.default;
      if (acc[fileName]) {
        console.warn('[dynamic exports] overwirted module', fileName, key);
      }
    }
  }

  return acc;
}, {});

// define's types or interfaces
type DynamicExports = {
  [name: string]: React.FC,
};
