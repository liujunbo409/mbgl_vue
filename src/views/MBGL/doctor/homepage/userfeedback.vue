<template>
  <div style="background-color:#FFFFFF">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">用户反馈</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <div style="margin-left:0.5rem;margin-top:1.5rem;color:#ddd">
      反馈内容
    </div>
    <ul class="aui-list aui-form-list" style="margin-top:0.5rem">
        <div class="aui-border-b">
                <textarea class="aui-font-size-14 aui-padded-10" style="width: 100%;height:auto;border: 0px;
                                        line-height: 22px;color:#666666;outline: none; overflow-y:visible" rows="6"
                          placeholder="请填写您的反馈内容，我们将尽快为您处理" maxlength="140" v-model="content"></textarea>
                </div>
      </ul>
    <div class="aui-bar aui-bar-tab aui-bg-info">
        <div class="aui-bar-tab-item aui-active" style="color:#FFFFFF"tapmode @click="doFeedBack">
            提交
        </div>
    </div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  import { MessageBox  } from 'mint-ui';
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
    },
    data(){
      return {
        content : '', //文章反馈内容
      }
    },
    methods :{
      doFeedBack : function(){
        if(self.content == ''){
           MessageBox('提示','反馈内容不能为空！');
           return false;
        }
        let params = {
          user_id : localStorage.getItem("doc_id"),
          token : localStorage.getItem("token"),
          content : self.content,
          mokuai : 'doctor_feedback'
        }
        self.api.doc_userFeedBack(params).then((res)=>{
          MessageBox('提交成功！','非常感谢您的反馈！');
          self.common.jumpToPage({router : self.$router, url : "../homepage"})
        }).catch((err)=>{
        })
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
  }

</script>
