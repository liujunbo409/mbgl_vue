<template>
<header class="aui-bar aui-bar-nav">
  <a class="aui-pull-left" v-on:click="clickBack">
    <span class="aui-iconfont aui-icon-left"></span>
  </a>
  <div class="aui-title">{{title}}</div>
  <a class="aui-pull-right" href="">
    <span class="aui-iconfont aui-icon-home"></span>
  </a>
</header>
</template>
<script>
  export default {
    name: 'Test',
    props:['title'],
    methods: {
      clickBack:function(){
        alert('返回');
      },
    }
  };
</script>
