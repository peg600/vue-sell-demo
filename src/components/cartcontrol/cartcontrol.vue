<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <span class="inner icon-remove_circle_outline"></span>
          <!-- 父元素cart-decrease用于平移，子元素inner用于旋转 -->
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
      <!-- .stop用于阻止事件冒泡，,prevent用于阻止默认事件 -->
    </div>
</template>

<script>

  import Vue from 'vue';

    export default {
      name: "cartcontrol",
      props: {
        food: {
          type: Object
        }
      },
      created() {

      },
      methods: {
        addCart(event) {
          if (!event._constructed) {           // better-scroll自己派发的事件会有_constructed属性，将非自己派发的事件
            return;                           // return掉防止一次点击触发两次事件
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);   // Vue.set用于为某对象的子对象添加属性，不可直接为该对象添加根属性，此处为
          } else {                            // 不可添加与food属性同级的属性
            this.food.count++;
          }
          this.$emit('add', event.target);    // $emit用于子组件触发父组件中定义的事件，触发的事件范围仅限于当前组件，且
        },                                    // 只能被当前组件监听到。在父组件中，必须在子组件的标签上添加v-on才能监听
                                              // 到子组件用$emit触发的事件，但后面执行的方法可以是父组件中定义的方法
        decreaseCart(event) {
          if(!event._constructed) {
            return;
          }
          if(this.food.count) {
            this.food.count --;
          }
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
      font-size: 0
      .cart-decrease
        display: inline-block
        padding: 6px               // 此处padding用于增加图标的点击区域，而不至于影响外观
        opacity: 1
        transform: translate3d(0, 0, 0)   // 设置结束位置，3d意为开启硬件加速
        .inner
          display: inline-block    // 此处设置inline-block高度才不会为0，否则无法应用动画
          font-size: 24px
          line-height: 24px
          color: rgb(0,160,220)
          transition: all 0.4s linear
          transform: rotate(0)
        &.move-enter-active, &.move-leave-active
          transition: all 0.4s linear
        &.move-enter, &.move-leave-active
          opacity: 0
          transform: translate3d(24px,0,0)      // 结束位置
          .inner
            transform: rotate(180deg)
      .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        padding-top: 6px
        line-height: 24px
        text-align: center
        font-size: 10px
        color: rgb(147,153,159)
      .cart-add
        display: inline-block
        padding: 6px               // 此处padding用于增加图标的点击区域，而不至于影响外观
        font-size: 24px
        line-height: 24px
        color: rgb(0,160,220)

</style>
