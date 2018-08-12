import { storiesOf } from '@storybook/vue';
import DefaultComponent from '@/components/_component';

storiesOf('DefaultComponent', module).add('DefaultComponent default', () => ({
  components: { DefaultComponent },
  template: '<DefaultComponent>Default Component</DefaultComponent>',
}));
