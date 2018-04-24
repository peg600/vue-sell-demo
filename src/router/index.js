import Vue from 'vue';
import Router from 'vue-router';
import goods from '../components/goods/goods';     // 引入各组件
import ratings from '../components/ratings/ratings';
import seller from '../components/seller/seller';

Vue.use(Router);       // 告诉Vue使用Router

const routes = [{      // 配置各组件路径
  path: '/',
  redirect: '/goods'    // 将默认空路径重定向
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}];

const router = new Router({             // 创建新的Router实例用来管理路由，并将routes作为参数传入，输出router对象
  linkActiveClass: 'active',  // 当路由的a标签<router-link>被点击时，会自动为其添加一个默认为 v-link-active 的class用于
  routes                     // 设置高亮等样式，可通过linkActiveClass来修改默认class名，此处改为active
});

export default router
