import Vue from "vue";
import Router from "vue-router";
import Configuration from "./views/Configuration .vue";
import About from "./views/About.vue";
import store from "@/store"

Vue.use(Router);

export const router = new Router({
    routes: [
        {
            path: "/",
            name: "Configuration",
            component: Configuration
        },
        {
            path: "/about",
            name: "about",
            component: About
        }
    ]
});
 router.beforeEach((to, from, next) => {
    console.log(to,'22222222222222222222222222');
    let userCode = store.state.code.userCode;
    let pickingLineCode = store.state.code.pickingLineCode;
    console.log(userCode,pickingLineCode);
    if(userCode === ''|| pickingLineCode === '') {
       
    }
     next()
});
// router.beforeEach((to, from, next) = > {

// })