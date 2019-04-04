<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">更换手机号</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
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
          <input  type="password" class="aui-text-left aui-text-default"  maxlength="15"
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
            <div class="aui-list-item-label-icon">
              <span class="iconfont icon-jihua"></span>
            </div>
            <div class="aui-list-item-input">
              <input  type="text" class="aui-text-left aui-text-default"  maxlength="11"
                      placeholder="请输入新手机号" v-model="newphonenum" @blur="checkPhonenum">
            </div>
          </div>
        </li>
        <li class="aui-list-item" >
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <span class="iconfont icon-renzheng"></span>
            </div>
            <div class="aui-list-item-input" style="display: flex" >
              <input type="text" class="aui-text-left aui-text-default"  maxlength="4"
                      placeholder="请输入图片验证码" v-model="identifyCodeInput" >
              <span @click="refreshCode">
              <s-identify :identifyCode="identifyCode" ></s-identify></span>
            </div>
          </div>
        </li>
        <li class="aui-list-item" style="border: none">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <span class="iconfont icon-navicon-jhtx"></span>
            </div>
            <div class="aui-list-item-input" style="display: flex">
              <input  type="text" class="aui-text-left aui-text-default"  maxlength="4" @focus="checkIdenty"
                      placeholder="请输入短信验证码" v-model="phoneidentifyCodeInput">
              <button id="getcaptchabtn" class="normalbtn-main" style="min-width: 112px;margin-top: 7px" @click="getcaptcha">获取验证码</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="mainbtn-main" style="margin-top: 5rem" @click="revisePhonenum" >确定</div>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
  var self = null;    //在create方法中初始化为this
  const back_delete_ill = false;
  import { MessageBox } from 'mint-ui';
  import SIdentify from '../../../../components/page/identify.vue'
  export default {
    components: {
      's-identify':SIdentify
    },
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      self.init();
    },
    data(){
      return{
        password : '',                         //密码
        step1flg : true,                       //页面第一步显示标志
        step2flg : false,                      //页面第二步显示标志
        identifyCodes: "1234567890",           //验证码从数字中生成
        identifyCode: "",                      //验证码
        identifyCodeInput : "",                //输入的验证码
        newphonenum : '',                      //输入的手机号
        phoneidentifyCodeInput :'',            //（短信收到的）输入的验证码
        interval : null                        //定时器
      }
    },
    methods :{
      init : function () {
      },
      validatePassword : function () {
        var token = localStorage.getItem("token");
        var doc_id = localStorage.getItem("doc_id");
        var password = self.password;
        //验证密码是否输入正确
        self.api.doc_validatePassword({user_id : doc_id, password : password, token: token}).then((res) => {
          //self.common.consoledebug.log("res:" + JSON.stringify(res));
          if(!res.data.result){
            MessageBox('提示', '密码输入错误，请重试');
            return false;
          }else{
            //输入错误，重置验证码并初始化页面
            self.identifyCode = "";
            self.makeCode(self.identifyCodes, 4);
            self.step1flg = false;
            self.step2flg = true;
          }
      }).catch((err) => {
          self.common.consoledebug.log("err:" + JSON.stringify(err));
      });
      },
      checkIdenty : function () {
        if(self.identifyCodeInput == ""){
          MessageBox('提示', '请先输入图片验证码');
          self.refreshCode();
        }else if (self.identifyCode != self.identifyCodeInput){
          MessageBox('提示', '验证码输入错误，请重试');
          self.refreshCode();
        }
      },
      checkPhonenum : function () {
        var phonenum = self.newphonenum;
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(phonenum)) {
          MessageBox('提示', '手机号输入错误');
          return false;
        } else {
          return true;
        }
      },
      //获得短信验证码
      getcaptcha: function () {
        if(self.newphonenum == ""){
          MessageBox('提示', '请先输入手机号');
          return false;
        }
        if(self.checkPhonenum() == false)
        {
          MessageBox('提示', '手机号输入错误');
          return false;
        }
        var countdown = 60;
        document.getElementById("getcaptchabtn").innerText = countdown.toString() + "s";
        //开始计时
        self.interval = setInterval(function () {
          countdown = countdown - 1;
          document.getElementById("getcaptchabtn").innerText = countdown.toString() + "s";
          document.getElementById("getcaptchabtn").disabled = true;
          if (countdown < 0) {
            //60s失败时重置按钮内容
            document.getElementById("getcaptchabtn").innerText = "重新发送";
            document.getElementById("getcaptchabtn").disabled = false;
            countdown = 60;
            clearInterval(self.interval);
          }
        }, 1000);
        self.api.doc_validateNewPhonenum({phonenum : self.newphonenum}).then((res) => {
          //self.common.consoledebug.log("res:" + JSON.stringify(res));
        if(res.data.result == false)
        {
          MessageBox('提示',JSON.stringify(res.data.message).replace(/"/g,""));
          clearInterval(self.interval);
          document.getElementById("getcaptchabtn").disabled = false;
          document.getElementById("getcaptchabtn").innerText = "获取验证码";
          return false;
        }
      }).catch((err) => {
          self.common.consoledebug.log("err:" + JSON.stringify(err));
        MessageBox('提示', '发送验证码失败!');
      });
      },
      revisePhonenum: function () {
        var token = localStorage.getItem("token");
        var doc_id = localStorage.getItem("doc_id");
        var sm_validate = self.phoneidentifyCodeInput;
        var phonenum = self.newphonenum;
        //修改手机号
        self.api.doc_revisePhonenum({
          user_id: doc_id,
          sm_validate: sm_validate,
          phonenum: phonenum,
          token: token
        }).then((res) => {
          self.common.consoledebug.log("res:" + JSON.stringify(res));
        if (res.data.ret) {
          MessageBox('提示', '修改成功!');
          localStorage.setItem("doctor", JSON.stringify(res.data.ret));
        }else{
            MessageBox('提示', JSON.stringify(res.data.message).replace(/"/g,""));
            return false;
          }
      }).
        catch((err) => {
          self.common.consoledebug.log("err:" + JSON.stringify(err));
        MessageBox('提示', '修改失败!');
      })
      },
      //以下为验证码相关函数////
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        self.identifyCode = "";
        self.makeCode(self.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          self.identifyCode += self.identifyCodes[
            self.randomNum(0, self.identifyCodes.length)
            ];
        }
        //console.log(this.identifyCode);
      },
      clickBack : function () {
        //离开页面时清空计时器，以防离开时在进入计时器还在运行
        clearInterval(self.interval);
        self.common.clickBack();
      },
      home : function(){
        self.common.jumpToPage({router : self.$router, url : "/MBGL/doctor/index"})
      }
    }
  }
</script>
