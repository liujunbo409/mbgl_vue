<template>
  <div >
    <div v-show="step1flg">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">医院科室选择</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <ul class="aui-list aui-form-list" style="margin-top:0.5rem">
        <li class="aui-list-item" v-for="(item,key) of departmentinfo" @click="selectdepartment(item)">
          <div class="aui-list-item-inner">
            <div class="">
              {{item.name}}
            </div>
            <div class="">
            <a class="aui-pull-right" >
              <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
          </div>
        </li>
    </ul>
    <div class="aui-bar aui-bar-nav" @click="customDepartment">+自定义</div>
  </div>
  <div v-show="step2flg">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">自定义科室</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
  </div>
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
        departmentinfo : null,              //该医院下所有科室
        step1flg : true,
        step2flg : false,
      }
    },
    methods :{
      init : function(){
        //获取参数医院id
        var hospitalid = self.$route.query.hospital;
        //获取科室列表
        self.api.doc_getDepartmentList({hospital_id : hospitalid}).then((res)=>{
          self.common.consoledebug.log(JSON.stringify(res.data.ret));
          self.departmentinfo = res.data.ret;
        }).catch((err)=>{
        })
      },
      selectdepartment : function(data){
        self.common.consoledebug.log(data)
        self.common.goToApplyindex({router: self.$router, departmentid : data.id, departmentname : data.name});
      },
      customDepartment : function(){
        self.step1flg = false;
        self.step2flg = true;
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
  }

</script>
<style scoped>


</style>
