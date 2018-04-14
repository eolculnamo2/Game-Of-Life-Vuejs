// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Grid from './components/Grid'
import Cell from './components/Cell'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  data: {
    cellStatuses: Array(100).fill(false),
    test: "TEST"
  },
  methods: {
    handleChange: function(x){
      this.cellStatuses = x;
    },
  },
  template: '<App :test="test" :cellStatuses="cellStatuses" @finalStep="handleChange($event)" />'
})
