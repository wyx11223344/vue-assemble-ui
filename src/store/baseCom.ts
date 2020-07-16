export default {
    state: {
        // dia全部弹窗模糊层判断
        diaNum: 0
    },
    mutations: {
        addDiaNum(state: any) {
            state.diaNum++;
        },
        lowDiaNum(state: any) {
            state.diaNum--;
        }
    }
};
