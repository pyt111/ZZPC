<template>
    <div class="wrapper">
           <upLoad   v-if="tabKey === 'upLoad'"@sub="sub" @closeLoading="closeLoading" keys='upLoad' />
           <stockLine v-if="tabKey === 'stockLine'"@sub="sub" @closeLoading="closeLoading" keys='stockLine'/>
           <initialSort v-if="tabKey === 'initialSort'"@sub="sub" @closeLoading="closeLoading" keys='initialSort'/>
           <downLine  v-if="tabKey === 'downLine'"@sub="sub" @closeLoading="closeLoading" keys='downLine'/>
           <downLoad  v-if="tabKey === 'downLoad'"@sub="sub" @closeLoading="closeLoading" keys='downLoad'/>

    </div>
</template>

<script  lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import upLoad from "./upLoad.vue";
import stockLine from "./stockLine.vue";
import initialSort from "./initialSort.vue";
import downLine from "./downLine.vue";
import downLoad from "./downLoad.vue";
import { Loading } from 'element-ui';
@Component({
  components: { upLoad, stockLine, initialSort, downLine, downLoad }
})
export default class formCop extends Vue {
  @Prop() tabKey!: string;
  @State(state => state.element.data) data:any;
  @State(state => state.element.loading) loading:any;
  @Getter("allBox") allBox: any;
  @Getter("nowKey") nowKey: any;
  @Getter("nowPort") nowPort: any;
  
  loadings:any
  mounted() {
    // console.log(this.tabKey);
  }
  @Watch('nowPort') 
  Loading() {
     this.loadings = this.$loading(this.loading);
  }
  closeLoading() {
      this.loadings.close();
  }
  sub(formName:any) {
      console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
    this.data.portId = this.nowPort;
    this.data.porttypeId = this.nowKey;
    let upData = {} as any;
    // console.log(this.lineList,'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    upData.portRel = JSON.stringify(this.allBox); //所有关联端口的关系数组
    upData.port = JSON.stringify([this.data]);
    // console.log(upData, "wwwwwwwwwwww111111111111111111");
    formName.validate((valid: any) => {
      
      if (valid) {
        this.$store.dispatch("lineDataFun", upData);
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>