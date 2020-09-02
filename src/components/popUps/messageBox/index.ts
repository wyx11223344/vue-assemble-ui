import { createApp } from 'vue';
import MessageBox from './MessageBox.vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const testDom = createApp(MessageBox);
const messageDom = testDom.mount('#popUps');

export default messageDom;
