/**
 * @author WYX
 * @date 2020/5/26
 * @Description: 全局指令(类型判断全是any，vue类型不完整)
*/

interface MyEl extends HTMLElement{
    _vueClickOutside_?: Function;
    _vueTitleIn_?: Function;
    _vueTitleOut_?: Function;
    _vueTitleMove_?: Function;
    boxDom?: Element;
}

export default class Directives {

    /**
     * 点击元素以外，用于关闭菜单
     * @param {type}
     * @return:
     */
    static clickoutside: object = {
        beforeMount: (el: MyEl, binding: any) => {
            function documentHandler(e: any) {
                if (el.contains(e.target)) {
                    return false;
                }
                if (binding.value) {
                    binding.value(e);
                }
            }
            el._vueClickOutside_ = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        unbind: function(el: any) {
            document.removeEventListener('click', el._vueClickOutside_);
            delete el._vueClickOutside_;
        }
    }

    /**
     * 列表滚动切换效果
     * @param {String} 传入状态值(传值为runLeft时向左消失，传值为runRight时向右消失，当请求完成后传值over回到正常显示)
     * 注：在改变状态时有动画时间，所以需要等动画完成后再进行请求，否则会出现动画问题，延迟设置为
     * setTimeOut(() => {
     *     fn(); // 请求接口
     * }， 550（固定动画时间） + 100 * data.length(数据长度))
     */
    static listChange: object = {
        updated: function(el: HTMLElement, binding: any) {
            if (binding.value === binding.oldValue) return;
            setTimeout(() => {
                if (binding.value === 'runLeft' || binding.value === 'runRight') {
                    const CHECKNUM = binding.value === 'runLeft' ? -1 : 1;
                    el.childNodes.forEach((item: any, index: any) => {
                        if (item.style) {
                            item.style.transition = '';
                            item.style.transform = `translateX(${0})`;
                            setTimeout(() => {
                                item.style.transition = 'all .5s';
                                item.style.transform = `translateX(${CHECKNUM * 100}%)`;
                                setTimeout(() => {
                                    item.style.transition = '';
                                    item.style.transform = `translateX(${CHECKNUM * -100}%)`;
                                }, 550);
                            }, index * 100);
                        }
                    });
                } else if (binding.value === 'over') {
                    el.childNodes.forEach((item: any, index: any) => {
                        if (item.style) {
                            item.style.transition = '';
                            item.style.transform = (el.childNodes[0] as HTMLElement).style.transform;
                            setTimeout(() => {
                                item.style.transition = 'all .5s';
                                item.style.transform = `translateX(${0}%)`;
                            }, index * 100);
                        }
                    });
                }
            });
        }
    }

    static title = {
        beforeMount: (el: MyEl, binding: any) => {
            let timeOut: number;

            const boxDom: HTMLElement = document.createElement('section');
            el.boxDom = boxDom;
            el.boxDom.innerHTML = binding.value;
            boxDom.setAttribute('class', 'v-title-content');

            // 鼠标进入事件
            function mouseIn() {
                if (timeOut) return;
                el.addEventListener('mousemove', mouseMove);
                timeOut = window.setTimeout(() => {
                    timeOut = 0;
                    document.body.append(boxDom);
                }, 500);
            }

            // 鼠标移出事件
            function mouseOut() {
                if (timeOut) clearTimeout(timeOut);
                timeOut = 0;
                boxDom.remove();
                el.removeEventListener('mousemove', mouseMove);
            }

            // 鼠标移动事件
            function mouseMove(e: MouseEvent) {
                const bodyHeight: number = (document.getElementById('app') as HTMLElement).clientHeight;
                const getHeight: number = boxDom.clientHeight > 41 ? boxDom.clientHeight : 41;
                boxDom.style.left = `${e.clientX + 10}px`;
                boxDom.style.top = `${(e.clientY + 8) > bodyHeight - getHeight - 2 ? bodyHeight - getHeight - 2 : e.clientY + 8}px`;
            }

            el._vueTitleIn_ = mouseIn;
            el._vueTitleOut_ = mouseOut;
            el._vueTitleMove_ = mouseMove;
            el.addEventListener('mouseleave', mouseOut);
            el.addEventListener('mouseenter', mouseIn);
        },
        updated: function(el: MyEl, binding: any) {
            el.boxDom && (el.boxDom.innerHTML = binding.value);
        },
        unbind: function(el: any) {
            el.removeEventListener('mouseenter', el._vueTitleIn_);
            el.removeEventListener('mousemove', el._vueTitleMove_);
            el.removeEventListener('mousemove', el._vueTitleOut_);
            delete el._vueTitleMove_;
            delete el._vueTitleIn_;
            delete el._vueTitleOut_;
        }
    }
}
