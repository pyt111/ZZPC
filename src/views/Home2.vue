<template>
    <div class="home">
        <!-- <img src="../assets/logo.png"> -->
        <!-- <icon name="left" :w="200" :h="200"></icon> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
        <!-- <div id="divBox">
            <div class="Classification" ref="divs" v-for="item,key,i in allBox" :id="key" @click="change">
                <h1>{{item.}}</h1>

            </div>
        </div> -->
        <h3 class="h3">分拣线配置</h3>
        <div id="Box">
            <div id="scrollBox" ref="scrollBox">
                <div id="divBox" :style="{width:sw+11+'px',height:sh+45 + 'px'}">
                    <div class="canvasBox" ref="divBox">
                        <span class="portOP">端口关系配置</span>
                        <div class="Classification" ref="divs" v-for="item,key,i in allBox" :id="key">
                            <h1>{{item.portDesc}}</h1>
                            <div class="portBox" v-for="(c, x) in item.value" :key="x" ref="portBox" @click="clickPort(key)">
                                <div :id="c.portId" class="ports" ref="ports">

                                    <p>{{c.portDesc}}</p>
                                </div>
                            </div>
                            <div class="add" @click.stop="changeAdd(key)">
                                <h1>+</h1>
                            </div>
                        </div>
                        <canvas id="myCanvas" ref="myCanvas"></canvas>
                    </div>
                </div>

            </div>

            <div id="portMesg">

                <el-tabs v-model="activeName" @tab-click="handleClick">

                    <el-tab-pane v-for="(item,key, index) in allBox" :key="item.key" :label="item.portDesc" :name="key">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">

                            <div v-show="item.portDesc === '上货'">
                                <el-form-item label="活动名称:" prop="name">
                                    <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="有效期至:" prop="date">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </div>
                            <div v-show="item.portDesc === '进货线'">
                                {{item.portDesc}}
                            </div>
                            <div v-show="item.portDesc === '初分口'">
                                {{item.portDesc}}
                            </div>
                            <div v-show="item.portDesc === '下货线'">
                                {{item.portDesc}}
                            </div>
                            <div v-show="item.portDesc === '下货'">
                                {{item.portDesc}}
                            </div>
                        </el-form>

                    </el-tab-pane>
                    <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->

                </el-tabs>
            </div>

        </div>

    </div>
</template>

<script lang="ts">
import { equals } from "@/assets/js/p.ts";
import { Component, Vue } from "vue-property-decorator";
let UUID = require("es6-uuid");
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
@Component({ components: { HelloWorld } })
export default class Home extends Vue {
    allBox = {
        exhibit: {
            portDesc: "上货",
            value: [
                {
                    portDesc: "人工上货1",
                    portId: "div1",
                    endId: ["div3"]
                },
                { portDesc: "人工上货2", portId: "div2", endId: ["div4"] }
            ]
        },
        replenish: {
            portDesc: "进货线",
            value: [
                { portDesc: "进货线1", portId: "div3" },
                { portDesc: "进货线2", portId: "div4" }
            ]
        },
        firstscreen: {
            portDesc: "初分口",
            value: [
                { portDesc: "初分口1", portId: "div5" },
                { portDesc: "初分口2", portId: "div6" }
            ]
        },
        cargoWire: {
            portDesc: "下货线",
            value: [
                { portDesc: "初分口1", portId: "div7" },
                { portDesc: "初分口2", portId: "div8" }
            ]
        },
        unload: {
            portDesc: "下货",
            value: [
                { portDesc: "初分口1", portId: "div9" },
                { portDesc: "初分口2", portId: "div10" }
            ]
        }
    };
    ruleForm = {
        name: "",
        region: "",
        date: "",
        date2: "",
        delivery: false,
        type: [] as any,
        resource: "",
        desc: ""
    };

    validate = (rule: any, value: any, callback: any) => {
        console.log(rule, value);
        if (rule.field === "name") {
            if (value === "") {
                callback(new Error("请输入端口名称"));
            } else {
                callback();
            }
        } else if (rule.field === "date") {
             if (value === "") {
                callback(new Error("请选择日期"));
            } else {
                callback();
            }
        }
    };
    rules = {
        name: [{ validator: this.validate, trigger: "blur" }],
        date: [{ validator: this.validate, trigger: "blur" }]
    };
    activeName = "exhibit" as any;
    lineList = [] as any; //记录所有连的端口参数
    oldLineList = [] as any;
    allIdList = [] as any;
    scrollBoxH = 0 as number;
    scrollBoxW = 0 as number;
    x1 = 0 as number;
    y1 = 0 as number;
    x2 = 0 as number;
    y2 = 0 as number;
    d = "M0,1.5 L0,5 L6,3 z";
    pos1: any;
    pos2: any;
    c: any;
    ctx: any;
    portBoxs = [] as any;
    divBox: any;
    first = true;
    drow = true;
    list: any;
    updated() {
        // console.log();
        
        // this.lineList = []
        this.divBox = this.$refs.divBox as any; //给canvas定义宽高;
        this.c.width = this.divBox.offsetWidth;
        this.c.height = this.divBox.offsetHeight;
        this.getport();
        
        if (this.first) {
            this.initialize();
        }
    }
    get sw() {
        console.log(this.scrollBoxW);
        return this.scrollBoxW;
    }
    get sh() {
        return this.scrollBoxH;
    }
    handleClick(tab: any, event: any) {
        console.log(tab, event);
    }
    mounted() {
        let scroll = this.$refs.scrollBox as any; //初始化scrollBox的宽高 并赋值给子div
        this.scrollBoxW = scroll.offsetWidth;
        this.scrollBoxH = scroll.offsetHeight;
        // console.log(this.scrollBoxW,this.scrollBoxH);
        this.c = this.$refs.myCanvas as any;
        this.ctx = this.c.getContext("2d");
        this.divBox = this.$refs.divBox as any; //给canvas定义宽高;
        this.c.width = this.divBox.offsetWidth;
        this.c.height = this.divBox.offsetHeight;
        console.log(this.divBox.offsetWidth, this.divBox.offsetHeight);
        /** */
        // this.getport();
        // this.initialize();
        let allBox = this.allBox as any;

        this.divBox.onmousedown = (e: any) => {
            //divBox与canvas大小位置一致,所以获取使用divBox中的坐标;
            let oe = e || event;
            let sid = oe.target.id;
            let start = this.getLocation(oe.clientX, oe.clientY); //获取鼠标在canvans中的坐标
            let p = this.portBoxs.slice(0);
            console.log(p);
            let XY = {
                fromX: start.x,
                fromY: start.y
            } as any;
            /**
             * 点击line区域 start
             *
             */
            // 鼠标点击的坐标
            let px = start.x,
                py = start.y,
                lines = this.lineList;
            // console.log(lines, "wwwwwwwwwwwwww");
            let offset = 5; // 可接受（偏移）范围
            for (let q in lines) {
                //
                let p1X = lines[q].fromX; // 直线起点X
                let p1Y = lines[q].fromY; // 直线起点
                let p2X = lines[q].toX; // 直线终点
                let p2Y = lines[q].toY; // 直线终点
                let flag = 0; // 1 - 点中
                let minX = Math.min(p1X, p2X); // 较小的X轴坐标值
                let maxX = Math.max(p1X, p2X); // 较大的X轴坐标值
                let minY = Math.min(p1Y, p2Y); // 较小的Y轴坐标值
                let maxY = Math.max(p1Y, p2Y); // 较大的Y轴坐标值
                // console.log(minX,maxX,minY,maxY);
                if (p1Y === p2Y) {
                    // 水平线
                    // console.log( px >= minX,px <= maxX,py >= minY - offset ,py <= maxY + offset);
                    if (
                        px >= minX &&
                        px <= maxX &&
                        (py >= minY - offset && py <= maxY + offset)
                    ) {
                        console.log("水平直线");
                        lines.splice(q, 1); //删除数组中当前点击的线
                        let list = lines.slice(0);
                        console.log(list, "11111111111111111111111111111");
                        this.lineList = [];
                        this.drawAllLines(list);
                        // console.log(lines, "eeeeeeeeeeeee");

                        // 重画线
                        // console.log(lines);

                        flag = 1;
                        // lines[q].crossPoint = { x: px, y: p1Y }; // 直线上交叉点
                    }
                } else if (p1X === p2X) {
                    // 垂直线
                    if (
                        py >= minY &&
                        py <= maxY &&
                        (px >= minX - offset && px <= maxX + offset)
                    ) {
                        console.log("垂直直线");
                        flag = 1;
                        lines[q].crossPoint = { x: p1X, y: py }; // 直线上交叉点
                    }
                } else {
                    // 斜线 (先判断点是否进入可接受大范围(矩形)，然后再根据直线上的交叉点进行小范围比较)
                    if (
                        px >= minX &&
                        px <= maxX &&
                        (py >= minY - offset && py <= maxY + offset)
                    ) {
                        //求Y轴坐标
                        //方法1：根据tanθ= y/x = y1/x1, 即y = (y1/x1)*x  (该方法有局限性，垂直线(p2X - p1X)=0，不能用)
                        //let y = ((p2Y - p1Y) / (p2X - p1X)) * (px - p1X);

                        //方法2：先求弧度hudu，根据cosθ=x/r, r=x/cosθ,求得r，再根据sinθ=y/r, y=sinθ*r, 求得y
                        let hudu = Math.atan2(p2Y - p1Y, p2X - p1X); // 直线的弧度(倾斜度)
                        // 用三角函数计出直线上的交叉点
                        let r = (px - p1X) / Math.cos(hudu); // 直角三角形的斜边（或理解成圆的半径）
                        let y = Math.sin(hudu) * r; // Y轴坐标

                        let p = { x: px, y: p1Y + y }; // 直线上的交叉点
                        if (
                            Math.abs(px - p.x) <= offset &&
                            Math.abs(py - p.y) <= offset
                        ) {
                            console.log("斜线");
                            console.log(lines[q]);
                            lines.splice(q, 1); //删除数组中当前点击的线
                            let list = lines.slice(0);
                            //    console.log(list,'11111111111111111111111111111');
                            this.lineList = [];
                            this.drawAllLines(list);
                            flag = 1; // 1 - 点中
                        }
                        // lines[q].crossPoint = p; // 直线上的交叉点
                    }
                }
            }

            /**
             * 获取line区域end
             */
            let toXY = {} as any;
            // divBox.onmousemove = (e: any) => {
            //     // console.log(toXY);
            // };
            this.divBox.onmouseup = (e: any) => {
                let oe = e || event;
                console.log(oe.target.id);
                let endId = [oe.target.id];
                let end = this.getLocation(oe.clientX, oe.clientY);
                let endX = end.x,
                    endY = end.y;
                XY.toX = endX; //终点X坐标
                XY.toY = endY; //终点Y坐标
                console.log(XY);
                let datas = {};
                let IdList = [] as any; //所有已连接和被链接的端口的id数组
                let IdList2 = [sid, oe.target.id];
                for (let k in this.lineList) {
                    let list = [] as any;
                    // console.log(this.lineList[k].ids);
                    list.push(this.lineList[k].ids.sid);
                    list.push(this.lineList[k].ids.eid);
                    IdList.push(list);
                }
                // this.allIdList = IdList;
                let flag = [] as any;
                for (let a in IdList) {
                    // console.log(IdList[a],IdList2);
                    flag.push(equals(IdList[a], IdList2)); //判断已连接的id数组是否存在于已记录所有的id链接数组中
                    // console.log(IdList[a].equals(IdList2));
                }
                // console.log(flag);
                // console.log(flag.indexOf(true));
                if (flag.indexOf(true) < 0) {
                    //如果将要链接的两个端口的ID组成的数组不存在，则执行画线方法，否则不执行；
                    this.endDrow(p, XY, null, endId);
                } else {
                    console.log("此链接已存在");
                }

                this.divBox.onmousemove = null; //把鼠标移动清楚
                this.divBox.onmouseup = null; //把鼠标松开清楚
            };
            return false; //阻止FireFox的默认事件 bug
        };
    }
    getport() {
        // this.lineList = [];
        this.oldLineList = this.lineList.slice(0);
        this.lineList = [];
        //获取所有端口
        let lines = this.oldLineList;
        console.log(lines,'weeeeeeeeeeeeeeeee');
        let ports = this.$refs.ports as any;
        this.portBoxs = [];
        // console.log(ports);
        for (let i in ports) {
            let divL = this.getDivLocation(this.divBox, ports[i]);
            // console.log(ports[i].id);
            let cps = {
                x: divL.x,
                y: divL.y,
                x1: divL.x + ports[i].offsetWidth,
                y1: divL.y + ports[i].offsetHeight,
                id: ports[i].id
            };

            this.portBoxs.push(cps); //所有端口div的范围
        }
        console.log('11111111111111111111111111111111111');
        this.drawAllLines(lines);
        // console.log(this.portBoxs);
    }
    initialize() {
        // console.log(this.portBoxs);
        this.first = false;
        let allBox = this.allBox as any;
        let p1 = this.portBoxs.slice(0);
        for (let x in allBox) {
            // console.log(allBox[key],key)
            let value = allBox[x].value;

            for (let y in value) {
                let endId = value[y].endId;
                this.endDrow(p1, null, value[y].portId, endId);

                // for (let j in endId) {
                //     // console.log(value[y].endId);
                // }
            }
        }
    }
    drawAllLines(list: any) {
        console.log("--------------已清除-------------");
        this.ctx.clearRect(
            0,
            0,
            this.divBox.offsetWidth,
            this.divBox.offsetHeight
        );
        // console.log(list, "aaaaaaaaaaaaawwwwwwwwwwwww");
        for (let i in list) {
            let p = this.portBoxs.slice(0);
            // console.log(list[i]);
            this.endDrow(p, list[i], list[i].ids.sid, [list[i].ids.eid]);
        }
        // this.lineList = [];

        // this.drawArrow(this.lineList,this.lineList.ids)
        // this.initialize()
    }
    /**ctx：Canvas绘图环境
        fromX, fromY：起点坐标（也可以换成p1，只不过它是一个数组）
        toX, toY：终点坐标 (也可以换成p2，只不过它是一个数组)
        theta：三角斜边一直线夹角
        headlen：三角斜边长度
        width：箭头线宽度
        color：箭头颜色
    */
    drawArrow(data: any, ids: any) {
        // console.log(data,ids);
        let ctx = this.ctx;
        let fromX = data.fromX,
            fromY = data.fromY,
            toX = data.toX,
            toY = data.toY,
            theta = data.theta,
            headlen = data.headlen,
            width = data.width,
            color = data.color;
        let lineList = {
            fromX,
            fromY,
            toX,
            toY,
            ids
        };
        theta = typeof theta != "undefined" ? theta : 30;
        headlen = typeof headlen != "undefined" ? headlen : 10;
        width = typeof width != "undefined" ? width : 1;
        color = typeof color != "undefined" ? color : "#ccc";
        // 计算各角度和对应的P2,P3坐标
        let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);

        ctx.save();
        ctx.beginPath();

        let arrowX = fromX - topX,
            arrowY = fromY - topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        arrowX = toX + topX;
        arrowY = toY + topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(toX, toY);
        arrowX = toX + botX;
        arrowY = toY + botY;
        ctx.lineTo(arrowX, arrowY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.restore();
        // if(this.add) {

        this.lineList.push(lineList);
        console.log(this.lineList);
        // }
    }

    /**
     * p:所有端口
     * XY:画线的坐标
     */
    endDrow(p: any, XY: any, startId: any, endId: any) {
        // console.log(startId, endId);
        XY = XY || {};
        let startX = XY.fromX,
            startY = XY.fromY,
            endX = XY.toX,
            endY = XY.toY;
        // console.log(endId);
        for (let i in p) {
            //遍历每个端口DIV
            // console.log("startX > p[i].x---",startX > p[i].x,"---startX < p[i].x1---",startX < p[i].x1,"---startY > p[i].y---",startY > p[i].y,'---startY < p[i].y1----',startY < p[i].y1);
            if (
                (startX > p[i].x &&
                    startX < p[i].x1 &&
                    startY > p[i].y &&
                    startY < p[i].y1) ||
                p[i].id === startId
            ) {
                let ye = p.splice(i, 1); //删除鼠标点击的第一个div的坐标 并得到起始div的参数
                //将线定位在起始div的XY轴边框中间
                // console.log(ye);
                // console.log(ye[0].y1 - ye[0].y);
                XY.fromY = ye[0].y1 - (ye[0].y1 - ye[0].y) / 2;
                XY.fromX = ye[0].x1;
                // console.log(p);
                for (let x in p) {
                    //当当鼠标松开的时候 判断是否在除了被点击的第一个div外的其他div中
                    if (
                        (endX > p[x].x &&
                            endX < p[x].x1 &&
                            endY > p[x].y &&
                            endY < p[x].y1 &&
                            ye[0].x1 < p[x].x) ||
                        (endId != undefined && ye[0].x1 < p[x].x) //判断起始div的最大x坐标要小于 目标X最小x坐标 防止从右边的DIV链接到左侧div

                        // endId.length > 0
                    ) {
                        // console.log(p[x].id, endId);
                        for (let y in endId) {
                            // console.log('p[i].id === startId---',p[i].id === startId,'endId != undefined---',endId != undefined,'ye[0].x1 < p[x].x----',ye[0].x1 < p[x].x);
                            // console.log(p[x].id,endId[y]);
                            if (p[x].id === endId[y]) {
                                // console.log(p[x].id);
                                //将线定位在目标div的XY轴边框中间

                                XY.toY = p[x].y1 - (p[x].y1 - p[x].y) / 2;
                                XY.toX = p[x].x;
                                // console.log(XY);
                                // console.log("wwwwwwwwwwwwwww");
                                // console.log(XY);
                                let ids = {
                                    sid: ye[0].id,
                                    eid: p[x].id
                                };
                                this.drawArrow(XY, ids); //画线
                            }
                        }
                    }
                }
                // console.log(p);
                // console.log(i, "qqqqqqqqqqqqq");

                // if (XY.fromX !== XY.toX && XY.fromY !== XY.toY) {
                // }
            }
        }
    }
    getLocation(x: any, y: any) {
        let c = this.c;
        let bbox = c.getBoundingClientRect();
        return {
            x: (x - bbox.left) * (c.width / bbox.width),
            y: (y - bbox.top) * (c.height / bbox.height)

            /*
				 * 此处不用下面两行是为了防止使用CSS和JS改变了canvas的高宽之后是表面积拉大而实际
				 * 显示像素不变而造成的坐标获取不准的情况
				x: (x - bbox.left),
				y: (y - bbox.top)
				*/
        };
    }
    getDivLocation(divBox: any, odiv: any) {
        //获取元素原点坐标
        //点击的div相对于浏览器的left - divBox相对于浏览器的left为被点击div在canvas中的坐标位置
        let left =
            odiv.getBoundingClientRect().left -
            divBox.getBoundingClientRect().left;
        let top =
            odiv.getBoundingClientRect().top -
            divBox.getBoundingClientRect().top;
        return {
            x: left,
            y: top
        };
    }
    changeAdd(key: any) {
        let addData = {} as any;
        let allBox = this.allBox as any;
        this.first = false;
        // console.log(key);
        for (let Tkey in allBox) {
            // console.log(allBox[key],key)
            if (key === Tkey) {
                addData.portDesc = "人工上货n";
                addData.portId = UUID(32, 60);
                // console.log(allBox[Tkey]);
                console.log(UUID(32, 60));
                allBox[Tkey].value.push(addData);
            }
        }
        // this.oldLineList = this.lineList.slice(0);
        // this.lineList = [];
    }
    clickPort(key: any) {
        console.log(key);
        this.activeName = key;
    }
}
</script>
<style lang="scss" scoped>
.home {
    position: relative;
    height: 100%;
    padding: 0 5px;
    // padding: 0 20px 20px 20px;
    .h3 {
        text-align: left;
        height: 40px;
        linelist-height: 40px;
    }
    #Box {
        width: 100%;
        height: 90%;
        border: 1px solid #ccc;
        #portMesg {
            width: 30%;
            position: absolute;
            right: 0;
            top: 0;
            .demo-ruleForm {
                width: 90%;
                margin: 0 auto;
            }
        }
    }
    #myCanvas {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }
    #scrollBox {
        position: absolute;
        width: 70%;
        height: 90%;
        border: 1px solid #ccc;
        z-index: 0;
        overflow: hidden;
    }
    #divBox {
        position: absolute;
        // width: 102%;
        // height: 103%;
        top: -17px;
        left: 0;
        padding: 17px 0 45px 0;
        overflow: scroll;
        .canvasBox {
            position: relative;
            display: flex;
            padding: 50px 0 20px 0;

            .portOP {
                position: absolute;
                top: 0;
                left: 0;
                width: 130px;
                height: 40px;
                line-height: 40px;
                background: #f5f1f1;
            }
        }

        .Classification {
            height: 100%;
            width: 100%;
            & > h1 {
                width: 80%;
                border-bottom: 1px solid #ccc;
                margin: 0 auto;
                height: 50px;
            }
            .add {
                height: 40px;
                width: 100px;
                border: 1px solid #ccc;
                margin: 0 auto;
                cursor: pointer;
            }
        }
        .portBox {
            width: 120px;
            height: 80px;
            margin: 40px auto;
            position: relative;
            border-radius: 15px;

            .ports {
                width: 120px;
                height: 80px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                border: 1px solid #ccc;
                z-index: 10;
                border-radius: 15px;
                cursor: pointer;
            }
        }
        .portBox:hover {
            -moz-box-shadow: 0px 0px 10px #333333;
            -webkit-box-shadow: 0px 0px 10px #333333;
            box-shadow: 0px 0px 10px #333333;
            // -webkit-transform:scale(1.02);
            // transform:scale(1.02);
            // -moz-transform:scale(1.02);
            // border: 10px solid #ccc;
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
            -moz-transition: all 0.2s;
            z-index: 0;
        }
    }
    #div1,
    #div2 {
        position: absolute;
        width: 80px;
        height: 80px;
    }
    #div1 {
        left: 200px;
        top: 280px;
        background: rgba(205, 233, 198, 0.733);
    }
    #div2 {
        left: 300px;
        top: 160px;
        background: rgba(87, 68, 71, 0.479);
    }
}
</style>

