/*
 * @Description: 全局指令
 * @Date: 2020-03-19 15:25:06
 */
import Vue from 'vue';
const directives = {

    /**
     * 点击元素以外，用于关闭菜单
     * @param {type}
     * @return:
     */
    clickoutside: {
        bind: function(el, binding) {
            function documentHandler(e) {
                if (el.contains(e.target)) {
                    return false;
                }
                if (binding.expression) {
                    binding.value(e);
                }
            }
            el._vueClickOutside_ = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        unbind: function(el) {
            document.removeEventListener('click', el._vueClickOutside_);
            delete el._vueClickOutside_;
        }
    },

    /**
     * 列表滚动切换效果
     * @param {String} 传入状态值(传值为runLeft时向左消失，传值为runRight时向右消失，当请求完成后传值over回到正常显示)
     * 注：在改变状态时有动画时间，所以需要等动画完成后再进行请求，否则会出现动画问题，延迟设置为
     * setTimeOut(() => {
     *     fn(); // 请求接口
     * }， 550（固定动画时间） + 100 * data.length(数据长度))
     */
    listChange: {
        update: function(el, binding) {
            if (binding.value === binding.oldValue) return;
            setTimeout(() => {
                if (binding.value === 'runLeft' || binding.value === 'runRight') {
                    const CHECKNUM = binding.value === 'runLeft' ? -1 : 1;
                    el.childNodes.forEach((item, index) => {
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
                    el.childNodes.forEach((item, index) => {
                        if (item.style) {
                            item.style.transition = '';
                            item.style.transform = el.childNodes[0].style.transform;
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
};

/**
 * 循环遍历全局注册指令
 */
Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key]);
});
