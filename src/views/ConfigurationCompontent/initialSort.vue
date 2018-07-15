<template>
    <div class="wrapper">
        <el-form :model="data" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <el-form-item label="活动名称:" prop="portName">
                <el-input v-model="data.portName"></el-input>
            </el-form-item>
            <el-form-item label="有效期至:" prop="effectiveTo">
                <el-date-picker type="date" placeholder="选择日期" v-model="data.effectiveTo" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="流量阈值:" required>
                <el-col :span="7">
                    <el-form-item prop="flowThd">
                        <el-input v-model="data.flowThd"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <p class="rFooter">{{data.flowUnit}}</p>
                </el-col>
                <el-col :span="7">
                    <el-form-item prop="flowWarnCount">
                        <el-input v-model="data.flowWarnCount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <p class="rFooter">{{data.flowWarnCountUnit}}</p>
                </el-col>
            </el-form-item>
            <el-form-item label="货量阈值:" prop="transportThd">
                <el-col :span="21">
                    <el-input v-model="data.transportThd"></el-input>
                </el-col>
                <el-col :span="3">
                    <p class="rFooter">{{data.transportUnit}}</p>
                </el-col>
            </el-form-item>
            <!-- <el-form-item label="" prop="name"> -->

            <el-transfer :render-content="renderFunc" filterable :props="{ key: 'value',label: 'desc'}" :titles="['人员列表', '已选人数']" v-model="value1" @change="handleChange" filter-placeholder="搜索内容" :data="datas" class="transfer">

            </el-transfer>
            <el-form-item label="外包人数:" prop="outcontractCount" class="difs">
                <el-input v-model="data.outcontractCount"></el-input>
            </el-form-item>
            <el-form-item label="外请人数:" prop="outlendCount" class="difs">
                <el-input v-model="data.outlendCount"></el-input>
            </el-form-item>
            <el-form-item class="difs1">
                <el-button type="primary" @click="submitForm('ruleForm')" class="submit difs1">提交</el-button>
            </el-form-item>

            <!-- </el-form-item> -->
        </el-form>
    </div>
</template>

<script  lang="ts">
//------------------初分口--------------------
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

@Component
export default class initialSort extends Vue {
  @Prop() keys: string;
  @State(state => state.element.rules)
  rules: any;
  @Getter("nowPort") nowPort: any;
  @Getter("nowKey") nowKey: any;
  @Getter("nowName") nowName: any;
  @Getter("lineList") lineList: any;
  @Action("getPortInfoFun") getPortInfoFun: any;
  @Mutation("newNameFun") newNameFun: any;
  @Mutation("dataFun") dataFun: any;

  data: any = {
    portId: "1",
    portName: "1",
    flowUnit: "票/min",
    flowWarnCountUnit: "次/0.5h",
    transportUnit: "票/h",
    effectiveTo: "1",
    porttypeId: "1",
    employeeList: [] as any,
    outlendCount: "1",
    outcontractCount: "1",
    transportThd: "1",
    flowThd: "1",
    flowWarnCount: "1"
  };
  value1 = [] as any;
  generateData = (list: any) => {
    // console.log("11111111122222");
    const data = [];
    for (let i = 1; i < list.length; i++) {
      data.push({
        value: JSON.stringify({
          employeeName: list[i].employeeName,
          employeeNo: list[i].employeeNo
        }),
        // value:i,
        desc: `${list[i].employeeNo} ${list[i].employeeName}-${list[i].orgName}`
        // disabled: i % 4 === 0
      });
    }
    return data;
  };
  employeechooseData = (list: any) => {
    //设置默认被选中人员
    let data = [];
    for (let i in list) {
      if (list[i].choose) {
        data.push(
          JSON.stringify({
            employeeName: list[i].employeeName || "",
            employeeNo: list[i].employeeNo || ""
          })
        );
      }
    }
    return data;
  };
  renderFunc = (h: any, option: any) => {
    let employeeName = JSON.parse(option.value).employeeName;
    let employeeNo = JSON.parse(option.value).employeeNo;
    return h("span", `${employeeName}-${employeeNo}`);
  };
  handleChange(value: any, direction: any, movedKeys: any) {
    console.log(value);
    let list = [];
    for (let i in value) {
      list.push(JSON.parse(value[i]));
    }
    this.data.employeeList = list;
    console.log(list);
  }
  employee = [] as any;
  datas = this.generateData(this.employee) as any;
  mounted() {
    console.log(this.rules, "eeeeeeeeeeeeeeeeeeeeee333333333333333333333");
  }
  @Watch("nowName")
  getName() {
    this.data.portName = this.nowName;
    // console.log(this.data.portName);
  }
  @Watch("data.portName")
  newName() {
    //  console.log(this.data.portName,'----------newName----------');
    this.newNameFun(this.data.portName);
  }
  @Watch("nowPort")
  getPortInfo(val: string, oldVal: string) {
    // console.log(val);
    let data = {
      portId: val
    };
    if (this.keys === this.nowKey) {
      // console.log("nowPort-----", this.nowPort);
      console.log(
        "当前点击port:-------",
        val,
        "当前点击nowKey:-------",
        this.nowKey
      );

      this.getPortInfoFun(data)
        .then((res: any) => {
          console.log(res);
          this.data.portId = res.portId;
          this.data.portName = res.portName;
          this.data.flowUnit = res.flowUnit;
          // this.data.flowWarnCountUnit = res.flowWarnCountUnit;
          this.data.transportUnit = res.transportUnit;
          this.data.downloadFlag = String(res.downloadFlag);
          this.data.effectiveTo = (this as any).time1(res.effectiveTo);
          this.data.porttypeId = res.porttypeId;
          this.data.outlendCount = res.outlendCount;
          this.data.outcontractCount = res.outcontractCount;
          this.data.transportThd = res.transportThd;
          this.data.flowThd = res.flowThd;
          this.data.flowWarnCount = res.flowWarnCount;
          // console.log(this.generateData());
          this.datas = this.generateData(res.employeeList);
          this.value1 = this.employeechooseData(res.employeeList);
          let emList = [];

          for (let i in this.value1) {
            emList.push(JSON.parse(this.value1[i]));
          }
          this.data.employeeList = emList;
          // console.log(this.value1);
          // console.log(this.value1);
          // if(recordPort.indexOf(portId) < 0) {
          //     this.recordPortFun(portId)//记录点击过的端口
          // }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }
  submitForm(formName: any) {
    formName = this.$refs[formName] as Element;
    console.log(this.data);
    this.dataFun(this.data);
    this.$emit("sub", formName);
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>