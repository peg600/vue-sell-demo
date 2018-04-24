import Vue from 'vue';
import App from './App';        // 导入当前目录的App文件为App
import router from './router/index.js';


import './common/stylus/index.styl';

new Vue({
  el: '#app',            //vue父实例的挂载点
  router,
  render: h => h(App)
});
