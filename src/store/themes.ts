export default {
    state: {
        // 主题选择
        CHOOSE_THEME: 'normal',
        // 编辑器主题
        CHOOSE_EDITOR_THEME: 'tomorrow',
        // 是否热更新
        HOT_HTML: false
    },
    mutations: {
        CHANGE_THEME(state: any, theme: string) {
            state.CHOOSE_THEME = theme;
        },
        CHANGE_EDITOR_THEME(state: any, theme: string) {
            state.CHOOSE_EDITOR_THEME = theme;
        },
        CHANGE_HOT_HTML(state: any) {
            state.HOT_HTML = !state.HOT_HTML;
        }
    }
};
