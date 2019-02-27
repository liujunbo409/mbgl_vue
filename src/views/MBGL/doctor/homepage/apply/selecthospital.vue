<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">选择医院</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <ul class="aui-list aui-form-list" style="margin-top:0.5rem">
        <li class="aui-list-item" v-for="(item,key) of hospitalinfo" @click="selecthospital(item)">
          <div class="aui-list-item-inner">
            <div class="">
              {{item.hospital_name}}
            </div>
            <div class="">
            <a class="aui-pull-right" >
              <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
          </div>
        </li>
    </ul>
    <div class="aui-bar aui-bar-nav" @click="customHospital">+自定义</div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      self.init();
    },
    data(){
      return {
        hospitalinfo : null,
      }
    },
    methods :{
      init : function(){
        //获取医院列表
        self.api.doc_getHospitalList({}).then((res)=>{
          //self.common.consoledebug.log(JSON.stringify(res.data.ret));
          self.hospitalinfo = res.data.ret;
        }).catch((err)=>{
        })
      },
      selecthospital : function(data){
        //self.common.consoledebug.log(data)
        self.common.goToApplyindex({router: self.$router, hospitalname : data.hospital_name, hospital : data.id});
      },
      customHospital : function(){
        self.common.jumpToPage({router: self.$router, url : "../apply/customhospital"})
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
  }

</script>
<style scoped>


</style>
