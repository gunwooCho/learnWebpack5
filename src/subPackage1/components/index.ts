const context = require.context('.', true, /^(?!.\/index)/);

context.keys()
  .map(key => key.match(/^.+\/([^/]+)\/(.*?).(js|jsx|ts|tsx)$/))
  .reduce((acc: DynamicExports, matchName) => {
    if (matchName) {
      const key = matchName[0];
      const fileName = matchName[matchName.length - 2];

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

// https://www.typescriptlang.org/ko/docs/handbook/modules.html#%EC%86%8D%EA%B8%B0-ambient-%EB%AA%A8%EB%93%88-shorthand-ambient-modules
declare module 'subpackage1/components';
