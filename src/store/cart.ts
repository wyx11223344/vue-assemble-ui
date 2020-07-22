export default {
    state: {
        // 购物车列表
        cartList: [],
        // 展示dia弹窗
        cartDiaShow: false
    },
    mutations: {
        changeCartList(state: any, obj: any) {
            const findNum = state.cartList.findIndex((item: any) => item.id === obj.id);
            if (findNum !== -1) {
                state.cartList.splice(findNum, 1);
            } else {
                state.cartList.push(obj);
            }
        },
        changeCartDiaShow(state: any) {
            state.cartDiaShow = !state.cartDiaShow;
        },
        removeAllCartList(state: any) {
            state.cartList.splice(0);
        }
    }
};
