/* eslint-disable no-restricted-globals */
self.onmessage = ({ data }) => {
  console.log(data);
  self.postMessage({
    answer: 42,
  });
};
