<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">问答题库</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
      </a>
    </header>
    <div  v-if="illflg">
      <div class="illList" style="margin-top:1rem; width:40%;margin-left:1.25rem" v-bind:id="item.id" v-bind:value="item.id" v-for="(item,key) of illinfo" @click="selectill(item.id)">
          <div >{{item.name}}</div>
          </div>
    </div>
  </div>
</template>
<script>
  import Tree from '../../../../components/page/catalogtree.vue'
  const back_delete_ill = false;
  var self = null;    //在create方法中初始化为this
  export default {
    components: {
      'Tree':Tree,
    },
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      //获取疾病
      self.api.doc_getIlllist().then((res)=>{
        self.illinfo = res.data.ret;
        self.init();
      }).catch((err)=>{

      })
    },
    data(){
      return {
        illid : '',                              //选择的疾病目录id
        illinfo: null,
        qaList : null,
        illflg : true,
        catalogflg : false,
        cataloguse : false,//是否按照分类查询
        articleflg : false,
        banknow : '',//当前选择目录
        pagetotal : '',    //共有多少条数据
        currentpage : '',     //目前是第几页
        prevurl : '',      //上一页的url
        nexturl :'',       //下一页的url
        pageto :'',        //最后一页（共有几页）
        pageper :'',       //每页有几条数据
        questionSearch : '', //查询条件
        path : '',        //分页的url
        firsturl : '',    //第一页url
      }
    },
    methods :{
      init : function(){
        let doctor = JSON.parse(localStorage.getItem("doctor"));
        if(doctor.default_ill != '' && doctor.default_ill != null && doctor!=''){
            self.common.jumpToPageByParam({router : self.$router, url : "../doctor/Qafenleiselect", param : doctor.default_ill})
        }
      },
      selectill : function(illid){
        self.illid = illid;
        let doctor = JSON.parse(localStorage.getItem("doctor"));
        doctor.default_ill = illid;
        self.api.doc_updataDefaultIll({user_id : localStorage.getItem("doc_id"), default_ill : illid, token : localStorage.getItem("token")}).then((res)=>{
          if(res){
            localStorage.setItem("doctor", JSON.stringify(doctor));
            self.common.jumpToPageByParam({router : self.$router, url : "../doctor/Qafenleiselect", param : self.illid})
          }
        }).catch((err)=>{
        })
      },
       rechoseIll : function(){
        self.cataloguse = false;//不使用分类
        self.catalogflg = false;//不显示分类树
        self.illflg = true;//显示疾病列表
        self.articleflg = false;//不显示问答列表
      },
      changeiIlflg : function(type){
        if(type=='0'){// 忽略分类
            self.cataloguse = false;//不使用分类
            self.catalogflg = false;//不显示分类树
            self.getillQaList();
        }
        else{//重新选择分类
            self.cataloguse = true;//使用分类
            self.catalogflg = true;//不显示分类树
            self.articleflg = false;//隐藏问答列表
        }
      },
      selectBymuluid : function(data){
        self.banknow = data.id;
        self.api.doc_getQalist({bank_id : self.banknow}).then((res)=>{
          //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
          self.qaList = res.data.ret.data.data;
          self.questionSearch = res.data.ret.questionSearch;
          self.pagetotal = res.data.ret.data.total;
          self.currentpage = res.data.ret.data.current_page;
          self.prevurl = res.data.ret.data.prev_page_url;
          self.nexturl = res.data.ret.data.next_page_url;
          self.firsturl = res.data.ret.data.first_page_url;
          self.pageto = res.data.ret.data.to;
          self.path = res.data.ret.data.path;
          self.pageper = Number(res.data.ret.data.per_page);
          self.illflg = false;
          self.catalogflg = false;
          self.cataloguse = true;//使用分类
          self.articleflg =true;
        }).catch((err)=>{

        })
      },
       getillQaList : function(){
        self.api.doc_getillQaList({ill_id : self.illid,questionSearch:self.questionSearch}).then((res)=>{
          //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
          self.qaList = res.data.ret.data.data;
          self.pagetotal = res.data.ret.data.total;
          self.currentpage = res.data.ret.data.current_page;
          self.prevurl = res.data.ret.data.prev_page_url;
          self.nexturl = res.data.ret.data.next_page_url;
          self.firsturl = res.data.ret.data.first_page_url;
          self.pageto = res.data.ret.data.to;
          self.path = res.data.ret.data.path;
          self.pageper = Number(res.data.ret.per_page);
          self.illflg = false;
          self.catalogflg = false;
          self.articleflg =true;
          self.questionSearch = res.data.ret.questionSearch;
          //console.log(self.firsturl);
       // console.log(self.path);
        }).catch((err)=>{

        })
      },
      searchQaList : function(){
        if(self.cataloguse){//按照分类查询
        self.api.doc_getQalist({bank_id :self.banknow,questionSearch:self.questionSearch}).then((res)=>{
          //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
          self.qaList = res.data.ret.data.data;
          self.questionSearch = res.data.ret.questionSearch;
          self.pagetotal = res.data.ret.data.total;
          self.currentpage = res.data.ret.data.current_page;
          self.prevurl = res.data.ret.data.prev_page_url;
          self.nexturl = res.data.ret.data.next_page_url;
          self.pageto = res.data.ret.data.to;
          self.pageper = Number(res.data.ret.data.per_page);
          self.illflg = false;
          self.catalogflg = false;
          self.articleflg =true;
        }).catch((err)=>{

        })
         }
        else{//不按照分类查询
            self.getillQaList();
        }
      },
      gotoQainfo : function(id){
        self.common.gotoQaDetail({router: self.$router, url : "../doctor/Qadetail", question_id : id,bank_id:self.banknow});
      },
      gotoNext : function(){
        this.api.axios_ajax(this.nexturl, '', 'GET', false).then((res)=>{
          //console.log("数据：" + JSON.stringify(res.data.ret) );
          self.qaList = res.data.ret.data.data;
          self.questionSearch = res.data.ret.questionSearch;
          self.currentpage = res.data.ret.data.current_page;
          self.prevurl = res.data.ret.data.prev_page_url;
          self.nexturl = res.data.ret.data.next_page_url;
          self.pageto =  res.data.ret.data.to;
          self.pageper = Number(res.data.ret.data.per_page);
        }).catch((err)=>{

        })

      },
      gotoPrev : function (){
        this.api.axios_ajax(this.prevurl, '', 'GET', false).then((res)=>{
          //console.log("数据：" + JSON.stringify(res.data.ret) );
          self.qaList = res.data.ret.data.data;
          self.questionSearch = res.data.ret.questionSearch;
          self.currentpage = res.data.ret.data.current_page;
          self.prevurl = res.data.ret.data.prev_page_url;
          self.nexturl = res.data.ret.data.next_page_url;
          self.pageto =  res.data.ret.data.to;
          self.pageper = Number(res.data.ret.data.per_page);
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
.lastli{
  border: none;
}
.searchbtn{
  background: #03a9f4;
  color: #fff;
  width: 20%;
  text-align: center;
  line-height: 1.5rem;
}
</style>