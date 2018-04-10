<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    <!-- 遍历itemClasses数组，将其中每一项的值（itemClass）绑定到class，根据class选择span的背景图片为全星、半星或空星，
    依次创建并渲染5个span -->
  </div>
</template>

<script>
  const LENGTH = 5;         // 定义评级的总星数
  const CLS_ON = "on";
  const CLS_HALF = "half";
  const CLS_OFF = "off";
    export default {
      name: "star",
      props:{               // 传入应用的图标大小和评分数
        size:{
          type: Number
        },
        score:{
          type: Number
        }
      },
      computed:{
        starType() {
          return "star-" + this.size;       // 根据传入的大小拼接class并更改容器class，以使用不同的css
        },
        itemClasses() {                      // 根据传入的评分计算有几个全星，是否有半星和空星（向下取整），形成数组
          let result = [];
          let score = (Math.floor(this.score*2))/2;
          let hasDecimal = score%1 !== 0;
          let integer = Math.floor(score);
          for (let i=0;i<integer;i++){
            result.push(CLS_ON);
          }
          if (hasDecimal){
            result.push(CLS_HALF);
          }
          while (result.length < LENGTH){
            result.push(CLS_OFF);
          }
          return result;
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl"

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height：15px
        margin-right: 16px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height：10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')


</style>
