<template>
  <div v-if="showflg">
    <div v-show="indexflg">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">医师资格认证</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
      </a>
    </header>
    <ul class="aui-list aui-form-list" style="margin-top:0.5rem">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              医院
            </div>
            <div class="aui-list-item-input">
              <select v-model="hospital" @change="changeHosipital" class="select">
                <option  v-bind:key="key" v-bind:value="item.id" v-for="(item,key) of hospitalinfo" >{{item.hospital_name}}</option>
                <!-- <option value="0" >{{hospitalinput}}</option> -->
              </select>
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label" style="width:70%">
              科室
            </div>
            <div class="aui-list-item-input">
              <select v-model="department" class="select">
                <option  v-bind:key="key" v-bind:value="item.id" v-for="(item,key) of departmentinfo" >{{item.name}}</option>
                <!-- <option value="0" >{{hospitalinput}}</option> -->
              </select>
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              职称
            </div>
            <div class="aui-list-item-input">
              <utilselect :selectvalue="doctor_title" :utilparam="doctor_titleutil" :id="doctor_titleutil" @changeSelect="titleChange"></utilselect>
            </div>
          </div>
        </li>
        <li class="aui-list-item" style="border:none">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label" style="width:40%">
              选择教学疾病
            </div>
            <div class="aui-list-item-input" @click="gotoselectill" style="width: 200px;">
              <div class="aui-text-right" >
                <input type="text" class="aui-text-right" style="color: #B3B3B3" maxlength="15"  placeholder="未选择"
                       v-model="illnames">
                       <!-- <div class="aui-text-right" style="color: #B3B3B3" >{{illnames}}</div> -->
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="aui-list aui-form-list" style="margin-top:0.5rem">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              个人简介
            </div>
          </div>
        </li>
        <div class="aui-border-b">
                <textarea id="desc" name="desc" class="aui-font-size-14 aui-padded-10" style="width: 100%;height:auto;border: 0px;
                                        line-height: 22px;color:#666666;outline: none; overflow-y:visible" rows="6"
                          placeholder="请输入个人介绍，字数在140字以内..." maxlength="140" v-model="desc"></textarea>
                </div>
      </ul>
      <ul class="aui-list aui-form-list" style="margin-top:0.5rem">
        <li  style="border:none;margin-left:0.5rem;padding-top:0.5rem">
              医师资格证书
        </li>
        <li  style="border:none;margin-left:0.5rem;color:#B3B3B3">
              请上传完整医师资格证书详情页
        </li>
        <upload :src='zgrzurl' @changeSrc="zgrzChange"></upload>
      </ul>
      <ul class="aui-list aui-form-list" style="margin-top:0.5rem">
        <li  style="border:none;margin-left:0.5rem;padding-top:0.5rem">
              医师执业证书
        </li>
        <li  style="border:none;margin-left:0.5rem;color:#B3B3B3">
              请上传带有执业地点详情页的图片
        </li>
        <upload :src='zyrzurl' @changeSrc="zyrzChange"></upload>
      </ul>
      <div class="mainbtn-main"  style="margin-top: 2rem" @click="doDoctorApply">资格认证</div>
  </div>
  <div v-if="selectillflg" style="background-color:#FFFFFF">
     <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="goBackToApplyIndex">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">选择教学疾病</div>
      <a class="aui-pull-right" @click="home">
        <span style="color:#FFFFFF;font-size:0.66rem">返回首页</span>
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
          <div class="illselected" v-for="(item,key) of illselected" @click="moveoutill(item, item.ill.id)">{{item.ill.name}}</div>
        </div>
      </li>
      <li class="aui-list-item" style="border:none;background-color:#F1F1F1">
        <div class="aui-list-item-inner">
            内科疾病 （点击添加）
        </div>
      </li>
      <li class="aui-list-item" style="border:none;background-image:none;">
        <div class="illList" style="margin-top:1rem" v-bind:id="item.ill.id"  v-for="(item,key) of illinfo" @click="selectill(item, item.ill.id)">
          <div >{{item.ill.name}}</div>
          </div>
      </li>
    </ul>
    <!-- <div>
      <div class="illList" v-bind:id="item.id" v-bind:value="item.id" v-for="(item,key) of illinfo" @click="selectill(item, item.id)">{{item.ill.name}}</div>
    </div> -->
    <div class="mainbtn-main"  style="margin-top: 2rem" @click="doSubmitill">确定</div>
  </div>
  </div>
  </div>
</template>
<script>
  const back_delete_ill = false;
  import { MessageBox } from 'mint-ui';
  //七牛组件
  import upload from '../../../../../components/page/qnupload.vue';   
  //下拉组件
  import Select from '../../../../../components/page/select.vue'
  var self = null;    //在create方法中初始化为this
  var hospitalSelected = '' //传过来的选择的医院名称
  export default {
    components: {
      'upload':upload,
      'utilselect':Select,
    },
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    data(){
      return {
        showflg : false,
        indexflg : true,
        selectillflg : false,
        zgrzurl : '',                             //资格证书图片
        zyrzurl : '',                             //执业证书图片
        desc : '',                                //个人简介
        hospital : '',                            //所属医院
        hospitalname : '',                        //医院名称
        hospitalinfo: null,                       //医院列表
        departmentinfo : null,                    //科室列表
        doctor_title : '',                        //医生的职称
        department : '',                          //医院科室
        departmentname : '',                      //医院科室名称
        illnames : '',                            //教学疾病
        illids : '',                              //教学疾病id
        info : null,                              //xinxi列表
        illinfo : [],                             //疾病列表
        illselected : [],                         //已选择疾病列表
        doctor_titleutil : 'doctor_title_val ',   //医生职称数组常量
      }
    },
    mounted(){
      history.replaceState(null,null,'?type=0');
      //初始化
      self.init();
    },
    methods :{
      //以下为主页面的方法
      init : function(){
        //获取医院列表
        self.api.doc_getHospitalList({user_id : localStorage.getItem("doc_id"), role : 'doctor'}).then((res)=>{
          self.hospitalinfo = res.data.ret;
        }).catch((err)=>{
        })
        //获取用户信息
        self.api.doc_docapplyIndex({user_id : localStorage.getItem("doc_id")}).then((res)=>{
          //self.common.consoledebug.log("ret :" + JSON.stringify(res.data.ret));
          //信息赋值
          self.info = res.data.ret;
          self.hospital = self.info.hospital_cache;
          self.hospitalname = self.info.hospital_name;
          self.doctor_title = self.info.title_cache;
          self.departmentname = self.info.department_name;
          self.department = self.info.department_id_cache;
          ///self.olddepartment = self.info.department_id_cache;
          self.desc = self.info.desc_cache;
          self.zgrzurl = self.info.zgzj_img;
          self.zyrzurl = self.info.zyzj_img;
          self.illids = self.info.ill_ids_cache;
          self.illnames = self.info.ill_ids_str;
          //self.common.consoledebug.log("初始化时url :" + JSON.stringify(self.zgrzurl));
          //获取科室列表
          self.getDepartmentList();
          self.showflg = true;
        }).catch((err)=>{
        })
      },
      getDepartmentList : function(){
        self.api.doc_getDepartmentList({hospital_id : self.hospital}).then((res)=>{
          //self.common.consoledebug.log("ret :" + JSON.stringify(res.data.ret));
          //self.department = "";
          self.departmentinfo = res.data.ret;
        }).catch((err)=>{
        })
      },
      changeHosipital : function(){
        self.api.doc_getDepartmentList({hospital_id : self.hospital}).then((res)=>{
          //self.common.consoledebug.log("ret :" + JSON.stringify(res.data.ret));
          self.department = "";
          self.departmentinfo = res.data.ret;
        }).catch((err)=>{
        })
      },
      doDoctorApply : function(){
        //校验
        if(self.hospital == ""|| self.hospital == undefined)
        {
          MessageBox('提示','请选择医院！')
          return false;
        }
        if(self.department == ""|| self.department == undefined)
        {
          MessageBox('提示','请选择科室！')
          return false;
        }
        if(self.doctor_title == ""|| self.doctor_title == undefined)
        {
          MessageBox('提示','请选择职称！')
          return false;
        }
        if(self.illids == "" || self.illids == undefined)
        {
          MessageBox('提示','请选择疾病！')
          return false;
        }
        if(self.desc == "" || self.desc == undefined)
        {
          MessageBox('提示','请填写简介')
          return false;
        }
        if(self.zgrzurl == "" || self.zgrzurl == null)
        {
          MessageBox('提示','请上传资格认证图片')
          return false;
        }
        if(self.zyrzurl == "" || self.zyrzurl == null)
        {
          MessageBox('提示','请上传执业证书图片')
          return false;
        }
        if(self.desc.length < 20 )
        {
          MessageBox('提示','个人简介应在20字以上')
          return false;
        }
        //医生资格认证申请
        let params = {
          user_id: localStorage.getItem("doc_id"),
          token: localStorage.getItem("token"),
          hospital : self.hospital,
          title : self.doctor_title,
          department_id : self.department,
          ill_ids : self.illids,
          desc : self.desc,
          zgzj_img : self.zgrzurl,
          zyzj_img : self.zyrzurl,
        }
        //self.common.consoledebug.log("资格申请时的url :" + JSON.stringify(self.zgrzurl));
        self.api.doc_docApply(params).then((res)=>{
          //self.common.consoledebug.log("ret :" + JSON.stringify(res));
          MessageBox('提示','资格申请已提交！');
          self.common.jumpToPage({router: self.$router, url : "../index"});
        }).catch((err)=>{

        })
      },
      zgrzChange : function(data){
        //self.common.consoledebug.log("你把资格认证图片url改为：" + data.url);
        self.zgrzurl = data.url;
      },
      zyrzChange : function(data){
        self.zyrzurl = data.url;
      },
      titleChange : function(data){
        self.doctor_title = data.value;
      },
      //跳转到选择基础疾病页面
      gotoselectill : function(){
        var departmentid = self.department;
        self.illselected = [];
        //获取科室疾病列表
        self.api.doc_getDepartmentIllList({department_id : departmentid}).then((res)=>{
          //self.common.consoledebug.log("ret :" + JSON.stringify(res.data.ret));
          self.illinfo = res.data.ret;
        }).catch((err)=>{

        })
        
        self.indexflg = false;
        self.selectillflg = true;
      },
      //以下为选择基础疾病页面方法
      selectill : function(obj, id){
        //self.common.consoledebug.log("obj:" + obj);
        if(self.illselected != null){
        for(var i = 0 ; i < self.illselected.length; i++)
        {
          //如果已选择则不重复添加
          if(self.illselected[i] == obj){
            return false;
          }
        }}
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
        self.illnames = ill_names;
        self.illids = ill_ids;
        self.selectillflg = false;
        self.indexflg = true;
      },
      goBackToApplyIndex : function(){
        self.selectillflg = false;
        self.indexflg = true;
        //self.init();
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
.select{
  width: 250px;
  direction: rtl;
}
</style>
