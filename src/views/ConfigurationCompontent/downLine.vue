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

          
            <el-form-item class="difs1">
                <el-button type="primary" @click="submitForm('ruleForm')" class="submit difs1">提交</el-button>
            </el-form-item>

            <!-- </el-form-item> -->
        </el-form>
    </div>
</template>

<script  lang="ts">
//------------------???--------------------
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

@Component
export default class downLine extends Vue {
  @Prop() keys: string;
  @Getter("nowName") nowName: any;
  @Getter("nowPort") nowPort: any;
  @Getter("allBox") allBox: any;
  @Getter("nowKey") nowKey: any;
  @Action("getPortInfoFun") getPortInfoFun: any;
  @Mutation("newNameFun") newNameFun: any;

  data: any = {
    portId: "",
    portName: "n",
    flowUnit: "票/min",
    flowWarnCountUnit: "次/0.5h",
    transportUnit: "票/h",
    effectiveTo: "2018-01-01",
    porttypeId: "2",
    transportThd: "3",
    flowThd: "4",
    flowWarnCount: "5"
  };
  validate = (rule: any, value: any, callback: any) => {
    // console.log(rule, value);
    if (rule.field === "portName") {
      if (value === "") {
        callback(new Error("请输入端口名称"));
      } else {
        callback();
      }
    } else if (rule.field === "effectiveTo") {
      if (value === "") {
        callback(new Error("请选择日期"));
      } else {
        callback();
      }
    } else if (rule.field === "flowThd") {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入流量阈值"));
      } else {
        callback();
      }
    } else if (rule.field === "flowWarnCount") {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入流量阈值"));
      } else {
        callback();
      }
    } else if (rule.field === "transportThd") {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入货量阈值"));
      } else {
        callback();
      }
    }
  };
  rules = {
    portName: [{ validator: this.validate, trigger: "blur" }],
    effectiveTo: [{ validator: this.validate, trigger: "blur" }],
    flowThd: [{ validator: this.validate, trigger: "blur" }],
    flowWarnCount: [{ validator: this.validate, trigger: "blur" }],
    transportThd: [{ validator: this.validate, trigger: "blur" }]
  };

  mounted() {}

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
    //  console.log(this.keys,'-------',this.getNowKey,'++++++++++++++++++');
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
          this.data.effectiveTo = (this as any).time1(res.effectiveTo);
          this.data.porttypeId = res.porttypeId;
          this.data.transportThd = res.transportThd;
          this.data.flowThd = res.flowThd;
          this.data.flowWarnCount = res.flowWarnCount;
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }
  submitForm(formName: any) {
    this.data.portId = this.nowPort;
    formName = this.$refs[formName] as Element;
    console.log(this.data);
    // console.log(this.nowKey);
    // console.log(this.lineList);
    this.data.porttypeId = this.nowKey;
    let upData = {} as any;
    let allList = [] as any; //所有关联端口的关系数组
    upData.portRel = JSON.stringify(this.allBox);
    upData.port = JSON.stringify([this.data]);
    formName.validate((valid: any) => {
      // console.log(this.data, "wwwwwwwwwwww");
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