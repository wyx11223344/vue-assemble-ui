/*
 * @Description: 全局过滤器
 * @Date: 2020-03-19 15:25:13
 */
import Vue from 'vue';

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

const filters = {

    /**
     * 日期过滤
     * @param {日期} date
     * @param {*日期格式} fmt
     */
    formatdate(date, fmt = 'yyyy-MM-dd') {
        if (!date) return '';
        date = new Date(date);
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        const fmtObj = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (const k in fmtObj) {
            if (new RegExp(`(${k})`).test(fmt)) {
                const str = fmtObj[k] + '';
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
            }
        }
        return fmt;
    },
    // 数字中文单位转换
    quantityFormat(n) {
        const value = Number(n);
        if (!value) return n;
        let result = '';
        const k = 10000;
        const unit = ['', '万', '亿', '万亿'];
        if (value < k) {
            result = value;
        } else {
            const i = Math.floor(Math.log(value) / Math.log(k));
            result = ((value / Math.pow(k, i))).toFixed(0) + unit[i] + '+';
        }
        return result;
    }
};

/**
 * 循环遍历全局注册过滤器
 */
Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});
