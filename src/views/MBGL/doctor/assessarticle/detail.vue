<template>
  <div v-if="detailinfo != null">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">{{title}}</div>
      <a class="aui-pull-right" @click="home" >
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
        <!-- <span class="" style="font-size:0.55rem;color:#B3B3B3;margin-left:0.5rem">
          {{accepttext}}&nbsp;&nbsp;{{collecttext}}
        </span> -->
    </div>
<br/>

    <div class="aui-padded-15" style="font-weight:light;font-size:0.7rem">
      <div v-html="detailinfo.html"></div>
    </div>

    <div  style="float:left;margin-left:1rem;">参考文献</div><br/>
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
        <div v-if="shenhetype == 'dsh' && shenherecord != null">
          <div class="recordtitle" style="background-color:#B3B3B3;height:2.5rem;line-height:2.5rem"><b >历史审核记录</b></div>
          <!-- 审核员审核 -->
          <div v-if="adminrecord != null">
          <div class="recordtitle"  style="margin-top:0px"><b >审核员审核</b></div>
          <div v-for="(item, key) in adminrecord">
          <div style="height:2rem;line-height:2rem;background-color:white;padding:0.5rem">
            <span>文章审核员</span>
            <span v-if="item.status == 2" style="color: rgb(103, 248, 135);margin-left:0.8rem;">审核通过</span>
            <span v-if="item.status == 3" style="color: red;margin-left:0.8rem;">审核驳回</span>
            <span style="margin-left:0.8rem;">{{item.updated_at}}</span>
          </div>
          <div style="background-color:white;padding-right:0.5rem;padding-left:0.5rem;padding-bottom:1rem;padding-top:0.5rem">
            <span >审核理由：</span>
            <span style="margin-left:0.2rem;">{{item.remark}}</span>
          </div>
          </div>
          </div>
          <!-- 药师审核 -->
          <div v-if="yaoshirecord != null">
          <div class="recordtitle"  style="margin-top:0px"><b >药师审核</b></div>
          <div v-for="(item, key) in yaoshirecord">
          <div style="height:2rem;line-height:2rem;background-color:white;padding:0.5rem">
            <span>药师</span>
            <span v-if="item.status == 2" style="color: rgb(103, 248, 135);margin-left:0.8rem;">审核通过</span>
            <span v-if="item.status == 3" style="color: red;margin-left:0.8rem;">审核驳回</span>
            <span style="margin-left:0.8rem;">{{item.updated_at}}</span>
          </div>
          <div style="background-color:white;padding-right:0.5rem;padding-left:0.5rem;padding-bottom:1rem;padding-top:0.5rem">
            <span >审核理由：</span>
            <span style="margin-left:0.2rem;">{{item.remark}}</span>
          </div>
          </div>
          </div>
          <!-- 护士审核 -->
          <div v-if="nurserecord != null">
          <div class="recordtitle"  style="margin-top:0px"><b >护士审核</b></div>
          <div v-for="(item, key) in nurserecord">
          <div style="height:2rem;line-height:2rem;background-color:white;padding:0.5rem">
            <span>{{item.title_str}}</span>
            <span v-if="item.status == 2" style="color: rgb(103, 248, 135);margin-left:0.8rem;">审核通过</span>
            <span v-if="item.status == 3" style="color: red;margin-left:0.8rem;">审核驳回</span>
            <span style="margin-left:0.8rem;">{{item.updated_at}}</span>
          </div>
          <div style="background-color:white;padding-right:0.5rem;padding-left:0.5rem;padding-bottom:1rem;padding-top:0.5rem">
            <span >审核理由：</span>
            <span style="margin-left:0.2rem;">{{item.remark}}</span>
          </div>
          </div>
          </div>
          <!-- 医生审核 -->
          <div v-if="doctorrecord != null">
          <div class="recordtitle"  style="margin-top:0px"><b >医生审核</b></div>
          <div v-for="(item, key) in doctorrecord">
          <div style="height:2rem;line-height:2rem;background-color:white;padding:0.5rem">
            <span>{{item.title_str}}</span>
            <span v-if="item.status == 2" style="color: rgb(103, 248, 135);margin-left:0.8rem;">审核通过</span>
            <span v-if="item.status == 3" style="color: red;margin-left:0.8rem;">审核驳回</span>
            <span style="margin-left:0.8rem;">{{item.updated_at}}</span>
          </div>
          <div style="background-color:white;padding-right:0.5rem;padding-left:0.5rem;padding-bottom:1rem;padding-top:0.5rem">
            <span >审核理由：</span>
            <span style="margin-left:0.2rem;">{{item.remark}}</span>
          </div>
          </div>
          </div>
        </div>
        <div v-if="shenhetype == 'ysh' && myshenherecord != null" >
          <div class="recordtitle"><b >我的审核记录</b></div>
          <div v-for="(item, key) in myshenherecord">
          <div style="height:2rem;line-height:2rem;background-color:white;padding:0.5rem">
            <span v-if="item.status == 2" style="color: rgb(103, 248, 135);">审核通过</span>
            <span v-if="item.status == 3" style="color: red;">审核驳回</span>
            <span style="margin-left:0.8rem;">{{item.updated_at}}</span>
          </div>
          <div style="background-color:white;padding-right:0.5rem;padding-left:0.5rem;padding-bottom:1rem;padding-top:0.5rem">
            <span >审核理由：</span>
            <span style="margin-left:0.2rem;">{{item.remark}}</span>
          </div>
          </div>
        </div>
        <div  style="height:3rem"></div>
        <div v-if="shenhebtnflg" class="aui-tab" id="tab">
          <div class="aui-tab-item" style="font-size: 0.6rem;background: #03a9f4;border-right:1px solid #FFFFFF;
          color:#FFFFFF;position: fixed;top: auto;bottom: 0;width: 50%;" @click="ShenheArticle(2)">
              审核通过
          </div>
          <div class="aui-tab-item" style="font-size: 0.6rem;background: #03a9f4;border-left:1px solid #FFFFFF;;color:#FFFFFF
          ;position: fixed;top: auto;bottom: 0;width: 50%;margin-left:49%" @click="ShenheArticle(3)">
              审核驳回
          </div>
        </div>
  </div>
</template>
<script>
  const back_delete_ill = false;
  import { MessageBox  } from 'mint-ui';
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      var articleid = self.$route.query.articleid;
      self.articleid = articleid;
      self.shenheid = self.$route.query.shenheid;
      self.shenhetype = self.$route.query.shenhestatus;
      //审核文章功能是否显示
      if(self.$route.query.type !=0){
        self.shenhebtnflg = false;
      }
      if(self.shenhetype == 'dsh'){
        //查看本文上次审核未通过审核记录
        self.getlastLostShenhe();
      }else{
        //文章下我的审核记录
        self.getmyShenheByArticle();
      }
      //初始化
      self.init(articleid);
    },
    data(){
      return {
        articleid : '',           //文章id
        shenheid : '',            //审核id
        shenhetype : '',         //文章审核类型
        title : '',               //页面title
        detailinfo : null,        //文章详情信息
        sourceinfo : null,        //参考文献信息   
        sourceflg : false,         //参考文献是否显示
        shenhebtnflg : true,       //审核文章功能是否显示标志
        myshenherecord : null,     //我的审核记录
        shenherecord : null,       //审核记录
        adminrecord : null,        //管理员审核记录
        yaoshirecord : null,       //药师审核记录
        doctorrecord : null,       //医师审核记录
        nurserecord : null,        //护士审核记录
      }
    },
    methods :{
      init : function(articleid){
      self.articleid = articleid;
        //获取文章信息详情
        self.api.doc_getSHArticle({article_id : articleid}).then((res)=>{
          //self.common.consoledebug.log("detailres :"  + JSON.stringify(res.data.ret));
          self.detailinfo = res.data.ret;
          //格式化标题 
          if(self.detailinfo.title.length > 8)
          {
            self.title = self.detailinfo.title.substring(0,7) + "...";
          }else{
            self.title = self.detailinfo.title;
          }
        }).catch((err)=>{

        })
        //获取参考文献详情信息
        self.api.doc_getArticleSource({article_id : articleid}).then((res)=>{
          //self.common.consoledebug.log("sourceres :"  + JSON.stringify(res.data.ret));
          // if(res.data.ret.length == 0){
          //   self.sourceflg = false;
          // }else{
          //   if(res.data.ret[0].source_type == null){
          //   self.sourceflg = false;
          // }
          // self.sourceinfo = res.data.ret[0];
          // self.sourceflg = true;
          // }
          self.sourceinfo = res.data.ret;
          self.sourceflg = true;
          //self.common.consoledebug.log("sourceres :"  + JSON.stringify(self.sourceinfo));
        }).catch((err)=>{
          self.common.consoledebug.log("err :"  + JSON.stringify(err));
        })
      },
      //审核文章
      ShenheArticle : function(status){
        if(status == 2){
          var title = "审核通过" ;
          var reg = "";
        }else if( status == 3){
          var title = "审核驳回" ;
          var reg = /\S/;
        }
        //弹出输入备注的窗口
        MessageBox({
            $type:'prompt',
            title: title,
            message:'请填写理由',
            closeOnClickModal:false,   //点击model背景层不关闭MessageBox
            showCancelButton:true,   //不显示取消按钮
            inputPattern: reg,    //正则条件就
            inputErrorMessage:'理由不能为空',
            showInput:true
        }).then(({ value, action }) => {
            /* value 为填写的值，进行下一步操作*/
            let params = {
              user_id : localStorage.getItem("doc_id"),
              shenhe_id : self.shenheid,
              article_id : self.articleid,
              status : status,
              token : localStorage.getItem("token"),
              remark : value,
            }
            //进行文章的审核
            self.api.doc_shenheArticle(params).then((res)=>{
              //self.common.consoledebug.log("ret :"  + JSON.stringify(res.data.ret));
              MessageBox('提示', '操作成功！')
              self.clickBack();
            }).catch((err)=>{

            })
        }).catch(({ cancel }) => {
        });
      },
      getlastLostShenhe : function(){
        self.api.doc_getlastLostShenhe({user_id : localStorage.getItem("doc_id"), article_id : self.articleid}).then((res)=>{
          console.log('dsh' + JSON.stringify(res.data.ret));
          if(res.data.ret){
            self.shenherecord = res.data.ret;
            if(res.data.ret.doctor){
              self.doctorrecord = res.data.ret.doctor;
            }
            if(res.data.ret.nurse){
              self.nurserecord = res.data.ret.nurse;
            }
            if(res.data.ret.admin){
              self.adminrecord = res.data.ret.admin;
            }
            if(res.data.ret.pharmacist){
              self.yaoshirecord = res.data.ret.pharmacist;
            }
          }
        }).catch((err)=>{

        })
      },
      getmyShenheByArticle : function(){
        self.api.doc_getmyShenheByArticle({user_id : localStorage.getItem("doc_id"), article_id : self.articleid}).then((res)=>{
          console.log('ysh' + JSON.stringify(res.data.ret));
          self.myshenherecord = res.data.ret;
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
.recordtitle{
  background-color: aqua;
  height: 2rem;
  line-height: 2rem;
  border: 1px solid #b3b3b3;
  margin-top:1rem;
  padding-right:0.5rem;
  padding-left:0.5rem;
}
</style>
