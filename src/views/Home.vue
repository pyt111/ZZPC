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
        <div id="divBox">
            <span class="portOP">端口关系配置</span>
            <div class="Classification" ref="divs" v-for="item,key,i in allBox" :id="key">
                <h1>{{item.name}}</h1>
                <div v-for="(c, x) in item.box" :key="x" :class="c.id" class="divs" ref="divs" @click.stop="change(key)">
                    <svg class="svgs" preserveAspectRatio="none">
                        <defs>
                            <marker id="arrow" markerUnits="strokeWidth">
                                <path :d="d" fill="#000" />
                            </marker>
                        </defs>
                        <line ref="line" @click.stop="aaa($event)" :x1="c.x1" :y1="c.y1" :x2="c.x2" :y2="c.y2" stroke="#000" stroke-width="2" marker-end="url(#arrow)" />
                    </svg>
                    <p>{{c.name}}</p>
                </div>

            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
@Component({ components: { HelloWorld } })
export default class Home extends Vue {
    svgList = [
        [{ x1: 0, y1: 0, x2: 0, y2: 0 }, { x1: 0, y1: 0, x2: 0, y2: 0 }],
        [{ x1: 0, y1: 0, x2: 0, y2: 0 }, { x1: 0, y1: 0, x2: 0, y2: 0 }]
    ];
    allBox = {
        exhibit: {
            name: "上货",
            box: [
                { name: "人工上货1",id: "div1",x1: 10,y1: 100,x2: 150,y2: 30 },
                { name: "人工上货2", id: "div2", x1: 0, y1: 0, x2: 130, y2: 0 }
            ]
        },
        replenish: {
            name: "进货线",
            box: [
                { name: "进货线1", id: "div3", x1: 0, y1: 0, x2: 0, y2: 0 },
                { name: "进货线2", id: "div4", x1: 0, y1: 0, x2: 0, y2: 0 }
            ]
        },
        firstscreen: {
            name: "初分口",
            box: [
                { name: "初分口1", id: "div5", x1: 0, y1: 0, x2: 0, y2: 0 },
                { name: "初分口2", id: "div6", x1: 0, y1: 0, x2: 0, y2: 0 }
            ]
        }
    };

    divList = [{ id: "div1" }, { id: "div2" }];
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 0;
    d = "M0,1.5 L0,5 L6,3 z";
    pos1: any;
    pos2: any;
    updated() {
        // console.log();
    }
    mounted() {
        // this.move();
        let line = this.$refs.line as any;
        // console.log(line);
        for(let i in line) {
            console.log(line[i].x1.baseVal.value);
        }
        // for(let i in line) {
        //     console.log((line as any)[i] );
        // }
    };
    aaa(e:any) {
        console.log('wwwwwwwwwwwwwwwwww')
    };
    change(key: any) {
        let allBox = this.allBox as any;
        console.log(key);
        for(let Tkey in allBox) {
            // console.log(allBox[key],key)
            if(key ===Tkey ) {
                // console.log(allBox[Tkey]);
            }
            
        }
    };
    getElCoordinate(dom: any) {
        // console.log(dom.classList.contains("wrap"));
        let t = dom.offsetTop;
        let l = dom.offsetLeft;
        let w = dom.offsetWidth;
        let h = dom.offsetHeight;
        dom = dom.offsetParent;
        while (dom.classList.contains("wrap")) {
            t += dom.offsetTop;
            l += dom.offsetLeft;
            dom = dom.offsetParent;
        }
        return {
            top: t, //Y轴坐标
            left: l, //X轴坐标
            width: w, //元素宽度
            height: h //元素高度
        };
    }

    getPos(pos1: any, pos2: any) {
        // console.log(pos1,pos2);
        console.log(pos1.top, pos2.top);
        //分两种情况
        let x1, y1, x2, y2;
        if (pos2.top < pos1.top) {
            console.log("wwwwwwwwwww");
            x1 = pos1.left + pos1.width / 2;
            y1 = pos1.top;
            y2 = pos2.top + pos2.height;
            if (pos2.left > pos1.left) {
                x2 = pos2.left + pos2.width / 2;
            } else {
                x1 = pos1.left + pos1.width / 2;
                y1 = pos1.top + pos1.height;
                x2 = pos2.left + pos2.width / 2;
                y2 = pos2.top;
            }
            return {
                start: { x: x1, y: y1 },
                end: { x: x2, y: y2 }
            };
        }
    }
    move() {
        console.log(this);
        let data: any;
        let div1 = this.$refs.div1;
        let div2 = this.$refs.div2;
        // console.log(div1);
        let pos1 = this.getElCoordinate(div1); //起点div的位置
        let pos2 = this.getElCoordinate(div2); //终点div的位置
        // if (data !== undefined) {
        data = this.getPos(pos1, pos2);
        let start = data.start;
        let end = data.end;
        //    let end = this.getPos(pos1, pos2)
        // }
        this.x1 = start.x;
        this.y1 = start.y;
        this.x2 = end.x;
        this.y2 = end.y;
        this.d = "M20,20 L100,100";
        // console.log(this.$refs.line.setAttribute('x1','50'));
        //    $('#line').attr({ x1: start.x, y1: start.y, x2: end.x, y2: end.y })
        //    $('#path').attr({ d: 'M20,20 L100,100' })
    }
}
</script>
<style lang="scss" scoped>
.home {
    position: relative;
    height: 100%;
    padding: 0 20px 20px 20px;
    .h3 {
        text-align: left;
        height: 40px;
        line-height: 40px;
    }
    #divBox {
        position: relative;
        height: 80%;
        display: flex;
        border: 1px solid #ccc;
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
        .Classification {
            height: 100%;
            width: 100%;
        }
        .divs {
            width: 200px;
            height: 100px;
            border: 1px solid #ccc;
            margin: 40px auto;
            z-index: 900;
        }
        .svgs {
            position: absolute;
            z-index: 100;
            // pointer-events: none;//禁止捕获click事件
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
        background: red;
    }
    #div2 {
        left: 300px;
        top: 160px;
        background: blue;
    }
}
</style>

