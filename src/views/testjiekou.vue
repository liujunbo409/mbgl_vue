<template>
  <div >
    <div class="mainbtn-main" @click="doCeshi">测试接口按钮</div><br><br>
  </div>
</template>
<style scoped>


</style>

<script>
  import {axios_ajax, testapi} from "../assets/js/api";
  import {consoledebug} from "../assets/js/common";
  export default {
    methods :{
      doCeshi : function () {
        testapi({user_id: '48'}).then((res) => {
          consoledebug.log("res:" + JSON.stringify(res));
          var nickname = res.data.ret.nick_name;
          localStorage.setItem("nickname",nickname);
        }).catch((err) => {
          consoledebug.log("err:" + JSON.stringify(err));
        });

//        axios_ajax('http://de.lljiankang.top/api/user/h5/test', {user_id: '48'}, 'GET').then((res) => {
//          consoledebug.log("res:" + JSON.stringify(res));
//        }).catch((err) => {
//          consoledebug.log("err:" + JSON.stringify(err));
//        });
      }
    }
  }
</script>
