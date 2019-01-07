<template>
  <div>
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">密码修改</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <div v-show="step1flg">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item" style="border: none">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              账号密码
            </div>
            <div class="aui-list-item-input">
              <input type="password" class="aui-text-left aui-text-default" maxlength="15"
                     placeholder="请输入账号密码" v-model="password">
            </div>
          </div>
        </li>
      </ul>
      <div class="mainbtn-main" style="margin-top: 5rem" @click="validatePassword">下一步</div>
    </div>
    <div v-show="step2flg">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              新密码
            </div>
            <div class="aui-list-item-input">
              <input type="password" class="aui-text-left aui-text-default" maxlength="15"
                     placeholder="请输入新密码" v-model="newpassword">
            </div>
          </div>
        </li>
        <li class="aui-list-item" style="border: none">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              重复密码
            </div>
            <div class="aui-list-item-input">
              <input type="password" class="aui-text-left aui-text-default" maxlength="15"
                     placeholder="请再次输入新密码" v-model="confirmpassword">
            </div>
          </div>
        </li>
      </ul>
      <div class="mainbtn-main" style="margin-top: 5rem" @click="revisePassword" >保存新密码</div>
    </div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  import {MessageBox} from 'mint-ui';

  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    data(){
      return{
        password : '',                         //密码
        step1flg : true,                       //页面第一步显示标志
        step2flg : false,                      //页面第二步显示标志
        newpassword : '',                      //新密码
        confirmpassword : '',                  //确认新密码
      }
    },
    methods: {
      //验证密码是否输入正确
      validatePassword : function () {
        var token = localStorage.getItem("token");
        var doc_id = localStorage.getItem("doc_id");
        var password = self.password;
        self.api.doc_validatePassword({user_id : doc_id, password : password, token: token}).then((res) => {
          self.common.consoledebug.log("res:" + JSON.stringify(res));
        if(!res.data.result){
          MessageBox('提示', '密码输入错误，请重试');
          return false;
        }else{
          self.step1flg = false;
          self.step2flg = true;
        }
      }).catch((err) => {
          self.common.consoledebug.log("err:" + JSON.stringify(err));
      });
      },
      revisePassword : function () {
        var newpassword = self.newpassword;
        var confirmpassword = self.confirmpassword;
        var token = localStorage.getItem("token");
        //校验
        if(newpassword == "" || confirmpassword == ""){
          MessageBox('提示', '密码不能为空');
          return false;
        }else if(newpassword != confirmpassword){
          MessageBox('提示', '两次输入的密码必须一致');
          return false;
        }
        var doc_id = localStorage.getItem("doc_id");
        //修改密码
        self.api.doc_revisePassword({user_id : doc_id, password : self.password, new_password : newpassword, token : token}).then((res) =>{
          self.common.consoledebug.log("res:" + JSON.stringify(res));
          if(res.data.ret)
          {
            MessageBox('提示', '修改密码成功！');
          }
        }).catch((err)=>{
          self.common.consoledebug.log("err:" + JSON.stringify(err));
        })
      },
      clickBack : function () {
        self.common.clickBack();
      }
    }
  }

</script>
<style scoped>
</style>
