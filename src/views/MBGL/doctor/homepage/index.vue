<template>
  <div>
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">我的</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <ul class="aui-list aui-form-list">
      <li class="aui-list-item">
        <div class="aui-list-item-inner" @click="selTab(0)">
          <div class="aui-list-item-label">
            个人信息
          </div>
          <div class="aui-list-item-input">
            <a class="aui-pull-right" >
              <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
      <li class="aui-list-item">
        <div class="aui-list-item-inner" @click="selTab(1)">
          <div class="aui-list-item-label">
            账号管理
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
            资格认证
          </div>
          <div class="aui-list-item-input">
            <a class="aui-pull-right" >
              <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
    </ul>
    <ul class="aui-list aui-form-list" style="margin-top: 10px">
      <li class="aui-list-item" style="border: none" @click="selTab(3)">
        <div class="aui-list-item-inner">
          <div class="aui-list-item-label">
            反馈
          </div>
          <div class="aui-list-item-input" >
            <a class="aui-pull-right"  >
              <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
    },
    methods: {
      selTab: function (index) {
        switch (index) {
          //我的信息
          case 0:
            self.common.jumpToPage({router: self.$router, url : "../doctor/homepage/myinfo"});
            break;
          //账号管理
          case 1:
            self.common.jumpToPage({router: self.$router, url : "../doctor/homepage/management"});
            break;
          //资格认证
          case 2:
            self.common.jumpToPage({router: self.$router, url : "../doctor/homepage/myrole"});
            break;
          //反馈
          case 3:
            self.common.jumpToPage({router: self.$router, url : "../doctor/homepage/userfeedback"});
            break;
        }
      },
      clickBack : function () {
        self.common.clickBack();
      }
    }
  }
</script>
<style scoped>


</style>
