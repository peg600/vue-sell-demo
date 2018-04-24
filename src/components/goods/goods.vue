<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <!-- ref用于注册子组件或子元素，注册的组件将会出现在它的父组件的$refs对象中，父组件可通过$refs访问子组件和其中的数据
        如：father.$refs.子组件ref属性的值.子组件中的属性或方法。
        注：ref是作为渲染结果被创建的，渲染初期不存在也无法访问；$refs不是响应式的，不可用于数据绑定 -->
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex===index}" ref="menuList"
              @click="selectMenu(index)">
            <!-- 将当前li在goods中的index值和currentIndex()方法返回的i值比较，若相等则为当前li添加current类，显示为白色 -->
            <span class="text border-1px">
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px)" @click="selectFood(food,$event)">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                    <!-- 此处监听的add事件来源于子组件中的$emit，只有将@add写在cartcontrol标签中才能监听到，但之后执行
                     的addFood可以由父组件goods的methods定义-->
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart">
      </shopcart>
      <!-- 为组件传入参数时，参数名不可用驼峰命名法，要用中间带-的形式如select-foods -->
    </div>
    <food :food="selectedFood" ref="food" @add="addFood"></food>
  </div>
</template>

<script>

  import axios from 'axios';
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import food from '../food/food';

  const ERR_OK = 0;

    export default {
      name: "goods",
      props:{
        seller:{
          type: Object
        }
      },
      data() {
        return {
          goods: [],
          listHeight: [],
          scrollY: 0,
          selectedFood: {}
        };
      },
      computed: {
        currentIndex() {         // 轮流将listHeight数组中的高度值区间与当前纵坐标比较，返回当前区间号i
          for(let i=0;i<this.listHeight.length;i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i+1];
            if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
              return i;
            }
          }
          return 0;
        },
        selectFoods() {                           // 先由App.vue从json中取得seller对象并传递给goods.vue;goods.vue又
          let foods = [];                        // 遍历seller对象得到foods并继续遍历得到food对象并将其传递给
          this.goods.forEach((good) => {         // cartcontrol.vue;cartcontrol.vue通过加减按钮为food对象添加count属性
            good.foods.forEach((food) => {       // 并通过$emit回传给goods.vue;goods.vue根据count属性生成被选中的食物
              if(food.count) {                   // 数组foods（select-foods）并和delivery-price，min-price一起传给组件
                foods.push(food);                // shopcart.vue;shopcart.vue根据这些和food.count计算总价，显示不同样式
              }
            });
          });
          return foods;
        }
      },
      created() {
        this.classMap = ['decrease','discount','special','invoice','guarantee'];
        axios.get('/api/goods').then((response) => {
          response = response.data;
          if (response.errno === ERR_OK) {
            this.goods = response.data;
            this.$nextTick(() => {    // $nextTick会在下次DOM更新循环结束之后执行延迟回调，即this._initScroll会在DOM更新
              this._initScroll();     // 后执行，避免初期渲染时就执行导致$refs中的内容无法访问，操作相关原生dom的时候要
              this._calculateHeight();// 在vue.$nextTick()中进行
            });
          }
        });
      },
      methods:{
        selectMenu(index) {
          if (!event._constructed) {
            return;
          }
          let foodList = this.$refs.foodList;
          let el = foodList[index];
          this.foodsScroll.scrollToElement(el,300);
        },

        _initScroll() {      // 下划线开头的方法一般为私有方法，外部可能调用的方法命名时不带下划线
          this.menuScroll = new BScroll(this.$refs.menuWrapper, {
            click: true
          });
          this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          });
          this.foodsScroll.on('scroll',(pos) => {           // 当菜品栏触发滚动事件时，将纵坐标四舍五入并取绝对值
            this.scrollY = Math.abs(Math.round(pos.y));     // 存入scrollY属性
          })
        },

        _calculateHeight() {               // 计算每一个单元距离顶部的高度，存入数组listHeight
          let foodList = this.$refs.foodList;
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            this.listHeight.push(height);
          }
        },

        addFood(target) {
          this._drop(target);
        },

        _drop(target) {
          this.$nextTick(() => {     // 异步执行小球动画，防止和减号图标滚动动画同时执行而卡顿
            this.$refs.shopcart.drop(target);
          });
        },
        selectFood(food,event) {
          if (!event._constructed) {
            return;
          }
          this.selectedFood = food;
          this.$refs.food.show();
        }
      },
      components: {
        shopcart,
        cartcontrol,
        food
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    width: 100%
    top: 174px
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border: none
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(1,17,27,0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(1,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .desc,.extra
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240,20,20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147,153,159)


          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px



</style>
