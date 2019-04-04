<template>
  <div>
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack" >
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">身份选择</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
      </a>
    </header>
    <div class="aui-list-item-inner" style="margin-top:0.5rem">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item" v-show="docdispflg">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <input
                type="radio"
                id="doctor"
                value="doctor"
               v-model="role">
            </div>
            <div class="aui-list-item-input">
              医生
            </div>
          </div>
        </li>
        <li class="aui-list-item" v-show="nurdispflg" style="border:none">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <input
                type="radio"
                id="nurse"
                value="nurse"
               v-model="role">
            </div>
            <div class="aui-list-item-input">
              护士
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mainbtn-main" @click="roleUpdate" style="margin-top: 2rem">确定</div>
  </div>
</template>
<script>
var self = null; //在create方法中初始化为this
  const back_delete_ill = false;
import {MessageBox} from 'mint-ui';
export default {
  created() {
    self = this; //使用self来代替this，避免this无效
  },
  mounted(){
    //初始化页面
    var userid = localStorage.getItem("doc_id")
    this.api.doc_getRole({user_id : userid}).then((res)=>{
      this.common.consoledebug.log("role" + JSON.stringify(res.data.ret))
      self.init(res.data.ret);
    }).catch((err)=>{

    })
  },
  data() {
    return {
      role : '',
      docdispflg : true,
      nurdispflg : true,
    };
  },
  methods: {
    roleUpdate: function(){
      var doctor = null;
      var nurse = null;
      var userid = localStorage.getItem("doc_id");
      var token = localStorage.getItem("token");
      //更新
      this.api.doc_updateRole({user_id : userid, token : token, role : self.role}).then((res)=>{
        if(res.data.result == true)
        {
          MessageBox('提示', '身份选择成功！');
          self.common.jumpToPage({router: self.$router, url : "../homepage/myinfo"})
        }
      }).catch((err)=>{
        self.common.consoledebug.log("err : ")
      })
    } ,
    init : function(obj){
      //判断是否显示认证
      if(obj.doctor == null){
        self.docdispflg = false;
      }
      if(obj.nurse == null){
        self.nurdispflg = false;
      }
      if(obj.doctor == 1){
        self.role = "doctor";
      }else if(obj.nurse == 1){
        self.role = "nurse";
      }
    },
    clickBack : function() {
      self.common.clickBack();
    },
      home : function(){
        self.common.jumpToPage({router : self.$router, url : "/MBGL/doctor/index"})
      }
  }
};
</script>
<style>
</style>
