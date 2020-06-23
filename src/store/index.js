import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pcLoginFlag: false, //pc端登入
    mbLoginFlag: false  //移动端登入
  },
  mutations: {
    pcChangeLogin(state) {
      state.pcLoginFlag = !state.pcLoginFlag;
    }
  },
  actions: {},
  modules: {}
});
