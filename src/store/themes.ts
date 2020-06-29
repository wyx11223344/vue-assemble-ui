export default {
    state: {
        // 主题选择
        CHOOSE_THEME: 'normal',
        // 编辑器主题
        CHOOSE_EDITOR_THEME: 'tomorrow',
        // 是否热更新
        HOT_HTML: false,
        // 字体大小
        FONT_SIZE: 12
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
        },
        CHANGE_FONT_SIZE(state: any, num: number) {
            state.CHOOSE_EDITOR_THEME = num;
        }
    }
};
