<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">我收藏的问答题库</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
      </a>
    </header>
      <div style="display: flex;">
        <input v-model="questionSearch" style="width: 80%;line-height: 1.5rem;">
        <div @click="getQaCollectList()" class="searchbtn">搜索</div>
      </div>
      <ul class="aui-list aui-form-list">
      <li class="aui-list-item" v-for="(item,key) of qaList" @click="gotoQainfo(item.qa.id)" :class="key == qaList.length-1?'lastli':''">
        <div class="aui-list-item-inner">
          <div>
            {{item.qa.question}}
            <div>
            <span style="margin-left:1rem;font-size:0.55rem;color:#B3B3B3">收藏时间 :{{item.created_at}}</span>
        </div>
          </div>
          <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
        </div>
      </li>
      </ul>
       <div v-show="qaList != ''" class="block" style="text-align:center;background-color:#FFFFFF;padding-top:1rem">
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
</template>
<script>
  const back_delete_ill = false;
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      self.init();
    },
    data(){
      return {
        illid : '',                              //选择的疾病目录id
        illinfo: null,
        qaList : null,
        banknow : '',//当前选择目录
        pagetotal : 0,    //共有多少条数据
        currentpage :1,     //目前是第几页
        prevurl : '',      //上一页的url
        nexturl :'',       //下一页的url
        pageto :1,        //最后一页（共有几页）
        pageper :15,       //每页有几条数据
        questionSearch : '', //查询条件
      }
    },
    methods :{
       init : function(){
       self.api.doc_getQaCollectList({user_id : localStorage.getItem("doc_id")}).then((res)=>{
          //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
          self.qaList = res.data.ret.collections.data;
          self.pagetotal = res.data.ret.collections.total;
          self.currentpage = res.data.ret.collections.current_page;
          self.prevurl = res.data.ret.collections.prev_page_url;
          self.nexturl = res.data.ret.collections.next_page_url;
          self.pageto = res.data.ret.collections.to;
          self.pageper = Number(res.data.ret.collections.per_page);
          self.questionSearch = res.data.ret.questionSearch;
        }).catch((err)=>{

        })
      },
      //查询收藏问答
      getQaCollectList : function(){
        self.api.doc_getQaCollectList({user_id : localStorage.getItem("doc_id"),questionSearch:self.questionSearch}).then((res)=>{
          //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
          self.qaList = res.data.ret.collections.data;
          self.pagetotal = res.data.ret.collections.total;
          self.currentpage = res.data.ret.collections.current_page;
          self.prevurl = res.data.ret.collections.prev_page_url;
          self.nexturl = res.data.ret.collections.next_page_url;
          self.pageto = res.data.ret.collections.to;
          self.pageper = Number(res.data.ret.collections.per_page);
          self.questionSearch = res.data.ret.questionSearch;
        }).catch((err)=>{

        })
      },
      gotoQainfo : function(id){
        self.common.gotoQaDetail({router: self.$router, url : "../doctor/Qadetail", question_id : id,bank_id:self.banknow});
      },
      gotoNext : function(){
        this.api.axios_ajax(this.nexturl, '', 'GET', false).then((res)=>{
          //console.log("数据：" + JSON.stringify(res.data.ret) );
         self.qaList = res.data.ret.collections.data;
          self.questionSearch = res.data.ret.questionSearch;
          self.currentpage = res.data.ret.collections.current_page;
          self.prevurl = res.data.ret.collections.prev_page_url;
          self.nexturl = res.data.ret.collections.next_page_url;
          self.pageto =  res.data.ret.collections.to;
          self.pageper = Number(res.data.ret.collections.per_page);
        }).catch((err)=>{

        })

      },
      gotoPrev : function (){
        this.api.axios_ajax(this.prevurl, '', 'GET', false).then((res)=>{
          //console.log("数据：" + JSON.stringify(res.data.ret) );
          self.qaList = res.data.ret.collections.data;
          self.questionSearch = res.data.ret.questionSearch;
          self.currentpage = res.data.ret.collections.current_page;
          self.prevurl = res.data.ret.collections.prev_page_url;
          self.nexturl = res.data.ret.collections.next_page_url;
          self.pageto =  res.data.ret.collections.to;
          self.pageper = Number(res.data.ret.collections.per_page);
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