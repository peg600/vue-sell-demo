// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';        // 导入当前目录的App文件为App
import router from './router/index.js';
import axios from 'axios';

import './common/stylus/index.styl';

Vue.use(router);



new Vue({
  el: '#app',            //vue父实例的挂载点
  router,
  render: h => h(App)
});
