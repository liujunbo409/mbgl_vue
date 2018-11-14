<template>
  <div >
    <H3 style="font-size: 1.5rem">主要按钮</H3><br>
    <div class="mainbtn-main">主要按钮</div><br><br>
    <button class="mainbtn-secondary">次要按钮</button><br><br>
    <button class="mainbtn-disabled">不可点击</button><br><br>
    <H3 style="font-size: 1.5rem">一般按钮</H3><br>
    <button class="normalbtn-main">编辑</button><br>
    <button class="normalbtn-main-disabled">编辑</button><br><br>
    <button class="normalbtn-secondary" >编辑</button><br><br>
    <button class="normalbtn-secondary-disabled">编辑</button><br><br>
    <div class="normalbtn-secondary" @click="clickToast">测试Toast</div><br>
  </div>
</template>
<style scoped>


</style>

<script>
  import {Toast} from 'mint-ui';
  import {createToast} from "../assets/js/api";
  export default {
    methods :{
      clickToast : function () {
        createToast('已认可', 'iconfont icon-duihao', 1000, 'standard toast');
      }
    }
  }

</script>
