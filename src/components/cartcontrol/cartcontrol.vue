<template>
    <div class="cartcontrol">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"></div>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
</template>

<script>
    export default {
      name: "cartcontrol",
      props: {
        food: {
          type: Object
        }
      },
      created() {
        console.log(this.food);
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
      font-size: 0
      .cart-decrease, .cart-add
        display: inline-block
        padding: 6px               // 此处padding用于增加图标的点击区域，而不至于影响外观
        font-size: 24px
        line-height: 24px
        color: rgb(0,160,220)
      .cart-count
        display: inline-block
      .cart-add
        display: inline-block

</style>
