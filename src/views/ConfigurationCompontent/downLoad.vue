<template>
    <div class="wrapper">
        <el-form :model="data" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <el-form-item label="端口名称:" prop="portName">
                <el-col :span="21">
                    <el-input v-model="data.portName"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="有效期至:" prop="effectiveTo">
                <el-col :span="21">
                    <el-date-picker type="date" placeholder="选择日期" :picker-options="pickerOptions0" v-model="data.effectiveTo" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="是否即装" prop="uploadFlag">
                <el-radio-group v-model="data.uploadFlag" class="radios">
                    <el-radio label="1">即装</el-radio>
                    <el-radio label="0">非即装</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="流量阈值:" required>
                <el-col :span="5">
                    <el-form-item prop="flowThd">
                        <el-input v-model="data.flowThd"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <p class="rFooter">{{data.flowUnit}}</p>
                </el-col>
                <el-col :span="5">
                    <el-form-item prop="flowWarnCount">
                        <el-input v-model="data.flowWarnCount"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <p class="rFooter">{{data.flowWarnCountUnit}}</p>
                </el-col>
            </el-form-item>
            <el-form-item label="货量阈值:" prop="transportThd">
                <el-col :span="19">
                    <el-input v-model="data.transportThd"></el-input>
                </el-col>
                <el-col :span="3">
                    <p class="rFooter">{{data.transportUnit}}</p>
                </el-col>
            </el-form-item>
            <el-form-item label="对应路线:" prop="routeJsonArray">
                <el-select v-model="routeJsonArray1" filterable multiple @change="change" placeholder="请选择" class="elselect">
                    <el-option-group v-for="group,i in routeJsonArray" :key="group.label" :label="group.label">
                        <el-option v-for="item,x in group.option" :key="item.label" :label="item.label" :value="item.value">
                        </el-option>
                    </el-option-group>
                </el-select>
                <!-- <el-input v-model="data.outlendCount"></el-input> -->
            </el-form-item>
            <!-- <el-form-item label="" prop="name"> -->

            <el-transfer :render-content="renderFunc" filterable :props="{ key: 'value',label: 'desc'}" :titles="['人员列表', '已选人数']" v-model="value1" @change="handleChange" target-order="unshift" filter-placeholder="搜索内容" :data="datas" class="transfer">

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
    @Prop() keys!: string;
    @State(state => state.element.rules)
    rules: any;
    @State(state => state.element.pickerOptions0)
    pickerOptions0: any;
    @Getter("nowPort") nowPort: any;
    @Getter("allBox") allBox: any;
    @Getter("nowName") nowName: any;
    @Getter("nowKey") nowKey: any;
    @Getter("lineList") lineList: any;
    @Action("getPortInfoFun") getPortInfoFun: any;
    @Mutation("newNameFun") newNameFun: any;
    @Mutation("dataFun") dataFun: any;
    routeJsonArray1 = [] as any;
    data: any = {
        portId: "",
        portName: "",
        flowUnit: "票/min",
        flowWarnCountUnit: "次/0.5h",
        transportUnit: "票/h",
        uploadFlag: "",
        effectiveTo: "",
        porttypeId: "",
        employeeList: [] as any,
        outlendCount: "",
        outcontractCount: "",
        transportThd: "",
        flowThd: "",
        flowWarnCount: "",
        routeJsonArray: "" as any
    };
    ruleForm: any;
    routeJsonArray = [] as any;
    changeWay = [] as any;
    mounted() {
        // console.log(this.data.routeJsonArray);
    }
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
                desc: `${list[i].employeeNo} ${list[i].employeeName}-${
                    list[i].orgName
                }`
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
        let formName = this.$refs["ruleForm"] as any;
        formName.resetFields();
        // console.log(val);
        // console.log("3333333333333333333333333333333333");
        // this.routeJsonArray1 = [];
        // this.routeJsonArray = [];
        // this.data.routeJsonArray = [];
        let data = {
            portId: val,
            portIdType: this.nowKey
        };
        //  console.log(this.keys,'-------',this.getNowKey,'++++++++++++++++++');
        if (this.keys === this.nowKey) {
            // console.log("nowPort-----", this.nowPort);
            console.log("当前点击port:-------", val);

            this.getPortInfoFun(data)
                .then((res: any) => {
                    this.routeJsonArray1 = [];
                    this.routeJsonArray = [];
                    this.data.routeJsonArray = [];
                    console.log(res);
                    this.data.portId = res.portId || "";
                    this.data.portName = res.portName || "";
                    this.data.flowUnit = res.flowUnit || "";
                    // this.data.flowWarnCountUnit = res.flowWarnCountUnit;
                    this.data.transportUnit = res.transportUnit || "";
                    this.data.uploadFlag = res.uploadFlag + "" || "";
                    console.log(this.data.uploadFlag);
                    this.data.effectiveTo = (this as any).time1(
                        res.effectiveTo || ""
                    );
                    this.data.porttypeId = res.porttypeId || "";
                    this.data.outlendCount = res.outlendCount || "";
                    this.data.outcontractCount = res.outcontractCount || "";
                    this.data.transportThd = res.transportThd || "";
                    this.data.flowThd = res.flowThd || "";
                    this.data.flowWarnCount = res.flowWarnCount || "";
                    // console.log(this.generateData());
                    this.datas = this.generateData(res.employeeList || "");
                    this.value1 = this.employeechooseData(
                        res.employeeList || ""
                    );
                    this.routeJsonArray = res.routeJsonArray || "";

                    let routeJsonArray = res.routeJsonArray || "";
                    //  this.routeJsonArray = routeJsonArray;//对应路线
                    let routeList = [];
                    for (let x in routeJsonArray) {
                        let op = routeJsonArray[x].option;
                        for (let y in op) {
                            console.log(op[y].choose);
                            if (op[y].choose) {
                                routeList.push(op[y].value);
                            }
                        }
                        //  console.log(routeJsonArray[x].option);
                    }
                    console.log(routeList, "wwwwwwwwwwwwwwwwwwww");
                    console.log(this.routeJsonArray1);
                    this.routeJsonArray1 = routeList; //对应路线初始默认值
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
                    this.$emit("closeLoading");
                })
                .catch((err: any) => {
                    console.log(err);
                    this.$emit("closeLoading");
                });
        }
    }
    change(val: any) {
        // this.changeWay = [];
        // let routeJsonArray = this.routeJsonArray;
        // let list = routeJsonArray.slice(0)
        // //   console.log(list);
        // for (let i in val) {
        //     //   console.log(val[i]);
        //     for (let x in list) {
        //         //   console.log(list[x]);
        //         //   list[x].option = []
        //         let option = list[x].option;
        //         for (let y in option) {
        //             //   console.log(option[y].value,val[i]);
        //             if (option[y].value === val[i]) {
        //                 this.changeWay.push(option[y]);
        //     //         //     console.log(routeJsonArray[x].value);
        //             }
        //         }
        //     }
        // }
        // console.log(this.changeWay);
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
        formName = this.$refs[formName] as Element;
        // let changeWay = this.changeWay;
        let val = this.routeJsonArray1;
        console.log(this.data.routeJsonArray);
        // this.changeWay = [];
        let routeJsonArray = this.routeJsonArray;
        let list = JSON.parse(JSON.stringify(routeJsonArray));
        for (let y in list) {
            list[y].option = [];
        }
        //   console.log(list);
        for (let i in val) {
            //   console.log(val[i]);
            for (let x in routeJsonArray) {
                //   console.log(list[x],'111111111111');
                let option = routeJsonArray[x].option;
                let option2 = list[x].option;

                for (let y in option) {
                    //   console.log(option[y].value,val[i]);
                    if (option[y].value === val[i]) {
                        option2.push(option[y]);
                        console.log(option[y], option2, "wwwwwwwwwwwwwwww");
                        // this.changeWay.push(option);
                        // option2 = option
                        //         //     console.log(routeJsonArray[x].value);
                    }
                }
            }
        }

        console.log(list);
        console.log(routeJsonArray);
        this.data.routeJsonArray = list;
        console.log(this.data);
        this.dataFun(this.data);
        this.$emit("sub", formName);
        // console.log(this.nowKey);
        // console.log(this.lineList);
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
    .elselect {
        width: 100%;
    }
}
</style>