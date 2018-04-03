import Vue from 'vue';
import Router from 'vue-router';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

Vue.use(Router);

const routes = [{
  path: '/',
  redirect: '/goods'
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

export default new Router({
  linkActiveClass: 'active',  // 当路由的a标签<router-link>被点击时，会自动为其添加一个默认为 v-link-active 的class用于
  routes                      // 设置高亮等样式，可通过linkActiveClass来修改默认class名，此处改为active
});
