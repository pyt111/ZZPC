import Vue from "vue";
import Vuex from "vuex";

import getters from './getters';
import t1 from './modules/t1';
import code from './modules/code';


Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        t1,
        code
    },
    getters
    // state: {},
    // mutations: {},
    // actions: {}
  });