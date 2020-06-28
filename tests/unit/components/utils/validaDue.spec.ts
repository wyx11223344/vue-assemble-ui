/**
 * @author WYX
 * @date 2020/6/22
 * @Description: 判断new一个ValidaDue对象是否工作正常(具体判断操作校验是否正常需要放到具体组件模块中进行测试)
*/
import { expect } from 'chai';
import { createApp, isRef, reactive, provide } from 'vue';
import ValidaDue, { RefDom, ValidaPorops } from '@/components/utils/ValidaDue';

describe('ValidaDue.ts', () => {
    const props: ValidaPorops = {
        modelValue: '123',
        rules: { validate: [{ validateName: 'required', message: '不为空', trigger: ['input'] }, 'HtmlTag'], trigger: ['blur'], message: '输入错误' }
    };

    let checkValue: any;
    const testFn = (name: string, value: any) => {
        checkValue = value;
    };
    const dom: HTMLElement = document.createElement('div');
    dom.setAttribute('id', 'app');
    document.body.append(dom);
    const inputDom: RefDom = { value: document.createElement('input') };
    let validaDue: ValidaDue | undefined;

    const form = reactive([]);

    const testApp = createApp({
        setup() {
            provide('form', form);

            validaDue = new ValidaDue(props, testFn, inputDom);

            return {
                validaDue
            };
        }
    });
    testApp.mount('#app');

    it('is validaDue normal processing?', () => {
        expect(isRef(validaDue?.value)).to.be.true;
        expect(validaDue?.ValidaObject.validation.checkList instanceof Array).to.be.true;

        // 判断inject是否正常
        expect(form[0] === validaDue?.ValidaObject).to.be.true;

        // 判断emit是否正常
        expect(checkValue === validaDue?.value).to.be.true;
    });
});
