import React from 'react';
import { ParentStorybookExampleComponent } from './ParentStorybookExampleComponent';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/ParentStorybookExampleComponent',
  component: ParentStorybookExampleComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const ParentStorybookExampleComponentExample = () => <ParentStorybookExampleComponent />;
