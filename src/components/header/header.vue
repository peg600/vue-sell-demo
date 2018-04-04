<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand">
            <img src="" alt="">
          </span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!-- v-if作用：由于seller对象是通过axios异步获取，因此加载到此处时seller.supports=undefined，
          此时运行supports[0]会报错，故用v-if判断supports属性有无来延迟加载 -->
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
    export default {
      name: "vheader",
      props:{
        seller:{
          type:Object
        }
      }

    }
</script>

<style type="text/ecmascript-6" lang="stylus">
  .header
    background: black
    color: white
    .content-wrapper
      padding: 24px 12px 18px 24px
      .avatar
        display: inline-block
      .content
        display: inline-block

</style>
