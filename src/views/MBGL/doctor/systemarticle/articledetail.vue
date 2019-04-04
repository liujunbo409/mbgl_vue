<template>
  <div v-if="detailinfo != null">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">文章详情</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
      </a>
    </header>
    <div class="aui-text-center aui-margin-t-15" style="position: relative;text-align: left;font-weight: bold;margin-left: 0.5rem;margin-right: 0.5rem;">
        <span class="font-size-18">{{detailinfo.title}}({{detailinfo.style_str}})
        </span>
    </div>
    <div class="aui-text-center aui-margin-t-10 aui-text-default" style="float:left">
        <span class="" style="font-size:0.55rem;color:#B3B3B3;margin-left:0.5rem">
          {{detailinfo.author}}&nbsp;&nbsp;{{detailinfo.created_at}}
        </span>
        <span class="" style="font-size:0.55rem;color:#B3B3B3;margin-left:0.5rem">
          {{accepttext}}&nbsp;&nbsp;{{collecttext}}
        </span>
    </div>
<br/>

    <div class="aui-padded-15" style="font-weight:light;font-size:0.7rem">
      <div v-html="detailinfo.html"></div>
    </div>
    <div  style="float:left;margin-left:1rem;">参考文献：</div><br/>
        <div class="mt-10" style="margin-left:10px" v-if="sourceflg">
            <h4 v-if="sourceflg" v-for="(item, key) of sourceinfo" style="margin-left:0.6rem;margin-top:0.2rem">
              <span>[{{item.sequence}}]{{item.source_text}}</span>
                <!-- <span v-if="sourceinfo.source_type == 'J'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span>[J].</span>
                    <span v-if="sourceinfo.journal_name != null">[{{sourceinfo.journal_name}}]</span>
                    <span v-if="sourceinfo.journal_year != null">[{{sourceinfo.journal_year}}]</span>
                    <span v-if="sourceinfo.journal_date != null">[{{sourceinfo.journal_date}}]</span>
                    <span v-if="sourceinfo.source_page != null">[{{sourceinfo.source_page}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'A'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.original_author}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.original_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.original_author}}]</span>
                    <span>[A].</span>
                    <span v-if="sourceinfo.original_author != null">[{{sourceinfo.original_author}}]</span>
                    <span v-if="sourceinfo.original_name != null">[{{sourceinfo.original_name}}]</span>
                    <span>[C].</span>
                    <span v-if="sourceinfo.published_place != null">[{{sourceinfo.published_place}}]</span>
                    <span v-if="sourceinfo.published_press != null">[{{sourceinfo.published_press}}]</span>
                    <span v-if="sourceinfo.published_year != null">[{{sourceinfo.published_year}}]</span>
                    <span v-if="sourceinfo.source_page != null">[{{sourceinfo.source_page}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'N'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span>[N].</span>
                    <span v-if="sourceinfo.news_name != null">[{{sourceinfo.news_name}}]</span>
                    <span v-if="sourceinfo.news_date != null">[{{sourceinfo.news_date}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'S'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.standard_number != null">[{{sourceinfo.standard_number}}]</span>
                    <span v-if="sourceinfo.standard_name != null">[{{sourceinfo.standard_name}}]</span>
                    <span>[S].</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'P'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.patent_author != null">[{{sourceinfo.patent_author}}]</span>
                    <span v-if="sourceinfo.patent_name != null">[{{sourceinfo.patent_name}}]</span>
                    <span>[P].</span>
                    <span v-if="sourceinfo.patent_country != null">[{{sourceinfo.patent_country}}]</span>
                    <span v-if="sourceinfo.patent_number != null">[{{sourceinfo.patent_number}}]</span>
                    <span v-if="sourceinfo.patent_date != null">[{{sourceinfo.patent_date}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'E'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span v-if="sourceinfo.edocument_type != null">[{{sourceinfo.edocument_type}}]</span>
                    <span v-if="sourceinfo.edocument_address != null">[{{sourceinfo.edocument_address}}]</span>
                    <span v-if="sourceinfo.edocument_date != null">[{{sourceinfo.edocument_date}}]</span>
                </span>
                <span v-else-if="sourceinfo.source_type == 'Z'">
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span v-if="sourceinfo.source_type != null">[{{sourceinfo.source_type}}]</span>
                    <span v-if="sourceinfo.published_place != null">[{{sourceinfo.published_place}}]</span>
                    <span v-if="sourceinfo.published_press != null">[{{sourceinfo.published_press}}]</span>
                    <span v-if="sourceinfo.published_year != null">[{{sourceinfo.published_year}}]</span>
                </span>
                <span v-else>
                    <span v-if="sourceinfo.sequence != null">[{{sourceinfo.sequence}}]</span>
                    <span v-if="sourceinfo.source_author != null">[{{sourceinfo.source_author}}]</span>
                    <span v-if="sourceinfo.source_name != null">[{{sourceinfo.source_name}}]</span>
                    <span v-if="sourceinfo.source_type != null">[{{sourceinfo.source_type}}]</span>
                    <span v-if="sourceinfo.published_place != null">[{{sourceinfo.published_place}}]</span>
                    <span v-if="sourceinfo.published_press != null">[{{sourceinfo.published_press}}]</span>
                    <span v-if="sourceinfo.published_year != null">[{{sourceinfo.published_year}}]</span>
                    <span v-if="sourceinfo.source_page != null">[{{sourceinfo.source_page}}]</span>
                </span> -->
            </h4>
        </div>
        <div v-if="nexusflg" v-for="item of nexusinfo">
      <div style="margin-left:1rem;margin-top:1.5rem;margin-bottom:0.5rem"><span>{{item.style_str}} :</span><a @click="gotoNexusArticle(item.major_id)" >{{item.name}}</a></div>
      </div>
        <div style="margin-bottom:3rem;margin-right: 0.5rem;">
          <div style="margin-left:1rem;margin-top:1.5rem;" v-if="lastarticleflg">
            <span>上一篇：</span><span v-if="lastarticle.id != '0'" @click="gotoNearArticle(lastarticle.id, muluid)">{{lastarticle.title}}</span><span v-else style="color:#B3B3B3">{{lastarticle.title}}</span>
          </div>
          <div  style="margin-left:1rem;margin-top:0.5rem;" v-if="nextarticleflg">
            <span>下一篇：</span><span v-if="nextarticle.id != '0'" @click="gotoNearArticle(nextarticle.id, muluid)">{{nextarticle.title}}</span><span v-else style="color:#B3B3B3">{{nextarticle.title}}</span>
          </div>
        </div>
    <!-- <div class="illList" style="margin-top:1rem; width:40%;margin-left:1.25rem;margin-bottom:3rem;" @click="gotoQuestions">
          <div>文章问题</div>
          </div>
    <div class="illList" style="margin-top:1rem; width:40%;margin-left:1.25rem;margin-bottom:3rem;" @click="gotoFeedBack">
          <div >文章反馈</div>
          </div>
    <div v-if="acceptflg">
      <div class="illList" style="margin-top:1rem; width:40%;margin-left:1.25rem;margin-bottom:3rem;border-color:#03a9f4;color:#03a9f4" @click="changeAcceptStatus">
          <div >{{acceptbtntext}}</div>
          </div>
    </div> -->
    <!-- <div class="aui-bar aui-bar-tab aui-bg-info" id="footer" style="margin-top:2rem">
        <div class="aui-bar-tab-item aui-active" tapmode @click="changeCollectStatus">
            <div class="aui-bar-tab-label aui-text-white aui-border-r cy-btn">
                    {{footer}}
            </div>
        </div>
    </div> -->
    <div v-if="!acceptflg" style="position:fixed;bottom:0px;display:flex;border-top:1px solid #B3B3B3;background-color:white;width:100%" >
        <div style="width:33%;text-align:center;" @click="gotoQuestions">

          <img width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/kaohe.png">

          <div class="aui-grid-label aui-font-size-12">考核问题</div>
      </div>
          <div style="border-left:1px solid #B3B3B3;width:0%;height:22px;line-height:22px;margin-top: 15px;"></div>
      <div style="width:33%;text-align:center" @click="gotoFeedBack">
          <img width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/feedback.png">

          <div class="aui-grid-label aui-font-size-12">文章反馈</div>
      </div>
          <div style="border-left:1px solid #B3B3B3;width:0%;height:22px;line-height:22px;margin-top: 15px;"></div>
      <div style="width:33%;text-align:center" @click="changeCollectStatus">
          <img v-if="footer == '文章收藏'" width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/uncollected.png">
          <img v-else width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/collected.png">
          <span v-if="footer == '文章收藏'" style="margin-left:2px">{{collectnum}}</span>
          <span v-else style="color:#03a9f4;margin-left:2px" >{{collectnum}}</span>
          <div v-if="footer == '文章收藏'" class="aui-grid-label aui-font-size-12">{{footer}}</div>
          <div v-else style="color:#03a9f4" class="aui-grid-label aui-font-size-12">{{footer}}</div>
      </div>
    </div>
    <div v-if="acceptflg" style="position:fixed;bottom:0px;display:flex;border-top:1px solid #B3B3B3;background-color:white;width:100%" >
        <div style="width:25%;text-align:center;" @click="gotoQuestions">

          <img width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/kaohe.png">

          <div class="aui-grid-label aui-font-size-12">考核问题</div>
      </div>
          <div style="border-left:1px solid #B3B3B3;width:0%;height:22px;line-height:22px;margin-top: 15px;"></div>
      <div style="width:25%;text-align:center" @click="gotoFeedBack">
          <img width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/feedback.png">

          <div class="aui-grid-label aui-font-size-12">文章反馈</div>
      </div>
          <div style="border-left:1px solid #B3B3B3;width:0%;height:22px;line-height:22px;margin-top: 15px;"></div>
      <div style="width:25%;text-align:center" @click="changeCollectStatus">
          <img v-if="footer == '文章收藏'" width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/uncollected.png">
          <img v-else width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/collected.png">
          <span v-if="footer == '文章收藏'" style="margin-left:2px">{{collectnum}}</span>
          <span v-else style="color:#03a9f4;margin-left:2px" >{{collectnum}}</span>
          <div v-if="footer == '文章收藏'" class="aui-grid-label aui-font-size-12">{{footer}}</div>
          <div v-else style="color:#03a9f4" class="aui-grid-label aui-font-size-12">{{footer}}</div>
      </div>
          <div style="border-left:1px solid #B3B3B3;width:0%;height:22px;line-height:22px;margin-top: 15px;"></div>
      <div style="width:25%;text-align:center" @click="changeAcceptStatus">
        <img v-if="acceptbtntext == '专业认可'" width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/undianzan.png">
        <img v-else width="17px" height="17px" style="display:inline;margin-top: 5px;" src="http://src.yixuekeyan.cn/dianzan.png">
         <span v-if="acceptbtntext == '专业认可'" style="margin-left:2px">{{acceptnum}}</span>
         <span v-else style="color:#03a9f4;margin-left:2px">{{acceptnum}}</span>
          <div v-if="acceptbtntext == '专业认可'" class="aui-grid-label aui-font-size-12">{{acceptbtntext}}</div>
          <div v-else class="aui-grid-label aui-font-size-12" style="color:#03a9f4">{{acceptbtntext}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  const back_delete_ill = false;
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
      var articleid = self.$route.query.articleid;
      var muluid = self.$route.query.muluid;
      var illid = self.$route.query.illid;
      self.muluid = muluid;
      self.illid = illid;
      //初始化
      self.init(articleid, muluid);
    },
    mounted(){
      
    },
    data(){
      return {
        illid : '',               //疾病id
        articleid : '',           //文章id
        muluid : '',              //目录id
        detailinfo : null,        //文章详情信息
        sourceinfo : null,        //参考文献信息   
        nexusinfo : null,         //文章关联信息
        nexusflg : false,         //文章关联是否显示
        sourceflg : false,         //参考文献是否显示
        collecttext : '',         //收藏处显示的文字
        accepttext : '',          //认可处显示的文字
        acceptbtntext : '',       //认可按钮显示的文字
        acceptflg : false,
        footer : "",
        nextarticle : null,
        lastarticle : null,
        lastarticleflg : false,
        nextarticleflg : false,
        collectnum : 0,
        acceptnum : 0,
      }
    },
    methods :{
      init : function(articleid, muluid){
      self.articleid = articleid;
        //获取文章关联
        self.api.doc_getArticleNexus({article_id : articleid}).then((res)=>{
          //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
          self.nexusinfo = res.data.ret;
          if(self.nexusinfo != ""){
            self.nexusflg = true;
          }
        }).catch((err)=>{

        })
        //获取文章信息详情
        self.api.doc_getArticleDetail({article_id : articleid, ill_id:self.illid,user_id : localStorage.getItem("doc_id")}).then((res)=>{
          //self.common.consoledebug.log("detailres :"  + JSON.stringify(res.data.ret));
          self.detailinfo = res.data.ret;
        }).catch((err)=>{

        })
        //获取参考文献详情信息
        self.api.doc_getArticleSource({article_id : articleid}).then((res)=>{
          //self.common.consoledebug.log("sourceres :"  + JSON.stringify(res.data.ret));
          // if(res.data.ret.length == 0){
          //   self.sourceflg = false;
          // }else{
          //   if(res.data.ret.source_type == null){
          //   self.sourceflg = false;
          //   }else{
          //   self.sourceinfo = res.data.ret;
          //   self.sourceflg = true;
          //   }
          // }
          self.sourceinfo = res.data.ret;
          self.sourceflg = true;
          //self.common.consoledebug.log("sourceres :"  + JSON.stringify(self.sourceinfo));
        }).catch((err)=>{
          self.common.consoledebug.log("err :"  + JSON.stringify(err));
        })
        //获取文章收藏状态
        self.api.doc_getCollectStatus({article_id : articleid, user_id : localStorage.getItem("doc_id")}).then((res)=>{
          //self.common.consoledebug.log("收藏状态 :"  + JSON.stringify(res.data.ret));
          if(res.data.ret == "true"){
            self.collecttext = "已收藏";
            self.footer = "取消收藏";
          }else{
            self.collecttext = "未收藏";
            self.footer = "文章收藏";
          }
        }).catch((err)=>{

        })
        //获取文章是否有认可资格
        self.api.doc_getAcceptTitle({article_id : articleid, user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role"), ill_id : self.illid}).then((res)=>{
          //self.common.consoledebug.log("是否有认可资格 :"  + JSON.stringify(res));
                
          if(res.data.result == true)
          {
            self.acceptflg = true;
            self.api.doc_getAcceptStatus({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role"),article_id : articleid}).then((res)=>{
              //self.common.consoledebug.log("认可状态 :"  + JSON.stringify(res.data.ret));
              if(res.data.ret == "true"){
                self.accepttext = "已认可";
                self.acceptbtntext = "取消认可";
              }else{
                self.accepttext = "未认可";
                self.acceptbtntext = "专业认可";
              }
              }).catch((err)=>{

              })
          }else{
            self.accepttext = "";
          }
        }).catch((err)=>{

        })
        //获取上一篇文章和下一篇文章
        self.api.doc_getNearArticle({article_id : articleid, type : 'last', mulu_id : muluid}).then((res)=>{
          //console.log("last:" + JSON.stringify(res));
          self.lastarticle = res.data.ret;
          self.lastarticleflg = true;
        }).catch((err)=>{

        })
        self.api.doc_getNearArticle({article_id : articleid, type : 'next', mulu_id : muluid}).then((res)=>{
          //console.log("next:" + JSON.stringify(res));
          self.nextarticle = res.data.ret;
          self.nextarticleflg = true;
        }).catch((err)=>{
          
        })
        //获取收藏数
        self.api.doc_getArticleData({article_id : articleid}).then((res)=>{
          self.collectnum = res.data.ret.used_num;
          self.acceptnum = res.data.ret.accept_num;
        }).catch((err)=>{

        }) 
       },
      //切换收藏状态
      changeCollectStatus : function(){
        let params = {
          user_id : localStorage.getItem("doc_id"),
          article_id : self.articleid,
          ill_id : self.illid,
          token : localStorage.getItem("token"),
        }
        self.api.doc_doCollectChange(params).then((res)=>{
          //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
          self.init(self.articleid, self.muluid);
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
      //切换认可状态
      changeAcceptStatus : function(){
        let params = {
          user_id : localStorage.getItem("doc_id"),
          role : localStorage.getItem("role"),
          article_id : self.articleid,
          ill_id : self.illid,
          token : localStorage.getItem("token"),
        }
        self.api.doc_doAcceptChange(params).then((res)=>{
          //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
          self.$message({
          message: '操作成功',
          type: 'success'
        });
          self.init(self.articleid, self.muluid);
        }).catch((err)=>{

        })
      },
      //文章问题
      gotoQuestions : function(){
        self.common.goToArticleQuestion({router: self.$router, articleid : self.articleid});
      },
      //文章反馈
      gotoFeedBack : function(){
        self.common.goToArticleFeedBack({router: self.$router, articleid : self.articleid});
      },
      //查看关联文章
      gotoNexusArticle : function(majorid){
        self.init(majorid, self.muluid);
        window.scrollTo(0, 0);
      },
      gotoNearArticle : function(articleid, muluid){
        self.init(articleid, muluid);
        self.articleid = articleid;
        window.scrollTo(0, 0);
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
.footer {
  position: fixed;
  bottom:0;
  width:100%;
  height:60px;
  background:#6cf;
}
</style>
