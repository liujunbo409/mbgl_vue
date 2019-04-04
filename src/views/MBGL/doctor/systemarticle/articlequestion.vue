<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">文章问题</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
      </a>
    </header>
    <div class="question" v-for="item of questioninfo" >
      {{item.type}}{{item.question}}
      <div class="question" style="margin-top:0.8rem"v-for="item1 of item.answers">
        {{item1}}
        </div>
        <div style="margin-top:0.8rem;"><span style="margin-left:0.5rem">问题解析 ：</span>{{item.resolve}}</div>
    </div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  const back_delete_ill = false;
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      self.articleid = self.$route.query.articleid;
      self.init(self.articleid);
    },
    data(){
      return {
        articleid : '',   //文章id
        questioninfo : null, //问题
        answersinfo : null,
        answerstitle : ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. ', 'G. ','H. ']    //答案选项前缀
      }
    },
    methods :{
      init : function(articleid){
        self.api.doc_getArticleQuestion({article_id : articleid}).then((res)=>{
          //console.log("res : " + JSON.stringify(res.data.ret));
          for(var i = 0; i < res.data.ret.length; i++){
             self.answersinfo = res.data.ret[i].answers.split("&&");
             for(var j = 0; j< self.answersinfo.length;j++){
               self.answersinfo[j] = self.answerstitle[j] + String(self.answersinfo[j])
             }
             res.data.ret[i].answers = self.answersinfo;

             if(res.data.ret[i].type == '0'){
               res.data.ret[i].type = "【单选】"
             }else if(res.data.ret[i].type == '1'){
               res.data.ret[i].type = "【多选】"
             }
          }
          self.questioninfo = res.data.ret
          //console.log("answersinfo : " + JSON.stringify(self.answersinfo));
        }).catch((err)=>{

        })
      },
      clickBack : function () {
        self.common.clickBack();
      },
      home : function(){
        self.common.jumpToPage({router : self.$router, url : "/MBGL/doctor/index"})
      }
    },
  }

</script>
<style>
.question {
margin-top : 1.5rem;
margin-left : 0.5rem;
}
</style>