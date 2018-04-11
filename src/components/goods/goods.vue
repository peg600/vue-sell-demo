<template>
  <div class="goods">
    <div class="menu-wrapper"></div>
    <div class="foods-wrapper"></div>
  </div>

</template>

<script>

  import axios from 'axios'

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
          goods: []
        };
      },
      created() {
        axios.get('/api/goods').then((response) => {
          response = response.data;
          if (response.errno === ERR_OK) {
            this.goods = response.data;
            console.log(this.goods);
          }
        });
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

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
    .foods-wrapper
      flex: 1

</style>
