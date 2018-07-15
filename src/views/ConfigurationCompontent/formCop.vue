<template>
    <div class="wrapper">
           <upLoad   v-if="tabKey === 'upLoad'" keys='upLoad' />
           <stockLine v-if="tabKey === 'stockLine'" keys='stockLine'/>
           <initialSort v-if="tabKey === 'initialSort'" keys='initialSort'/>
           <downLine  v-if="tabKey === 'downLine'" keys='downLine'/>
           <downLoad  v-if="tabKey === 'downLoad'" keys='downLoad'/>

    </div>
</template>

<script  lang="ts">
import { Component, Vue,Prop } from "vue-property-decorator";
import upLoad from './upLoad.vue'
import stockLine from './stockLine.vue'
import initialSort from './initialSort.vue'
import downLine from './downLine.vue'
import downLoad from './downLoad.vue'
@Component({ components: { upLoad,stockLine,initialSort,downLine,downLoad} })
export default class formCop extends Vue {
    @Prop()  tabKey: string
    mounted () {
        // console.log(this.tabKey);
    }
}
</script>
<style lang="scss" scoped>
.wrapper {
   
}
</style>