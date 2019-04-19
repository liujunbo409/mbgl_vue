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
    <div class="aui-text-center aui-margin-t-15" style="position: relative;text-align: left;font-weight: bold;margin-left: 0.5rem;">
        <span class="font-size-18">{{detailinfo.question.question}}
        </span>
    </div>
    <div class="aui-text-center aui-margin-t-10 aui-text-default" style="float:left;width:100%;">
        <span class="" style="font-size:0.55rem;color:#B3B3B3;margin-left:0.5rem">
          {{detailinfo.question.oper_name}}&nbsp;&nbsp;{{detailinfo.question.created_at}}
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
      <div v-html="detailinfo.question.answer"></div>
    </div>
    
     <div  style="float:left;margin-left:1rem;">关联文章：</div><br/>
        <ul>
          <li class="aui-list-item"  style="text-indent: 5%;"
          v-for="(bind,key) of bindLists"  :class="key == bindLists.length-1?'lastli':''">
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
        <div v-if="shenhetype == 'dsh' && shenherecord != null">
          <div class="recordtitle" style="background-color:#B3B3B3;height:2.5rem;line-height:2.5rem">历史审核记录</div>
          <!-- 审核员审核 -->
          <div v-if="adminrecord != null">
          <div class="recordtitle"  style="margin-top:0px">审核员审核</div>
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
          <div class="recordtitle"  style="margin-top:0px">药师审核</div>
          <div v-for="(item, key) in yaoshirecord">
            <div v-if="item.status != '0'">
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
          </div>
          <!-- 护士审核 -->
          <div v-if="nurserecord != null">
          <div class="recordtitle"  style="margin-top:0px">护士审核</div>
          <div v-for="(item, key) in nurserecord">
            <div v-if="item.status != '0'">
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
          <!-- 医生审核 -->
          <div v-if="doctorrecord != null">
          <div class="recordtitle"  style="margin-top:0px">医生审核</div>
          <div v-for="(item, key) in doctorrecord">
            <div v-if="item.status != '0'">
          <div style="height:2rem;line-height:2rem;background-color:white;padding:0.5rem" >
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
        </div>
        <div v-if="shenhetype == 'ysh' && myshenherecord != null" >
          <div class="recordtitle">我的审核记录</div>
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
        <div style="height:3rem"></div>
        <div v-show="detailinfo.shenhe.status=='1'" class="aui-tab" id="tab">
          <div class="aui-tab-item" style="font-size: 0.6rem;background: #03a9f4;border-right:1px solid #FFFFFF;
          color:#FFFFFF;position: fixed;top: auto;bottom: 0;width: 50%;" @click="ShenheArticle(2)">
              审核通过
          </div>
          <div class="aui-tab-item" style="font-size: 0.6rem;background: #03a9f4;border-left:1px solid #FFFFFF;;color:#FFFFFF
          ;position: fixed;top: auto;bottom: 0;width: 50%;margin-left:49%" @click="ShenheArticle(3)">
              审核驳回
          </div>
        </div>
        <div v-if="detailinfo.shenhe.status=='2'" class="aui-tab">
          <div class="aui-tab-item" style="font-size: 0.6rem;background:rgb(217, 222, 224);border-right:1px solid #FFFFFF;
          color:#58ea0f;position: fixed;top: auto;bottom: 0;width:100%;">
             {{detailinfo.shenhe.status_str}}
          </div>
        </div>
        <div v-if="detailinfo.shenhe.status=='3'" class="aui-tab">
          <div class="aui-tab-item" style="font-size: 0.6rem;background:rgb(217, 222, 224);border-right:1px solid #FFFFFF;
          color:rgb(251, 6, 26);position: fixed;top: auto;bottom: 0;width:100%;">
             {{detailinfo.shenhe.status_str}}
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
      var question_id = self.$route.query.question_id;
      self.question_id = question_id;
      self.shenhe_id = self.$route.query.shenhe_id;
      self.shenhetype = self.$route.query.type;
      self.from = self.$route.query.from;
      if(self.shenhetype == 'dsh'){
        //查看本文上次审核未通过审核记录
        self.getlastLostShenhe();
      }else{
        //文章下我的审核记录
        self.getmyShenheByQa();
      }
      //初始化
      self.init(question_id);
    },
    data(){
      return {
        question_id : '',           //文章id
        shenhe_id : '',            //审核id
        title : '审核问答题库',               //页面title
        shenhetype : '',         //wenda审核类型
        detailinfo : null,        //文章详情信息
        sourceinfo : null,        //参考文献信息   
        sourceflg : false,         //参考文献是否显示
        bankLists : '' ,//问答题库分类
        sourceLists :'',//来源
        bindLists :'',//关联
        myshenherecord : null,     //我的审核记录
        shenherecord : null,       //审核记录
        adminrecord : null,        //管理员审核记录
        yaoshirecord : null,       //药师审核记录
        doctorrecord : null,       //医师审核记录
        nurserecord : null,        //护士审核记录
      }
    },
    methods :{
      init : function(question_id){
      self.question_id = question_id;
        //获取文章信息详情
        self.api.doc_getQaInfo({question_id : question_id,shenhe_id:self.shenhe_id,from:self.from}).then((res)=>{
          self.detailinfo = res.data.ret;
          self.bankLists = res.data.ret.banks;
          self.sourceLists = res.data.ret.sources;//来源
          self.bindLists = res.data.ret.binds;//关联
          //格式化标题 
          if(self.detailinfo.title.length > 8)
          {
            self.title = self.detailinfo.title.substring(0,7) + "...";
          }else{
            self.title = self.detailinfo.title;
          }
        }).catch((err)=>{

        })
      },
      //审核问答题库
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
            message:'请填写审核备注',
            closeOnClickModal:false,   //点击model背景层不关闭MessageBox
            showCancelButton:true,   //不显示取消按钮
            inputPattern: reg,    //正则条件
            inputErrorMessage:'备注不能为空',
            showInput:true
        }).then(({ value, action }) => {
            /* value 为填写的值，进行下一步操作*/
            let params = {
              shenhe_id : self.shenhe_id,
              status : status,
              token : localStorage.getItem("token"),
              remark : value,
              user_id : localStorage.getItem("doc_id")
            }
            //进行文章的审核
            self.api.doc_QaShenhe(params).then((res)=>{
              self.common.consoledebug.log("ret :"  + JSON.stringify(res.data.ret));
              window.location.reload();
            }).catch((err)=>{

            })
        }).catch(({ cancel }) => {
        });
      },
      getlastLostShenhe : function(){
        self.api.doc_getWDlastLostShenhe({ question_id : self.question_id}).then((res)=>{
          console.log('dsh' + JSON.stringify(res));
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
      getmyShenheByQa : function(){
        self.api.doc_getmyShenheByQa({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role"),question_id : self.question_id}).then((res)=>{
          console.log('ysh' + JSON.stringify(res));
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
  background-color: #03a9f4;
  height: 2rem;
  line-height: 2rem;
  border: 1px solid #b3b3b3;
  margin-top:1rem;
  padding-right:0.5rem;
  padding-left:0.5rem;
  color:white;
}
</style>
