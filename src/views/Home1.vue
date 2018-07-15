<template>
    <div class="home">
        <div id="mountNode" ref="mountNode">

        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
// let G6 = require("@antv/g6");

// console.log(G6);
@Component({ components: { HelloWorld } })
export default class Home extends Vue {
    data = {
        nodes: [
            {
                id: "node1",
                x: 100,
                y: 200
            },
            {
                id: "node2",
                x: 300,
                y: 200
            }
        ],
        edges: [
            {
                id: "edge1",
                target: "node2",
                source: "node1"
            }
        ]
    };
    mounted() {
        let mountNode = this.$refs.mountNode as any; //给canvas定义宽高;
        let width = mountNode.offsetWidth;
        let height = mountNode.offsetHeight;
        console.log(width, height);
        console.log((this as any).G);
        let graph = new (this as any).G.Graph({
            container: "mountNode",
            width: width,
            height: height
        });

        graph.edge({
            style: function style() {
                return {
                    endArrow: true
                };
            }
        });
        graph.read(this.data);
        // console.log(graph);
    }
}
</script>
<style lang="scss" scoped>
.home {
    height: 100%;
    #mountNode {
        width: 90%;
        height: 80%;
        margin: 0 auto;
    }
}
</style>

