<template>
  <div>
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="">
        <!-- <span class="aui-iconfont aui-icon-left"></span> -->
      </a>
      <div class="aui-title">首页</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <section class="aui-grid aui-margin-b-15">
      <div class="aui-row">
        <div class="aui-col-xs-4" @click="selTab(0)">
          <div  class="aui-badge icon" style="top:2rem;left:45%;background-color:#2ad61f" v-show="flg1">完成</div>
          <div class="aui-badge aui-bg-default icon" style="top:2rem;left:45%" v-show="flg2">待填写</div>
          <!-- <i class="aui-iconfont iconfont icon-qunfenggerenziliao"></i> -->
          <img style="height:1.4rem;  display:inline" class="" src="../../../../assets/img/grzl.png">
          <div class="aui-grid-label aui-font-size-12">个人资料</div>
        </div>


        <div class="aui-col-xs-4" @click="selTab(1)">
          <div  class="aui-badge icon " v-if="applystatus == '0'" style="top:2rem;left:45%;background-color:#c1bfbf" v-show="applyflg">未提交</div>
          <div  class="aui-badge icon " v-else-if="applystatus == '1'" style="top:2rem;left:45%;background-color:#03a9f4" v-show="applyflg">待审核</div>
          <div  class="aui-badge icon " v-else-if="applystatus == '2'" style="top:2rem;left:45%;background-color:#2ad61f" v-show="applyflg">通过</div>
          <div  class="aui-badge icon " v-else-if="applystatus == '3'" style="top:2rem;left:45%;background-color:#f51f1f" v-show="applyflg">驳回</div>
          <!-- <i class="aui-iconfont iconfont icon-zhuanjiarenzheng"></i> -->
          <img style="height:1.4rem;  display:inline" class="" src="../../../../assets/img/zgrz.png"> 
          <div class="aui-grid-label aui-font-size-12">医生认证</div>
        </div>



        <div class="aui-col-xs-4" @click="selTab(2)" v-if="roleflg">
          <!-- <i class="aui-iconfont iconfont icon-riqixuanze"></i> -->
          <img style="height:1.4rem;  display:inline" class="" src="../../../../assets/img/czjh.png"> 
          <div  class="aui-badge aui-bg-info icon" style="left:24%;top:2rem" v-show="czsjflg">{{czdate}}</div>
          <div class="aui-grid-label aui-font-size-12">出诊计划</div>
        </div>

        <div class="aui-col-xs-4" @click="selTab(3)">
          <!-- <i class="aui-iconfont iconfont icon-dkw_shenhetongguo"></i> -->
          <img style="height:1.4rem;  display:inline" class="" src="../../../../assets/img/shwz.png"> 
          <div class="aui-grid-label aui-font-size-12">审核文章</div>
        </div>

        <div class="aui-col-xs-4" @click="selTab(4)">
          <!-- <i class="aui-iconfont iconfont icon-guanyuwomen1"></i> -->
          <img style="height:1.4rem;  display:inline" class="" src="../../../../assets/img/qbwz.png"> 
          <div class="aui-grid-label aui-font-size-12">全部文章</div>
        </div>

        <div class="aui-col-xs-4" @click="selTab(5)">
          <!-- <i class="aui-iconfont iconfont icon-shoucang"></i> -->
          <img style="height:1.4rem;  display:inline" class="" src="../../../../assets/img/scwz.png"> 
          <div class="aui-grid-label aui-font-size-12">收藏文章</div>
        </div>
        <div class="aui-col-xs-4" @click="selTab(6)">
          <!-- <i class="aui-iconfont iconfont icon-dkw_shenhetongguo"></i> -->
          <img style="height:1.4rem;  display:inline" class="" src="../../../../assets/img/shwdtk.png"> 
          <div class="aui-grid-label aui-font-size-12">审核问答</div>
        </div>
         <div class="aui-col-xs-4" @click="selTab(7)">
          <!-- <i class="aui-iconfont iconfont icon-guanyuwomen1"></i> -->
          <img style="height:1.4rem;  display:inline" class="" src="../../../../assets/img/qbwd.png"> 
          <div class="aui-grid-label aui-font-size-12">全部问答</div>
        </div>
        <div class="aui-col-xs-4" @click="selTab(8)">
          <!-- <i class="aui-iconfont iconfont icon-guanyuwomen1"></i> -->
          <img style="height:1.4rem;  display:inline" class="" src="../../../../assets/img/yscwd.png"> 
          <div class="aui-grid-label aui-font-size-12">收藏问答</div>
        </div>
      </div>
    </section>
    <!-- 我的待审核文章 -->
    <div class="aui-padded-10">
        <div class="aui-font-size-14" style="border-left: 3px solid #03a9f4;padding-left: 10px;">我的待审核文章</div>
    </div>
    <div v-if="listflg">
    <ul class="aui-list aui-form-list">
      <li class="aui-list-item" v-for="(item,key) of articleinfo" @click="" :class="key == articleinfo.length-1?'lastli':''" @click="gotoArticle(item.article_id, item.id)">
        <div class="aui-list-item-inner aui-list-item-arrow">
          <div>
            {{item.article.title}}
            <div>
        </div>
          </div>
        </div>
      </li>
      </ul>
       <div v-show="articleinfo != '' && pagetotal > 6" class="block" style="text-align:center;background-color:#FFFFFF;padding-top:1rem">
        <el-pagination
          @prev-click = "gotoPrev"
          @next-click = "gotoNext"
          :current-page="currentpage"
          :page-size="pageper"
          layout=" prev, pager, next, total"
          :total="pagetotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {MessageBox} from 'mint-ui';
  const back_delete_ill = false;
  var self = null;    //在create方法中初始化为this
  export default {
    data(){
      return{
        flg1: false,   //个人资料显示"完成"标志
        flg2: false,   //个人资料显示"未完成"标志
        pagetotal : '',    //共有多少条数据
        listflg : false,
        articleinfo : null,
        currentpage : '',     //目前是第几页
        prevurl : '',      //上一页的url
        nexturl :'',       //下一页的url
        pageto :'',        //最后一页（共有几页）
        pageper :'',       //每页有几条数据
        doctor : null,
        applyflg : false,
        applystatus : '0',
        czsjflg : false,
        czdate : '03-03',
        roleflg : true,
      }
    },
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted() {
      if(localStorage.getItem("doc_id") == ""){
        localStorage.setItem("doc_id", localStorage.getItem("doc_laravel_id"))
      }
      let doc_id = localStorage.getItem("doc_id");
      const DEBUG_FLAG = localStorage.getItem("DEBUG_FLAG");
      let base = '';
      if( DEBUG_FLAG == 'true'){
          base = 'http://lljiankang.top/';
        }else{
          base = 'http://de.lljiankang.top/';
        }
      //doc_id = '35';//测试用
      //doc_id = '32';//测试用
      if(doc_id == '' || doc_id == null){
            self.common.jumpToPage({router: self.$router, url : "../doctor/login"});
      }else{
        var gotype = localStorage.getItem("type");
        localStorage.setItem("type", "");
        self.api.doc_getUserStatus({user_id : localStorage.getItem("doc_id")}).then((res)=>{
          if(res.data.result == false){
            MessageBox('提示', '您已被停用！请联系管理员！');
            window.location.href = base + "doctor/h5/vue#/MBGL/doctor/login";
          }
        }).catch((err)=>{

        })
        self.api.doc_getByIdWithToken({user_id : doc_id}).then((res)=>{
            localStorage.setItem("doctor", JSON.stringify(res.data.ret));
            localStorage.setItem("token", res.data.ret.token);
            //localStorage.setItem("doc_id", res.data.ret.id);
            localStorage.setItem("role", res.data.ret.role);
            let doctor = JSON.parse(localStorage.getItem("doctor"));
            if(doctor.ID_number =="" || doctor.xueli =="" || doctor.ID_number ==null || doctor.xueli == null){
              MessageBox('提示', '您的个人信息尚未完善，请先填写个人信息');
              //self.common.jumpToPage({router : self.$router, url : "../doctor/homepage/myinfo"});
              window.location.href = base + "doctor/h5/vue#/MBGL/doctor/homepage/myinfo";
            }
            if(gotype != 'grzl' && gotype!= 'ysrz' && gotype!= '' && gotype!= null){
                self.api.doc_userAccess({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role")}).then((res)=>{
                  if(res.data.result == false){
                      //alert('您现在没有进入该模块的权限，将前往首页');
                      MessageBox('提示', '您现在没有进入该模块的权限，将前往首页');
                      // this.$message({
                      //   message: '您现在没有进入该模块的权限，将前往首页',
                      //   type: 'warning'
                      // });
                      window.location.href = base + "doctor/h5/vue#/MBGL/doctor/index";
                    }else{
                      if(gotype != null){
                          switch (gotype){
                            //意见反馈
                            case 'yjfk' :
                              //self.common.jumpToPage({router: self.$router, url : "../doctor/homepage"});
                              window.location.href = base + "doctor/h5/vue#/MBGL/doctor/homepage/userfeedback";
                              break;
                            //出诊时间
                            case 'czjh' :
                              //self.common.jumpToPage({router: self.$router, url : "../doctor/visitplan"});
                              window.location.href = base + "doctor/h5/vue#/MBGL/doctor/visitplan";
                              break;
                            //审核文章
                            case 'shwz' :
                              //self.common.jumpToPage({router: self.$router, url : "../doctor/assessarticle"});
                              window.location.href = base + "doctor/h5/vue#/MBGL/doctor/assessarticle";
                              break;
                            //系统文章
                            case 'qbwz' : 
                              //self.common.jumpToPage({router: self.$router, url : "../doctor/systemarticle"});
                              window.location.href = base + "doctor/h5/vue#/MBGL/doctor/systemarticle";
                              break;
                            //收藏文章
                            case 'scwz' :
                              //self.common.jumpToPage({router: self.$router, url : "../doctor/collectarticle"});
                              window.location.href = base + "doctor/h5/vue#/MBGL/doctor/collectarticle";
                              break;
                            //认可问答题库
                            case 'rkwdtk' :
                              //self.common.jumpToPage({router: self.$router, url : "../doctor/collectarticle"});
                              window.location.href = base + "doctor/h5/vue#/MBGL/doctor/qaCollectList";
                              break;
                            //审核问答题库
                            case 'shwdtk' :
                              //self.common.jumpToPage({router: self.$router, url : "../doctor/collectarticle"});
                              window.location.href = base + "doctor/h5/vue#/MBGL/doctor/assessQa";
                              break;
                          }
                        }
                    }
                }).catch((err)=>{

                })

            }else{
              if(gotype != null){
                  switch (gotype){
                    //我的页面
                    case 'grzl' :
                      //self.common.jumpToPage({router: self.$router, url : "../doctor/homepage"});
                      window.location.href = base + "doctor/h5/vue#/MBGL/doctor/homepage";
                      break;
                    //医生认证
                    case 'ysrz' :
                      //self.common.jumpToPage({router: self.$router, url : "../doctor/homepage/doctorapply"});
                      window.location.href = base + "doctor/h5/vue#/MBGL/doctor/homepage/doctorapply";
                      break;
          }
        }
            }
        }).catch((err)=>{

        })
      }
      self.init();
    },
    methods :{
      init : function () {
        //localStorage.setItem("fwh_openid",'oCbCtt55Qxofc-aPMtGYmi8CadFY');//测试用
        //let doctor = JSON.parse(localStorage.getItem("doctor"));
        //已存在doctor信息，直接将页面信息赋值
          //个人资料上的标志显示
        //判断各模块信息是否完善
        if(localStorage.getItem("role") == 'nurse'){
          self.roleflg = false;
        }
        self.api.doc_getMokuaiStatus({user_id : localStorage.getItem("doc_id")}).then((res)=>{
          //console.log(JSON.stringify(res.data.ret));
          if(res.data.ret.info == 'true'){
            self.flg1 = true;
            self.flg2 = false;
          }else{
            self.flg1 = false;
            self.flg2 = true;
          }
          if(res.data.ret.apply){
            self.applyflg = true;
            self.applystatus = res.data.ret.apply
          }
          if(res.data.ret.czsj != ''){
            self.czsjflg = true;
            self.czdate = res.data.ret.czsj;
          }

        }).catch((err)=>{

        })
        //待审核文章
        self.api.doc_getArticleWaitList({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role")}).then((res)=>{
          //self.common.consoledebug.log("res : " + JSON.stringify(res.data.ret));
          //信息赋值
          self.articleinfo = res.data.ret.data;
          self.pagetotal = res.data.ret.total;
          self.currentpage = res.data.ret.current_page;
          self.prevurl = res.data.ret.prev_page_url;
          self.nexturl = res.data.ret.next_page_url;
          self.pageto = res.data.ret.to;
          self.pageper = Number(res.data.ret.per_page);
          self.listflg = true;
        }).catch((err)=>{

        })
        //免登陆，访问openID登录接口并赋值
        // if(doctor == null){
        // //if(1 == 1){//测试用
        //   self.api.doc_checkLogin({fwh_openid : localStorage.getItem("fwh_openid")}).then((res)=>{
        //     localStorage.setItem("doctor", JSON.stringify(res.data.ret));
        //     localStorage.setItem("token", res.data.ret.token);
        //     localStorage.setItem("doc_id", res.data.ret.id);
        //     localStorage.setItem("role", res.data.ret.role);
        //     let doctor = JSON.parse(localStorage.getItem("doctor"));
        //     //个人资料上的标志显示
        //     if(doctor.real_name =="" || doctor.nick_name =="" )
        //     {
        //       self.flg1 = false;
        //       self.flg2 = true;
        //     }else{
        //       self.flg1 = true;
        //       self.flg2 = false;
        //     }
        //     //待审核文章
        //     self.api.doc_getArticleWaitList({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role")}).then((res)=>{
        //       //self.common.consoledebug.log("res : " + JSON.stringify(res.data.ret));
        //       //信息赋值
        //       self.articleinfo = res.data.ret.data;
        //       self.pagetotal = res.data.ret.total;
        //       self.currentpage = res.data.ret.current_page;
        //       self.prevurl = res.data.ret.prev_page_url;
        //       self.nexturl = res.data.ret.next_page_url;
        //       self.pageto = res.data.ret.to;
        //       self.pageper = Number(res.data.ret.per_page);
        //       self.listflg = true;
        //     }).catch((err)=>{

        //     })
        //       }).catch((err)=>{

        //       })
        // }else{
        
        // }
        
      },
      selTab : function (index) {
        if(index != 0 && index != 1){
          self.api.doc_userAccess({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role")}).then((res)=>{
            if(res.data.result == false){
                MessageBox('提示', '您现在没有进入该模块的权限，通过资格审核之后方可进入');
                return false;
              }else{
                switch (index){
                  //出诊时间
                  case 2 :
                    self.common.jumpToPage({router: self.$router, url : "../doctor/visitplan"});
                    break;
                  //审核文章
                  case 3 :
                    self.common.jumpToPage({router: self.$router, url : "../doctor/assessarticle"});
                    break;
                  //系统文章
                  case 4 : 
                    self.common.jumpToPage({router: self.$router, url : "../doctor/systemarticle"});
                    break;
                  //收藏文章
                  case 5 :
                    self.common.jumpToPage({router: self.$router, url : "../doctor/collectarticle/selectill"});
                    break;
                    //审核问答题库
                  case 6 :
                    self.common.jumpToPage({router: self.$router, url : "../doctor/assessQa"});
                    break;
                      //全部问答题库
                  case 7 :
                    self.common.jumpToPage({router: self.$router, url : "../doctor/systemQa"});
                    break;
                  case 8 :
                    self.common.jumpToPage({router: self.$router, url : "../doctor/qaCollectList"});
                    break;
                }
              }
          }).catch((err)=>{

          })
        }else{
          switch (index){
            //我的页面
            case 0 :
              self.common.jumpToPage({router: self.$router, url : "../doctor/homepage"});
              break;
            //医生认证
            case 1 :
              if(localStorage.getItem("role") == 'doctor'){
                self.common.jumpToPage({router: self.$router, url : "../doctor/homepage/doctorapply"});
              }else{
                self.common.jumpToPage({router: self.$router, url : "../doctor/homepage/nurseapply"});
              }
              break;
          }
        }
      },
      //下一页（分页）
      gotoNext : function(){
        this.api.axios_ajax(this.nexturl, '', 'GET', false).then((res)=>{
          //console.log("数据：" + JSON.stringify(res.data.ret) );
          self.articleinfo = res.data.ret.data;
          self.currentpage = res.data.ret.current_page;
          self.prevurl = res.data.ret.prev_page_url;
          self.nexturl = res.data.ret.next_page_url;
          self.pageto =  res.data.ret.to;
          self.pageper = Number(res.data.ret.per_page);
        }).catch((err)=>{

        })

      },
      //上一页（分页）
      gotoPrev : function (){
        this.api.axios_ajax(this.prevurl, '', 'GET', false).then((res)=>{
          //console.log("数据：" + JSON.stringify(res.data.ret) );
          self.articleinfo = res.data.ret.data;
          self.currentpage = res.data.ret.current_page;
          self.prevurl = res.data.ret.prev_page_url;
          self.nexturl = res.data.ret.next_page_url;
          self.pageto =  res.data.ret.to;
          self.pageper = Number(res.data.ret.per_page);
        }).catch((err)=>{

        })
      },
      //查看待审核文章详情
      gotoArticle : function(articleid, shenheid){
        self.common.jumpToPageWithArticleid({router: self.$router, url : "../doctor/assessarticle/detail", articleid : articleid, type : 0, shenheid : shenheid});
      },
      clickBack : function () {
        self.common.clickBack();
      }
    }
  }
</script>
<style scoped>
.lastli{
  border: none;
}
.icon{
    position: absolute;
    top: 2rem;
    left: 47%;
    z-index: 99;
}
</style>
