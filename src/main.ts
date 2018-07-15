import Vue from "vue";
import App from "./App.vue";
import {router} from "./router";
import store from "./store";
import "./registerServiceWorker";
// import Icon from "vue2-svg-icon/Icon.vue";
import "@/assets/css/element.css";
import "@/assets/css/baseCss.css";
import vueMethods from '@/assets/js/vueMethods.ts';
Vue.use(vueMethods, {
    someOption: true
  });
// import jsPlumb from "jsplumb";
import {
    Button,
    Option,
    OptionGroup,
    Select,
    Tabs,
    TabPane,
    Form,
    FormItem,
    Input,
    DatePicker,
    Row,
    Col,
    Transfer,
    Radio,
  RadioGroup,
  
} from "element-ui";
// import vueMethods  from  "./assets/js/vueMethods";
// let G6 = require('@antv/g6') ;
// import "./assets/js/p.ts";
// Vue.prototype.G = G6 as any
Vue.config.productionTip = false;
//使用svg
// Vue.component("icon", Icon);
//使用jsPlumb
// Vue.prototype.$jsPlumb = jsPlumb.jsPlumb;
// Vue.use(vueMethods, {
//     someOption: true
//   });
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(DatePicker);
Vue.use(Row);
Vue.use(Col);
Vue.use(Transfer);
Vue.use(Radio);
Vue.use(RadioGroup);

Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

// console.log(Vue.prototype.$jsPlumb);
