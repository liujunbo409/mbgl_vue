<template>
  <div >
    从LocalStorage中获取到的信息是：{{nickname}}
    <div class="mainbtn-main" @click="clear">清空storage</div><br><br>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        nickname : localStorage.getItem("nickname")
      }
    },
    methods :{
      clear : function () {
        localStorage.clear();
        window.location.replace("http://localhost:8080/testlocalstorage");
      }
    }
  }

</script>
<style scoped>
</style>
