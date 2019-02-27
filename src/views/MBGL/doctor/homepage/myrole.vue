<template>
  <div >
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">资格认证</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <ul class="aui-list aui-form-list" style="margin-top:0.5rem">
      <li class="aui-list-item" v-show="docdispflg">
        <div class="aui-list-item-inner" @click="selTab(0)">
          <div class="aui-list-item-label">
            医生
          </div>
          <div class="aui-list-item-input">
            <a class="aui-pull-right" >
              <span v-bind:style="{ color: docstatusColor }">{{docstatus}}</span><span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
      <li class="aui-list-item" style="border:none" v-show="nurdispflg">
        <div class="aui-list-item-inner" @click="selTab(1)">
          <div class="aui-list-item-label">
            护士
          </div>
          <div class="aui-list-item-input">
            <a class="aui-pull-right" >
              <span v-bind:style="{ color: nurstatusColor }">{{nurstatus}}</span><span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
      <li class="aui-list-item" v-show="false" style="border-top:1px solid #B3B3B3">
        <div class="aui-list-item-inner" @click="selTab(2)">
          <div class="aui-list-item-label">
            营养师
          </div>
          <div class="aui-list-item-input">
            <a class="aui-pull-right" >
              <span style="color: #B3B3B3">{{123}}</span><span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
      <li class="aui-list-item" style="border:none" v-show="false">
        <div class="aui-list-item-inner" @click="selTab(3)">
          <div class="aui-list-item-label">
            健身教练
          </div>
          <div class="aui-list-item-input">
            <a class="aui-pull-right" >
              <span style="color: #B3B3B3">{{123}}</span><span class="aui-iconfont aui-icon-right" style="color: #B3B3B3"></span>
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    data(){
      return {
        docdispflg : true,                    //医生认证显示与否
        nurdispflg : true,                    //护士认证显示与否
        docstatusColor : '#B3B3B3',           //医生认证状态字体颜色
        nurstatusColor : '#B3B3B3',           //护士认证状态字体颜色
        docstatus : 'Go',                     //医生审核状态
        nurstatus : 'Go',                     //护士审核状态
        role : null,                          //接口返回的已选择的身份
      }
    },
    mounted(){
      var role = null;
      var doc_id = localStorage.getItem("doc_id");
      //获得医生的信息
      self.api.doc_getByIdWithToken({user_id : doc_id, level : 4}).then((res)=>{
          role = JSON.stringify(res.data.ret.role_str);
          //判断是否显示认证
          // if(role.indexOf("医生") == -1){
          //   self.docdispflg = false;
          // }
          // if(role.indexOf("护士") == -1){
          //   self.nurdispflg = false;
          // }
        }).catch((err)=>{

        });
      //获得认证的审核状态
      self.api.doc_getshenheStatus({user_id : doc_id}).then((res)=>{
          //this.common.consoledebug.log(JSON.stringify(res.data.ret));
          self.docstatus = JSON.stringify(res.data.ret.doctor_status_str).replace(/"/g, "");
          self.nurstatus = JSON.stringify(res.data.ret.nurse_status_str).replace(/"/g, "");
          //初始化认证状态字体的颜色
          this.initStatuscolor(self.docstatus, 'doctor');
          this.initStatuscolor(self.nurstatus, 'nurse');
        }).catch((err)=>{
        });
    },
    methods :{
      //初始化状态字体的颜色
      initStatuscolor : function(status, type) {
        switch(status){
          case "未提交": case "审核驳回":
            if(type == "doctor"){
              this.docstatusColor = 'red';
            }else if(type == "nurse"){ this.nurstatusColor = 'red';}
            break;
          case "审核通过":
            if(type == "doctor"){
              this.docstatusColor = '#47e247';
            }else if(type == "nurse"){ this.nurstatusColor = '#47e247';}
            break;
        }
      },
      selTab : function(index){
        switch (index) {
          //医生资格认证
          case 0:
            self.common.jumpToPage({router: self.$router, url : "../homepage/doctorapply"});
            break;
          //护士资格认证
          case 1:
            self.common.jumpToPage({router: self.$router, url : "../homepage/nurseapply"});
            break;
        }
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
  }
</script>
<style>
/* 未提交 */
</style>
