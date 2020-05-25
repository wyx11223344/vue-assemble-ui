<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png"/>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
    components: { HelloWorld }
})
export default class Home extends Vue {

}
</script>
