<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!-- v-if作用：由于seller对象是通过axios异步获取，因此加载到此处时seller.supports=undefined，
          此时运行supports[0]会报错，故用v-if判断supports属性有无来延迟加载 -->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <!-- 此处两个span挨着是因为如果换行会导致它们之间有间隙，且为了中间文本能够显示省略号，不能通过将它们的父元素设置
      font-size：0px 来取消间隙，因此只能省略两个span之间的换行 -->
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow"></div>
  </div>
</template>

<script>
    export default {
      name: "vheader",
      props:{
        seller:{
          type:Object
        }
      },
      data() {
        return {
          detailShow: false
        }
      },
      methods:{
        showDetail() {
          this.detailShow = true
        }
      },
      created() {
        this.classMap = ['decrease','discount','special','invoice','guarantee'];
      }

    }
</script>

<style type="text/ecmascript-6" lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin.styl";

  .header
    color: white
    position: relative
    background: rgba(7,17,27,0.5)
    overflow: hidden
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0        // 此处若不将avatar和content的父元素content-wrapper设置字体大小为0，两个子元素间会有空隙
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 10px


      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background-color: rgba(0,0,0,0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      padding: 0 22px 0 12px
      height: 28px
      line-height: 28px
      background-color: rgba(7,17,27,0.2)
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        margin-top: 8px
        vertical-align: top
        bg-image(bulletin)
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        margin: 0 4px
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 10px


    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7,17,27,0.8)

</style>
