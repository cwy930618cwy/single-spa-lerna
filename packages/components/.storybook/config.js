import { configure, addDecorator } from '@storybook/vue';
import centered from '@storybook/addon-centered'

addDecorator(centered)

function loadStories() {
  // You can require as many stories as you need.
  require('../stories');
}

configure(loadStories, module);