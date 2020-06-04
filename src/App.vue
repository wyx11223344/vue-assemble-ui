<template>
    <router-view/>
</template>

<style lang="less">
#app {
    position: absolute;
    width: 100%;
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    transition: 0.3s;
}
body {
    .mixin-font-color('base-font-color');
    font-family: "Microsoft YaHei";
}
a{
    .mixin-font-color('base-font-color');
}
</style>
