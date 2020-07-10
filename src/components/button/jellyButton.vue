<template>
    <button class="btn btn-jelly" :class="type">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'JellyButton',
    props: {
        type: {
            type: String,
            default: 'primary'
        }
    }
};
</script>

<style scoped lang="less">
.btn{
    position: relative;
    padding: 6px 12px;
    margin: 5px;
    border: 1px solid;
    border-radius: 4px;
    outline: transparent;
    cursor: pointer;
    transition: 0.3s;
    &:hover{
        filter: brightness(120%);
    }
}
.primary {
    .mixin-font-color('base-backgroud-color');
    .mixin-background-color('base-symbol-color');
}
.info {
    .mixin-font-color('base-backgroud-color');
    .mixin-background-color('base-button-info-color');
}
.btn-jelly {
    &:hover {
        animation: jelly 0.5s;
    }
}
@keyframes jelly {
    25% {
        transform: scale(0.9, 1.1);
    }

    50% {
        transform: scale(1.1, 0.9);
    }

    75% {
        transform: scale(0.95, 1.05);
    }
}
</style>
