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
    <div  v-if="illflg">
      <div class="illList" style="margin-top:1rem; width:40%;margin-left:1.25rem" v-bind:id="item.id" v-bind:value="item.id" v-for="(item,key) of illinfo" @click="selectill(item.id)">
          <div >{{item.name}}</div>
          </div>
    </div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  const back_delete_ill = false;
  export default {
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
      init : function(){
        let doctor = JSON.parse(localStorage.getItem("doctor"));
        if(doctor.default_ill != '' && doctor.default_ill != null && doctor!=''){
        self.common.jumpToPageByParam({router : self.$router, url : "../doctor/systemarticle/articlemulu", param : doctor.default_ill});
        }
      },
      selectill : function(illid){
        self.illid = illid;
        let doctor = JSON.parse(localStorage.getItem("doctor"));
        doctor.default_ill = illid;
        self.api.doc_updataDefaultIll({user_id : localStorage.getItem("doc_id"), default_ill : illid, token : localStorage.getItem("token")}).then((res)=>{
          if(res){
            localStorage.setItem("doctor", JSON.stringify(doctor));
            self.common.jumpToPageByParam({router : self.$router, url : "../doctor/systemarticle/articlemulu", param : self.illid});
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