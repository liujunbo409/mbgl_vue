<template>
  <div v-if="showFlag">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">账号管理</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <ul class="aui-list aui-form-list">
      <li class="aui-list-item">
        <div class="aui-list-item-inner" @click="selTab(0)">
          <div class="aui-list-item-label">
            更换手机号
          </div>
          <div class="aui-list-item-input">
            <a class="aui-pull-right" >
              <span style="color: #B3B3B3">{{phonenum}}</span><span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
      <li class="aui-list-item">
        <div class="aui-list-item-inner" @click="selTab(1)">
          <div class="aui-list-item-label">
            密码修改
          </div>
          <div class="aui-list-item-input">
            <a class="aui-pull-right" >
              <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
      <li class="aui-list-item" style="border: none">
        <div class="aui-list-item-inner" @click="selTab(2)">
          <div class="aui-list-item-label">
            解绑微信号
          </div>
          <div class="aui-list-item-input">
            <a class="aui-pull-right" >
              <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
</style>

<script>
  var self = null;    //在create方法中初始化为this
  import { MessageBox  } from 'mint-ui';
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    data(){
      return{
        phonenum : '',
        showFlag : false
      }
    },
    mounted(){
      self.init();    //初始化
    },
    methods :{
      //初始化
      init : function () {
        self.phonenum = JSON.parse(localStorage.getItem("doctor")).phonenum;
        self.showFlag = true;
      },
      selTab : function (index) {
        switch (index){
          case 0 :
            MessageBox.confirm('是否更换手机号?').then(action => {
            self.common.jumpToPage({router: self.$router, url : "../homepage/revisephonenum"});}).catch((err)=>{});
            break;
          case 1 :
            MessageBox.confirm('是否修改密码?').then(action => {
            self.common.jumpToPage({router: self.$router, url : "../homepage/revisepassword"});}).catch((err)=>{});
            break;

        }
      },
      clickBack : function () {
        self.common.clickBack();
      }
    }
  }

</script>
