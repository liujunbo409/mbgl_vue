<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">文章列表</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <div v-if="articleflg">
      <ul class="aui-list aui-form-list">
      <li class="aui-list-item" v-for="(item,key) of articleinfo" @click="gotoArticle(item.article.id)" :class="key == articleinfo.length-1?'lastli':''">
        <div class="aui-list-item-inner">
          <div>
            {{item.article.title}}
            <div>
        <span style="font-size:0.55rem;color:#B3B3B3">收藏 :{{item.article_data.used_num}}</span>
            <span style="margin-left:1rem;font-size:0.55rem;color:#B3B3B3">认可 : {{item.article_data.accept_num}}</span>
            <span style="margin-left:1rem;font-size:0.55rem;color:#B3B3B3">浏览 :{{item.article_data.doctor_show_num + item.article_data.user_show_num}}</span>
        </div>
          </div>
          <span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
        </div>
      </li>
      </ul>
       <div v-show="articleinfo != ''" class="block" style="text-align:center;background-color:#FFFFFF;padding-top:1rem">
        <el-pagination
          @prev-click = "gotoPrev"
          @next-click = "gotoNext"
          @current-change="handleCurrentChange"
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
  import Tree from '../../../../components/page/catalogtree.vue'
  var self = null;    //在create方法中初始化为this
  const back_delete_ill = false;
  export default {
    components: {
      'Tree':Tree,
    },
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      //获取目录id
      self.muluid = self.$route.query.muluid;
      self.illid = self.$route.query.illid;
      self.selectBymuluid(self.muluid);
    },
    data(){
      return {
        illid : '',                              //选择的疾病目录id
        muluid : '',
        illinfo: null,
        articleinfo : null,
        illflg : true,
        catalogflg : false,
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
        var muluid = self.firsturl.split("?");
        muluid = muluid[1].split("&");
        muluid = muluid[0];
        //console.log(muluid);
        this.api.axios_ajax(self.path + '?' + muluid + '&page=' + page, '', 'GET', true).then((res)=>{
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
      selectBymuluid : function(mulu_id){
        self.api.doc_getArticlelist({mulu_id : mulu_id}).then((res)=>{
          //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
          self.articleinfo = res.data.ret.data;
          self.pagetotal = res.data.ret.total;
          self.currentpage = res.data.ret.current_page;
          self.prevurl = res.data.ret.prev_page_url;
          self.nexturl = res.data.ret.next_page_url;
          self.pageto = res.data.ret.to;
          self.pageper = Number(res.data.ret.per_page);
          self.path = res.data.ret.path;
          self.firsturl = res.data.ret.first_page_url;
          self.articleflg =true;
        }).catch((err)=>{

        })
      },
      gotoArticle : function(articleid){
        self.common.goToArticleDetail({router: self.$router, articleid : articleid, muluid : self.muluid, illid : self.illid});
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