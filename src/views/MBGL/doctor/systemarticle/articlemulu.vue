<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">全部文章</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <!-- <span style="margin-top:0.5rem;margin-left:0.5rem;color:#03a9f4;font-size:0.7rem">选择疾病 </span> -->
    
    <div v-if="catalogflg">
    <tree :illid='illid' :type="'article'" @selectBymuluid="selectBymuluid"></tree>
    </div>
  </div>
</template>
<script>
  import Tree from '../../../../components/page/catalogtree.vue';
  import api from '../../../../assets/js/api';
  var self = null;    //在create方法中初始化为this
  const back_delete_ill = true;
  export default {
    components: {
      'Tree':Tree,
    },
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      //获取疾病
      self.illid = self.$route.query.param;
      self.selectill(self.illid);
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
      selectill : function(illid){
        self.catalogflg = true;
      },
      selectBymuluid : function(data){
        //param: mulu_id
        self.common.goToArticleList({router: self.$router, muluid : data.id,illid:self.illid});
        // self.api.doc_getArticlelist({mulu_id : data.id}).then((res)=>{
        //   //self.common.consoledebug.log("res :"  + JSON.stringify(res.data.ret));
        //   self.articleinfo = res.data.ret.data;
        //   self.pagetotal = res.data.ret.total;
        //   self.currentpage = res.data.ret.current_page;
        //   self.prevurl = res.data.ret.prev_page_url;
        //   self.nexturl = res.data.ret.next_page_url;
        //   self.pageto = res.data.ret.to;
        //   self.pageper = Number(res.data.ret.per_page);
        //   self.path = res.data.ret.path;
        //   self.firsturl = res.data.ret.first_page_url;
        //   self.illflg = false;
        //   self.catalogflg = false;
        //   self.articleflg =true;
        // }).catch((err)=>{

        // })
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
  
// if(window.history && window.history.pushState) {
// 	window.addEventListener('popstate', function() {
// 		var hashLocation = location.hash;
// 		var hashSplit = hashLocation.split("#!/");
// 		var hashName = hashSplit[1];
// 		if(hashName !== '') {
// 			var hash = window.location.hash;
// 			if(hash === '') {
// 				alert("你点击了返回键");
// 			}
// 		}
// 	});
// 	window.history.pushState('forward', null, './#forward');
// }
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