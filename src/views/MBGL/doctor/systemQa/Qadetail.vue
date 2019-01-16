<template>
  <div v-if="detailinfo != null">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">{{title}}</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <div class="aui-text-center aui-margin-t-15" style="position: relative;text-align: left;font-weight: bold;margin-left: 0.5rem;">
        <span class="font-size-18">{{detailinfo.question}}
        </span>
    </div>
    <div class="aui-text-center aui-margin-t-10 aui-text-default" style="float:left;width:100%;">
        <span class="" style="font-size:0.55rem;color:#B3B3B3;margin-left:0.5rem">
          {{detailinfo.oper_name}}&nbsp;&nbsp;{{detailinfo.created_at}}
          浏览数：{{count.doctor_show_num}}
        </span>
    </div>
     <div  style="float:left;margin-left:1rem;width:100%">所属分类：</div><br>
    <ul>
          <li class="aui-list-item"  style="text-indent: 5%;"
          v-for="(bank,key) of bankLists"  :class="key == bankLists.length-1?'lastli':''">
              {{bank.bankname}}
          </li>
    </ul>
    <div class="aui-padded-15" style="font-weight:light;font-size:0.7rem">
      <div v-html="detailinfo.answer"></div>
    </div>
    
     <div  style="float:left;margin-left:1rem;width:100%">关联文章：</div><br/>
        <ul>
          <li class="aui-list-item"  style="text-indent: 5%;color:#03a9f4"
          v-for="(bind,key) of bindLists"  :class="key == bindLists.length-1?'lastli':''"
          @click="gotoArticle(bind.article_id, bind.article_mulu,bind.article_ill)">
              {{bind.article.title}}
          </li>
        </ul>
         <div  style="float:left;margin-left:1rem;width:100%">文章来源：</div><br/>
        <ul>
          <li class="aui-list-item"  style="text-indent: 5%;"
          v-for="(source,key) of sourceLists"  :class="key == sourceLists.length-1?'lastli':''">
              {{source.source_text}}
          </li>
        </ul>
        <!-- 问答反馈 -->
        <div class="illList" style="margin-top:1rem; width:40%;margin-left:1.25rem;margin-bottom:3rem;" @click="gotoFeedBack">
          <div >问答反馈</div>
          </div>
          <div class="aui-bar aui-bar-tab aui-bg-info" id="footer" style="margin-top:2rem">
        <div class="aui-bar-tab-item aui-active" tapmode @click="changeCollectStatus">
            <div class="aui-bar-tab-label aui-text-white aui-border-r cy-btn">
                    {{footer}}
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  import { MessageBox  } from 'mint-ui';
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      var question_id = self.$route.query.question_id;
      self.bank_id = self.$route.query.bank_id;
      //初始化
      self.init(question_id);
    },
    data(){
      return {
        question_id : '',           //问答id
        shenhe_id : '',            //审核id
        title : '问答题库',               //页面title
        detailinfo : null,        //文章详情信息
        sourceinfo : null,        //文章来源信息   
        sourceflg : false,         //文章来源是否显示
        bankLists : '' ,//问答题库分类
        sourceLists :'',//来源
        bindLists :'',//关联
        count :''//统计
      }
    },
    methods :{
      init : function(question_id){
      self.question_id = question_id;
        //获取文章信息详情
        self.api.doc_getQaDetail({question_id : question_id,bank_id:self.bank_id}).then((res)=>{
          self.detailinfo = res.data.ret.question;
          self.bankLists = res.data.ret.banks;
          self.sourceLists = res.data.ret.sources;//来源
          self.bindLists = res.data.ret.binds;//关联
          self.count = res.data.ret.count;//数据记录
          // //格式化标题 
          // if(self.detailinfo.title.length > 8)
          // {
          //   self.title = self.detailinfo.title.substring(0,7) + "...";
          // }else{
          //   self.title = self.detailinfo.title;
          // }
        }).catch((err)=>{

        })
         //获取问答收藏状态
        self.api.doc_getQaCollectStatus({qa_id : question_id, user_id : localStorage.getItem("doc_id")}).then((res)=>{
          if(res.data.ret == "true"){
            self.collecttext = "已收藏";
            self.footer = "取消收藏";
          }else{
            self.collecttext = "未收藏";
            self.footer = "收藏问答";
          }
        }).catch((err)=>{

        })
      },
      //浏览关联文章
      gotoArticle : function(articleid, muluid,illid){
        self.common.goToArticleDetail({router: self.$router, articleid : articleid, muluid : muluid, illid : illid});
      },
      //文章反馈
      gotoFeedBack : function(){
        self.common.goToQaFeedBack({router: self.$router, question_id : self.question_id});
      },
      //切换收藏状态
      changeCollectStatus : function(){
        let params = {
          user_id : localStorage.getItem("doc_id"),
          qa_id  : self.question_id,
          token : localStorage.getItem("token"),
        }
        self.api.doc_qaCollectChange(params).then((res)=>{
          self.init(self.question_id);
        }).catch((err)=>{

        })
        if(self.collecttext == "未收藏"){
          self.$message({
          message: '收藏成功',
          type: 'success'
        });
        }else{
          this.$message('已取消收藏');
        }
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
  }
</script>
<style scoped>
.illList{
  text-align: center;
  width:80px;
  min-width: 80px;
  height:1.5rem;
  line-height: 1.5rem;
  border: solid 1px;
  border-radius:0.8rem;
  border-color: #B3B3B3;
  color:#000000;
  font-size: 0.65rem;
  background-color: #FFFFFF;
  box-shadow: none;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  float:left;
}
</style>
