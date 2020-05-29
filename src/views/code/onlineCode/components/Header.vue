<template>
    <div class="header-main">
        <section class="default-show">

        </section>
    </div>
</template>

<script>
export default {
    name: 'Header'
};
</script>

<style scoped lang="less">
.header-main{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #eaecef;
    z-index: 1;
    .default-show{
        height: 65px;
    }
}
</style>
