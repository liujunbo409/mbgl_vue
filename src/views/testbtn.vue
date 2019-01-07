<template>
  <div >
    <test v-bind:title="title" ></test>
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
  var self = null;    //在create方法中初始化为this
  import {Toast} from 'mint-ui';
  import {createToast} from "../assets/js/api";
  import Test from './test';
  import FormTemplate from './formTemplate';
  import {clickBack} from "../assets/js/common";
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    data(){
      return {
        title: '按钮样式',
      }
    },
    methods :{
      clickToast : function () {
        createToast('已认可', 'iconfont icon-duihaocheckmark17', 1000, 'standard toast');
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
    components: {
      'test': Test,
      'FormTemplate':FormTemplate
    },
  }

</script>
