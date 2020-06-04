<template>
    <div class="f-all100">
        <router-view/>
        <right-configuration></right-configuration>
    </div>
</template>

<script>
import RightConfiguration from '../../components/popUps/RightConfiguration';

export default {
    components: { RightConfiguration },
    setup() {
        document.documentElement.setAttribute('data-theme', 'tomorrow');
    }
};
</script>

<style scoped lang="less">

</style>
