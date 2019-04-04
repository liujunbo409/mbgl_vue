<template>
  <div v-if="detailinfo != null">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">{{title}}</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
      </a>
    </header>
    <div class="aui-text-center aui-margin-t-15" style="position: relative;text-align: left;font-weight: bold;margin-left: 0.5rem;margin-right: 0.5rem;">
        <span class="font-size-18">{{detailinfo.question}}
        </span>
    </div>
    <div class="aui-text-center aui-margin-t-10 aui-text-default" style="float:left;width:100%;">
        <span class="" style="font-size:0.55rem;color:#B3B3B3;margin-left:0.5rem">
          {{detailinfo.oper_name}}&nbsp;&nbsp;{{detailinfo.created_at}}
          浏览数：{{count.doctor_show_num}}
        </span>
    </div>
     <div  style="float:left;margin-left:1rem;">所属分类：</div><br>
    <ul>
          <li class="aui-list-item"  style="text-indent: 5%;"
          v-for="(bank,key) of bankLists"  :class="key == bankLists.length-1?'lastli':''">
              {{bank.bankname}}
          </li>
    </ul>
    <div class="aui-padded-15" style="font-weight:light;font-size:0.7rem">
      <div v-html="detailinfo.answer"></div>
    </div>
     <div  style="float:left;margin-left:1rem;">关联文章：</div><br/>
        <ul>
          <li class="aui-list-item"  style="text-indent: 5%;color:#03a9f4"
          v-for="(bind,key) of bindLists"  :class="key == bindLists.length-1?'lastli':''"
          @click="gotoArticle(bind.article_id, bind.article_mulu,bind.article_ill)">
              {{bind.article.title}}
          </li>
        </ul>
         <div  style="float:left;margin-left:1rem;">参考文献：</div><br/>
        <ul>
          <li class="aui-list-item"  style="text-indent: 5%;"
          v-for="(source,key) of sourceLists"  :class="key == sourceLists.length-1?'lastli':''">
              [{{source.sequence}}]{{source.source_text}}
          </li>
        </ul>
        <div style="margin-bottom:3rem;margin-right: 0.5rem;">
          <div style="margin-left:1rem;margin-top:1.5rem;" v-if="lastQaflg">
            <span>上一篇：</span><span v-if="lastQa.id != '0'" @click="gotoNearQa(lastQa.id)">{{lastQa.question}}</span><span v-else style="color:#B3B3B3">{{lastQa.question}}</span>
          </div>
          <div  style="margin-left:1rem;margin-top:0.5rem;" v-if="nextQaflg">
            <span>下一篇：</span><span v-if="nextQa.id != '0'" @click="gotoNearQa(nextQa.id)">{{nextQa.question}}</span><span v-else style="color:#B3B3B3">{{nextQa.question}}</span>
          </div>
        </div>
        <!-- 问答反馈 -->
       
        <div style="position:fixed;bottom:0px;display:flex;border-top:1px solid #B3B3B3;background-color:white;width:100%" >
          <div style="width:50%;text-align:center" @click="gotoFeedBack">
          <img width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/feedback.png">

          <div class="aui-grid-label aui-font-size-12">问答反馈</div>
          </div>
          <div style="border-left:1px solid #B3B3B3;width:0%;height:22px;line-height:22px;margin-top: 15px;"></div>
          <div style="width:50%;text-align:center" @click="changeCollectStatus">
          <img v-if="footer == '收藏问答'" width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/uncollected.png">
          <img v-else width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/collected.png">
          <span v-if="footer == '收藏问答'" style="margin-left:2px">{{collectnum}}</span>
          <span v-else style="color:#03a9f4;margin-left:2px" >{{collectnum}}</span>
          <div v-if="footer == '收藏问答'" class="aui-grid-label aui-font-size-12">{{footer}}</div>
          <div v-else style="color:#03a9f4" class="aui-grid-label aui-font-size-12">{{footer}}</div>
      </div>
          </div>
  </div>
</template>
<script>
  import { MessageBox  } from 'mint-ui';
  const back_delete_ill = false;
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
        sourceinfo : null,        //参考文献信息   
        sourceflg : false,         //参考文献是否显示
        bankLists : '' ,//问答题库分类
        sourceLists :'',//来源
        bindLists :'',//关联
        count :'',//统计
        collectnum : 0,
        bank_id : '0',
        lastQa : null,
        nextQa : null,
        lastQaflg : false,
        nextQaflg : false,
      }
    },
    methods :{
      init : function(question_id){
      self.question_id = question_id;
        //获取文章信息详情
        self.api.doc_getQaDetail({question_id : question_id,bank_id:self.bank_id}).then((res)=>{
          //console.log("Qares+ " + JSON.stringify(res.data.ret.count));
          self.detailinfo = res.data.ret.question;
          self.bankLists = res.data.ret.banks;
          self.sourceLists = res.data.ret.sources;//来源
          self.bindLists = res.data.ret.binds;//关联
          self.count = res.data.ret.count;//数据记录
          self.collectnum = res.data.ret.count.user_favorite_num + res.data.ret.count.doctor_favorite_num;
          //console.log(self.collectnum);
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
        //获取上一篇问答和下一篇问答
        self.api.doc_getNearQa({question_id : question_id, type : 'next', bank_id : self.bank_id, role_type : 'D'}).then((res)=>{
          //console.log('next'+JSON.stringify(res));
          self.nextQa =res.data.ret;
          self.nextQaflg = true;
        }).catch((err)=>{

        })
        self.api.doc_getNearQa({question_id : question_id, type : 'last', bank_id : self.bank_id, role_type : 'D'}).then((res)=>{
          //console.log('last'+JSON.stringify(res));
          self.lastQa = res.data.ret;
          self.lastQaflg = true;
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
          //console.log(JSON.stringify(res))
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
      },
      gotoNearQa : function(question_id){
        self.init(question_id);
        self.question_id = question_id;
        window.scrollTo(0, 0);
      },
      home : function(){
        self.common.jumpToPage({router : self.$router, url : "/MBGL/doctor/index"})
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
