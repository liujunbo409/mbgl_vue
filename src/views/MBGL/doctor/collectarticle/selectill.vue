<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">{{title}}</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <div>
      <div class="illList" style="margin-top:1rem; width:40%;margin-left:1.25rem" v-bind:id="item.id" v-bind:value="item.id" v-for="(item,key) of illinfo" @click="selectill(item.id)">
          <div >{{item.name}}</div>
          </div>
    </div>
  </div>
</template>
<script>
  const back_delete_ill = false;
  import Tree from '../../../../components/page/catalogtree.vue'
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      //初始化
        self.init();
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
      init : function(){
        self.api.doc_getIlllist().then((res)=>{
        self.illinfo = res.data.ret;
        let doctor = JSON.parse(localStorage.getItem("doctor"));
        if(doctor.default_ill != '' && doctor.default_ill != null && doctor!=''){
        self.common.jumpToPageByParam({router : self.$router, url : "../collectarticle", param : doctor.default_ill});
        }
      }).catch((err)=>{
      })
      },
      selectill : function(illid){
        self.illid = illid;
        let doctor = JSON.parse(localStorage.getItem("doctor"));
        doctor.default_ill = illid;
        self.api.doc_updataDefaultIll({user_id : localStorage.getItem("doc_id"), default_ill : illid, token : localStorage.getItem("token")}).then((res)=>{
          if(res){
            localStorage.setItem("doctor", JSON.stringify(doctor));
            self.common.jumpToPageByParam({router : self.$router, url : "../collectarticle", param : illid});

          }
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