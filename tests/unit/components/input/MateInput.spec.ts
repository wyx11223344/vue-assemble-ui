/**
 * @author WYX
 * @date 2020/6/22
 * @Description: 判断MateInput组件是否渲染正常
*/
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import { ComponentOptions } from 'vue';
import Directives from '@/utils/directives';
const Input: ComponentOptions = require('@/components/input/MateInput.vue').default;

describe('MateInput.vue', () => {
    // 注册指令
    Input.directives = { title: Directives.title };
    // 渲染
    const wrapper = mount(Input);
    // input
    const input = wrapper.find('input');

    it('Is props null rendering?', () => {
        expect(input).to.exist;
    });

    it('Input value', () => {
        const value = '123';
        input.setValue(value);
        expect(wrapper.vm.inputObject.value).to.be.equal(value);
    });
});
