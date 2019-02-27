<template>
  <div style="background-color:#FFFFFF">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">选择教学疾病</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <ul class="aui-list aui-form-list">
      <li class="aui-list-item" style="border:none;background-color:#F1F1F1">
        <div class="aui-list-item-inner">
            已选择的疾病 （点击删除）
        </div>
      </li>
      <li class="aui-list-item" style="border:none;">
        <div class="aui-list-item-inner">
          <div class="illselected" v-bind:value="item.id" v-for="(item,key) of illselected" @click="moveoutill(item, item.id)">{{item.ill.name}}</div>
        </div>
      </li>
      <li class="aui-list-item" style="border:none;background-color:#F1F1F1">
        <div class="aui-list-item-inner">
            内科疾病 （点击添加）
        </div>
      </li>
      <li class="aui-list-item" style="border:none;height:15rem">
        <div class="aui-list-item-inner">
          <div class="illList" v-bind:id="item.id" v-bind:value="item.id" v-for="(item,key) of illinfo" @click="selectill(item, item.id)">
          <div >{{item.ill.name}}</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="mainbtn-main"  style="margin-top: 2rem" @click="doSubmitill">确定</div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      var departmentid = self.$route.query.departmentid;
      //获取科室疾病列表
      self.api.doc_getDepartmentIllList({department_id : departmentid}).then((res)=>{
        //self.common.consoledebug.log("ret :" + JSON.stringify(res.data.ret));
        self.illinfo = res.data.ret;
      }).catch((err)=>{

      })
    },
    data(){
      return {
        illinfo : [],         //疾病列表
        illselected : [],     //已选择疾病列表
      }
    },
    methods :{
      selectill : function(obj, id){
        for(var i = 0 ; i < self.illselected.length; i++)
        {
          //如果已选择则不重复添加
          if(self.illselected[i] == obj){
            return false;
          }
        }
        //加入已选择列表
        self.illselected.push(obj);
        //改变已选择疾病的颜色
        document.getElementById(id).style.backgroundColor = '#03a9f4';
        document.getElementById(id).style.color = '#FFFFFF'
      },
      moveoutill : function(obj, id){
        for(var i = 0 ; i < self.illselected.length; i++)
        {
          if(self.illselected[i] == obj){
            //从已选择列表中删除
            self.illselected.splice(i,1);
            //把颜色变回来 ^_^
            document.getElementById(id).style.backgroundColor = '#FFFFFF';
            document.getElementById(id).style.color = '#000000'
          }
        }
      },
      doSubmitill : function(){
        var ill_ids = "";
        var ill_names = "";
        if(self.illselected != null){
          for(var i = 0; i < self.illselected.length ; i++){
            if(i != self.illselected.length-1 ){
              ill_ids += self.illselected[i].ill_id + "&";
              ill_names += self.illselected[i].ill.name + ",";
            }else{
              ill_ids += self.illselected[i].ill_id;
              ill_names += self.illselected[i].ill.name;
            }
          }
        }
        if(ill_ids ==""){
          MessageBox('提示','请选择疾病！');
          return false;
        }
        self.common.goToDoctorApply({router: self.$router, ill_ids : ill_ids, ill_names : ill_names});
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
  }

</script>
<style>
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
.illselected{
  text-align: center;
  width:80px;
  float:left;
  min-width: 80px;
  height:1.5rem;
  line-height: 1.5rem;
  border: solid 1px;
  border-radius:0.8rem;
  border-color: #03a9f4;
  color:#FFFFFF;
  font-size: 0.65rem;
  background-color: #03a9f4;
  box-shadow: none;
  margin-left: auto;
  margin-right: auto;
}
</style>