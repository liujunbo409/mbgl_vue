<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">自定义医院</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item" style="border: none">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              自定义医院
            </div>
            <div class="aui-list-item-input">
              <input type="text" class="aui-text-left aui-text-default" maxlength="15"
                     placeholder="请输入医院名称" v-model="cushospital">
            </div>
          </div>
        </li>
      </ul>
      <div class="mainbtn-main" style="margin-top: 5rem" @click="doCustomhospital">确定</div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    data(){
      return {
        cushospital : ''          //自定义医院的名称
      }
    },
    methods :{
      doCustomhospital : function(){
        if(self.cushospital == ''){
          MessageBox('提示', '医院名称不能为空！');
          return false;
        }
        self.common.goToApplyindex({router: self.$router, hospitalname : self.cushospital, hospital : 0});
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
  }

</script>
<style scoped>


</style>
