<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack()">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">{{title}}</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
      </a>
    </header>
    <span v-if="illid == ''" style="margin-top:1rem;margin-left:0.5rem;color:#03a9f4;font-size:0.7rem" @click="gotoSeletIll">选择疾病查看 </span>
    <span v-if="illid != ''" style="margin-top:1rem;margin-left:0.5rem;color:#03a9f4;font-size:0.7rem" @click="hulueill('')">忽略疾病查看 </span>
    <span v-if="articleflg" style="margin-right:0.5rem;color:#03a9f4;font-size:0.7rem;float:right" @click="changeStatus">{{statustext}} </span>
    <div v-if="articleflg">
      <ul class="aui-list aui-form-list">
      <li class="aui-list-item" v-for="(item,key) of articleinfo" @click="gotoArticle(item.article.id, item.ill_id)" :class="key == articleinfo.length-1?'lastli':''">
        <div class="aui-list-item-inner">
          <div>
            {{item.article.title}}
            <div>
        <span style="font-size:0.55rem;color:#B3B3B3">收藏 :{{item.data.used_num}}</span>
            <span style="margin-left:1rem;font-size:0.55rem;color:#B3B3B3">认可 : {{item.data.accept_num}}</span>
            <span style="margin-left:1rem;font-size:0.55rem;color:#B3B3B3">浏览 :{{item.data.doctor_show_num + item.data.user_show_num}}</span>
        </div>
          </div>
          <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
        </div>
      </li>
      </ul>
       <div v-show="articleinfo != ''" class="block" style="text-align:center;background-color:#FFFFFF;padding-top:1rem">
        <el-pagination
          @prev-click = "gotoPrev"
          @current-change="handleCurrentChange"
          @next-click = "gotoNext"
          :current-page="currentpage"
          :page-size="pageper"
          layout=" prev, pager, next, total"
          :total="pagetotal">
        </el-pagination>
      </div>
    </div>
    <div  style="position:fixed;bottom:0px;display:flex;border-top:1px solid #B3B3B3;background-color:#03a9f4;width:100%" >
        <div style="width:100%;text-align:center;height:2rem;line-height:2rem;color:white" @click="gotoAllArticle()">
          <div class="aui-grid-label aui-font-size-12">查看全部文章</div>
      </div>
    </div>
  </div>
</template>
<script>
  const back_delete_ill = true;
  import Tree from '../../../../components/page/catalogtree.vue'
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      //初始化
        self.illid = self.$route.query.param;
        self.selectill(self.$route.query.param);
    },
    data(){
      return {
        title :'收藏文章列表',                  //header文字
        statustext : '我的认可',     //右上方显示文字=>  我的收藏or我的认可
        illid : '',                              //选择的疾病id
        illinfo: null,
        articleinfo : null,
        illflg : true,
        articleflg : false,
        pagetotal : '',    //共有多少条数据
        currentpage : '',     //目前是第几页
        prevurl : '',      //上一页的url
        nexturl :'',       //下一页的url
        pageto :'',        //最后一页（共有几页）
        pageper :'',       //每页有几条数据
        path : '',        //分页的url
        firsturl : '',    //第一页url
      }
    },
    methods :{
      handleCurrentChange : function(page){
         //console.log(page);
         //console.log(self.firsturl);
         //console.log(self.path);
        var illanduserid = self.firsturl.split("?");
        illanduserid = illanduserid[1].split("&");
        var illid = illanduserid[0];
        var userid = illanduserid[1];
        //console.log(illanduserid);
        this.api.axios_ajax(self.path + '?' + illid + '&' + userid + '&page=' + page, '', 'GET', false).then((res)=>{
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
      init : function(){
        self.api.doc_getIlllist().then((res)=>{
        self.illinfo = res.data.ret;
      }).catch((err)=>{
      })
      },
      selectill : function(illid){
        self.illid = illid;
        self.api.doc_getCollectList({user_id: localStorage.getItem("doc_id"), ill_id : illid}).then((res)=>{
          //self.common.consoledebug.log("res :" + JSON.stringify(res.data.ret));
          self.articleinfo = res.data.ret.data;
          self.pagetotal = res.data.ret.total;
          self.currentpage = res.data.ret.current_page;
          self.prevurl = res.data.ret.prev_page_url;
          self.nexturl = res.data.ret.next_page_url;
          self.firsturl = res.data.ret.first_page_url;
          self.pageto = res.data.ret.to;
          self.path = res.data.ret.path;
          self.pageper = Number(res.data.ret.per_page);
          self.illflg = false;
          self.articleflg = true;
        }).catch((err)=>{

        })
      },
      hulueill : function(illid){
        if(self.statustext == '我的认可'){
          self.api.doc_getCollectList({user_id: localStorage.getItem("doc_id"), ill_id : illid}).then((res)=>{
          //self.common.consoledebug.log("res :" + JSON.stringify(res.data.ret));
          self.articleinfo = res.data.ret.data;
          self.pagetotal = res.data.ret.total;
          self.currentpage = res.data.ret.current_page;
          self.prevurl = res.data.ret.prev_page_url;
          self.nexturl = res.data.ret.next_page_url;
          self.firsturl = res.data.ret.first_page_url;
          self.pageto = res.data.ret.to;
          self.path = res.data.ret.path;
          self.pageper = Number(res.data.ret.per_page);
          self.illflg = false;
          self.articleflg = true;
        }).catch((err)=>{

        })
        }else{
          self.api.doc_getAcceptList({user_id: localStorage.getItem("doc_id"), ill_id : illid}).then((res)=>{
            self.common.consoledebug.log("res :" + JSON.stringify(res.data.ret));
            self.articleinfo = res.data.ret.data;
            self.pagetotal = res.data.ret.total;
            self.currentpage = res.data.ret.current_page;
            self.prevurl = res.data.ret.prev_page_url;
            self.nexturl = res.data.ret.next_page_url;
            self.pageto = res.data.ret.to;
            self.pageper = Number(res.data.ret.per_page);
          }).catch((err)=>{

          })
        }
      },
      changeStatus : function(){
        if(self.statustext == '我的认可'){
          self.statustext = '我的收藏';
          self.title = "认可文章列表"
          self.api.doc_getAcceptList({user_id: localStorage.getItem("doc_id"), ill_id : self.illid}).then((res)=>{
            self.common.consoledebug.log("res :" + JSON.stringify(res.data.ret));
            self.articleinfo = res.data.ret.data;
            self.pagetotal = res.data.ret.total;
            self.currentpage = res.data.ret.current_page;
            self.prevurl = res.data.ret.prev_page_url;
            self.nexturl = res.data.ret.next_page_url;
            self.pageto = res.data.ret.to;
            self.pageper = Number(res.data.ret.per_page);
          }).catch((err)=>{

          })
        }else{
          self.statustext = '我的认可';
          self.title = "收藏文章列表"
          self.selectill(self.illid);
        }
      },
      gotoArticle : function(articleid, ill_id){
        self.common.goToArticleDetailWithCollected({router: self.$router, articleid : articleid, illid : ill_id});
      },
      gotoAllArticle : function(){
        self.common.jumpToPage({router: self.$router, url: '../doctor/systemarticle'})
      },
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
      gotoSeletIll : function(){
self.common.jumpToPage({router : self.$router, url : "/MBGL/doctor/collectarticle/selectill"})
      },
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
      clickBack : function () {
        let doctor = JSON.parse(localStorage.getItem("doctor"));
        doctor.default_ill = '';
        localStorage.setItem("doctor", JSON.stringify(doctor));
        self.api.doc_updataDefaultIll({user_id : localStorage.getItem("doc_id"), default_ill : '', token : localStorage.getItem("token")}).then((res)=>{
          if(res){
            self.common.clickBack();
          }
        }).catch((err)=>{

        })
      },
      home : function(){
        self.common.jumpToPage({router : self.$router, url : "/MBGL/doctor/index"})
      }
    },
  }
  // window.addEventListener("popstate", function(e) {
  //   if(e.state != null){
  //       let doctor = JSON.parse(localStorage.getItem("doctor"));
  //       doctor.default_ill = '';
  //       localStorage.setItem("doctor", JSON.stringify(doctor));
  //       api.doc_updataDefaultIll({user_id : localStorage.getItem("doc_id"), default_ill : '', token : localStorage.getItem("token")}).then((res)=>{
  //       }).catch((err)=>{
  //       })}
  // }, false);


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
.lastli{
  border: none;
}
</style>