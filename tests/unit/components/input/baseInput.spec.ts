/**
 * @author WYX
 * @date 2020/6/22
 * @Description: 判断基础输入工具类是否正常
*/
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import { ComponentOptions } from 'vue';
import Directives from '@/utils/directives';
const Input: ComponentOptions = require('@/components/input/MateInput.vue').default;

describe('baseInput(validate by MateInput)', () => {
    const formValue = '999';
    // 注册指令
    Input.directives = { title: Directives.title };
    // 渲染
    const wrapper = mount(Input, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        props: {
            type: 'password',
            label: 'Password',
            rules: { validate: [{ validateName: 'required', message: '不为空', trigger: ['input'] }, 'HtmlTag'], trigger: ['blur'], message: '输入错误' },
            modelValue: formValue
        }
    });
    // input
    const input = wrapper.find('input');

    it('Is rendering?', () => {
        expect(input).to.exist;
    });

    it('v-model value send', () => {

        expect(wrapper.vm.inputObject.value).to.be.equal(formValue);

        const value = '123';
        input.setValue(value);
        expect(wrapper.vm.inputObject.value).to.be.equal(value);
    });

    it('Is ValidaRule working?', async() => {
        await input.setValue('');
        await new Promise((resolve) => {
            setTimeout(() => {
                expect(wrapper.vm.inputObject.check).to.be.false;
                expect(wrapper.vm.inputObject.errorMsg).to.be.equal('输入错误：不为空');
                resolve();
            });
        });

        const value = '123';
        await input.setValue(value);
        await input.trigger('blur');
        await new Promise((resolve) => {
            setTimeout(() => {
                expect(wrapper.vm.inputObject.check).to.be.false;
                expect(wrapper.vm.inputObject.errorMsg).to.be.equal('输入错误：请填写符合标准的html标签（开头为字母后段由字母、数字、下划线组成）');
                resolve();
            });
        });

        const realValue = 'ceshi';
        await input.setValue(realValue);
        setTimeout(() => {
            expect(wrapper.vm.inputObject.check).to.be.true;
        });
    });
});
