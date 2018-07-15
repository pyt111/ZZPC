<template>
    <div class="wrapper">
        <el-form :model="data" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <el-form-item label="活动名称:" prop="portName">
                <el-input v-model="data.portName"></el-input>
            </el-form-item>
            <el-form-item label="有效期至:" prop="effectiveTo">
                <el-date-picker type="date" placeholder="选择日期" v-model="data.effectiveTo" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="是否即卸" prop="downloadFlag">
                <el-radio-group v-model="data.downloadFlag" class="radios">
                    <el-radio label="1">即卸</el-radio>
                    <el-radio label="0">非即卸</el-radio>
                </el-radio-group>
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
            <el-form-item label="对应路线:" prop="outlendCount">
                <el-select v-model="value7" placeholder="请选择" class="elselect">
                      <el-option-group
                        v-for="group in options3" :key="group.label":label="group.label">
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-option-group>
                </el-select>
                <!-- <el-input v-model="data.outlendCount"></el-input> -->
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
//------------------下货口--------------------
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

@Component
export default class downLoad extends Vue {
  @Prop() keys: string;
  @Getter("nowPort") nowPort: any;
  @Getter("allBox") allBox: any;
  @Getter("nowName") nowName: any;
  @Getter("nowKey") nowKey: any;
  @Getter("lineList") lineList: any;
  @Action("getPortInfoFun") getPortInfoFun: any;  
  @Mutation("newNameFun") newNameFun: any;
  

  data: any = {
    portId: "",
    portName: "",
    flowUnit: "票/min",
    flowWarnCountUnit: "次/0.5h",
    transportUnit: "票/h",
    downloadFlag: "",
    effectiveTo: "",
    porttypeId: "",
    employeeList: [] as any,
    outlendCount: "",
    outcontractCount: "",
    transportThd: "",
    flowThd: "",
    flowWarnCount: ""
  };
  value7 = '' as any;
  options3 =[{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }] as any;
  mounted() {}
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
    //   => {
    //     return `<span> +${JSON.parse(option.desc)}</span>`
    // }
    // `<span> +${JSON.parse(option.value).employeeName}</span>`
  };
  employee = [] as any;
  datas = this.generateData(this.employee) as any;
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
    } else if (rule.field === "outcontractCount") {
      if (value === "") {
        callback(new Error("请输入外包人数"));
      } else {
        callback();
      }
    } else if (rule.field === "outlendCount") {
      if (value === "") {
        callback(new Error("请输入外请人数"));
      } else {
        callback();
      }
    }
  };
  rules = {
    portName: [{ validator: this.validate, trigger: "blur" }],
    effectiveTo: [{ validator: this.validate, trigger: "blur" }],
    downloadFlag: [
      { required: true, message: "请选择是否即卸", trigger: "change" }
    ],
    flowThd: [{ validator: this.validate, trigger: "blur" }],
    flowWarnCount: [{ validator: this.validate, trigger: "blur" }],
    transportThd: [{ validator: this.validate, trigger: "blur" }],
    outlendCount: [{ validator: this.validate, trigger: "blur" }],
    outcontractCount: [{ validator: this.validate, trigger: "blur" }]
  };
  @Watch("nowName")
  getName() {
    this.data.portName = this.nowName;
    // console.log(this.data.portName);
  }
   @Watch("data.portName") 
   newName() {
    //  console.log(this.data.portName,'----------newName----------');
     this.newNameFun(this.data.portName)

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
      console.log("当前点击port:-------", val);

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
          console.log(this.value1);
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
  handleChange(value: any, direction: any, movedKeys: any) {
    console.log(value);
    let list = [];
    for (let i in value) {
      list.push(JSON.parse(value[i]));
    }
    this.data.employeeList = list;
    console.log(list);
  }
  submitForm(formName: any) {
    this.data.portId = this.nowPort;
    formName = this.$refs[formName] as Element;
    console.log(this.data);
    // console.log(this.nowKey);
    // console.log(this.lineList);
    this.data.porttypeId = this.nowKey;
    let upData = {} as any;
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
  .radios {
    position: absolute;
    left: 0;
    top: 8px;
  }
  .elselect{
      width: 100%;
  }
}
</style>