<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">审核文章</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
      <div v-if="dshflg">
        <div class="aui-tab" id="tab">
                <div class="aui-tab-item" style="font-size: 0.6rem;color: #03a9f4;" >
                    待审核
                </div>
                <div class="aui-tab-item" style="font-size: 0.6rem;background: #f3f3f3;" @click="gotoYshList">
                    已审核
                </div>
        </div>
        <ul class="aui-list aui-form-list">
        <li class="aui-list-item" v-for="(item,key) of dsharticleinfo" @click="gotoArticle(item.article_id, item.id, 0)" :class="key == dsharticleinfo.length-1?'lastli':''">
          <div class="aui-list-item-inner aui-list-item-arrow">
            <div>
              {{item.article.title}}
            </div>
            <a class="aui-pull-right" >
              <span style="color: #03a9f4;margin-right: 1.5rem;font-size:0.65rem">待审核</span>
            </a>
          </div>
        </li>
        </ul>
      </div>
      <div v-if="yshflg">
        <div class="aui-tab" id="tab">
          <div class="aui-tab-item" style="font-size: 0.6rem;background: #f3f3f3;" @click="gotoDsyList">
              待审核
          </div>
          <div class="aui-tab-item" style="font-size: 0.6rem;color: #03a9f4;" >
              已审核
          </div>
        </div>
        <ul class="aui-list aui-form-list">
          <li class="aui-list-item" v-for="(item,key) of ysharticleinfo" @click="gotoArticle(item.article_id, item.id, 999)" :class="key == ysharticleinfo.length-1?'lastli':''">
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div>
                {{item.name}}
              </div>
              <a class="aui-pull-right" >
                <span v-if="item.shenhe_status.level2_status == 1"style="color: #B3B3B3;margin-right: 1.5rem;font-size:0.65rem">待审核</span>
                <span v-if="item.shenhe_status.level2_status == 2"style="color: rgb(103, 248, 135);margin-right: 1.5rem;font-size:0.65rem">{{item.shenhe_status.level2_status_str}}</span>
                <span v-if="item.shenhe_status.level2_status == 3"style="color: red;margin-right: 1.5rem;font-size:0.65rem">{{item.shenhe_status.level2_status_str}}</span>
              </a>
            </div>
          </li>
          </ul>
      </div>
    <div v-if="paginflg">
      <div v-show="dsharticleinfo != '' && pagetotal > 6 " class="block" style="text-align:center;background-color:#FFFFFF;padding-top:1rem">
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
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted() {
      //初始化
      self.init();
    },
    data(){
      return {
        currentpage : '',     //目前是第几页
        prevurl : '',      //上一页的url
        nexturl :'',       //下一页的url
        pageto :'',        //最后一页（共有几页）
        pageper :'',       //每页有几条数据
        dshflg : true,      //待审核文章列表显示标志
        yshflg : false,     //已审核文章列表显示标志
        paginflg : false,   //分页显示标志
        dsharticleinfo : null, //待审核文章列表
        ysharticleinfo : null, //已审核文章列表
      }
    },
    methods :{
      init : function(){
        //获取待审核文章列表
        self.api.doc_getArticleWaitList({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role")}).then((res)=>{
          //self.common.consoledebug.log("res : " + JSON.stringify(res.data.ret));
          //页面信息赋值
          self.dsharticleinfo = res.data.ret.data;
          self.pagetotal = res.data.ret.total;
          self.currentpage = res.data.ret.current_page;
          self.prevurl = res.data.ret.prev_page_url;
          self.nexturl = res.data.ret.next_page_url;
          self.pageto = res.data.ret.to;
          self.pageper = Number(res.data.ret.per_page);
          self.paginflg = true;
        }).catch((err)=>{

        })

      },
      //查看文章详情
      gotoArticle : function(articleid, shenheid, type){
        self.common.jumpToPageWithArticleid({router: self.$router, url : "../doctor/assessarticle/detail", articleid : articleid, type : type, shenheid : shenheid});
      },
      //获取和显示已审核文章列表
      gotoYshList : function(){
        self.dshflg =false;
        self.yshflg = true;
        self.api.doc_getArticleReadyList({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role")}).then((res)=>{
          self.common.consoledebug.log("res : " + JSON.stringify(res.data.ret));
           self.ysharticleinfo = res.data.ret.data;
          // self.pagetotal = res.data.ret.total;
          // self.currentpage = res.data.ret.current_page;
          // self.prevurl = res.data.ret.prev_page_url;
          // self.nexturl = res.data.ret.next_page_url;
          // self.pageto = res.data.ret.to;
          // self.pageper = Number(res.data.ret.per_page);
          // self.paginflg = true;
        }).catch((err)=>{

        })
      },
      //页面重新回到待审核文章列表
      gotoDsyList : function(){
        self.dshflg = true;
        self.yshflg = false;
        self.init();
      },
      //分页，下一页
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
      //分页，上一页
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
        self.common.clickBack();
      }
    },
  }

</script>
<style scoped>
.lastli{
  border: none;
}
</style>