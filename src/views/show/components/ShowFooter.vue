<template>
    <footer>
        <span>本网站由BEON倾力打造的vue组件管理、交流平台。</span>
        <section class="each-logo">
            <span class="font">我的社交平台</span>
            <a href="https://gitee.com/beon" target="_blank">
                <span class="logo">
                    <svg class="icon">
                        <use xlink:href="#iconmayun" />
                    </svg>
                </span>
            </a>
            <a href="https://juejin.im/user/5d1c80f5f265da1bcb4f4812" target="_blank">
                <span class="logo">
                    <svg class="icon">
                        <use xlink:href="#iconjuejin" />
                    </svg>
                </span>
            </a>
        </section>
    </footer>
</template>

<script>
export default {
    name: 'ShowFooter'
};
</script>

<style scoped lang="less">
footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    padding: 20px 40px;
    height: 80px;
    margin: auto;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    .each-logo{
        display: flex;
        line-height: 30px;
        .logo{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 15px;
            background-color: #e0e0e0;
            margin: 0 10px;
            cursor: pointer;
            transition: .3s;
            &:hover{
                background-color: #fff;
                transform: scale(1.1);
            }
            svg{
                width: 24px;
                height: 24px;
            }
        }
    }
}
</style>
