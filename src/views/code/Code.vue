<template>
    <div class="f-all100">
        <router-view/>
        <right-dia>
            <right-configuration></right-configuration>
        </right-dia>
    </div>
</template>

<script>
import RightDia from '../../components/popUps/RightDia';
import RightConfiguration from './components/RightConfiguration';

export default {
    components: { RightConfiguration, RightDia }
};
</script>

<style scoped lang="less">

</style>
