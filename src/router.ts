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



//获取url中的参数
function getQueryVariable(variable:any) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return ('');
  }
 router.beforeEach((to, from, next) => {
    console.log(to,'22222222222222222222222222');
    let orgCode = store.state.code.orgCode;
    let pickingLineCode = store.state.code.pickingLineCode;
    console.log(orgCode,pickingLineCode);
    if(orgCode === ''|| pickingLineCode === '') {
      let orgCode = getQueryVariable('orgCode');
      let pickingLineCode =getQueryVariable('pickingLineCode');
      store.commit('getOrgCode', orgCode); //获取orgCode并缓存到全局
      store.commit('getPickingLineCode', pickingLineCode); //获取sessionId并缓存到全局
    //    console.log('999999999999999999999999999999999999999');
    }
     next()
});
// router.beforeEach((to, from, next) = > {

// })