<template>
  <div v-if="showPage_flag">
    <div v-if="infoflg">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">个人信息</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <form id="form-edit" class="form form-horizontal" method="post" onsubmit="">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              姓名
            </div>
            <div class="aui-list-item-input">
              <input type="text" class="aui-text-right aui-text-default" maxlength="15"
                      v-model="realname">
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              昵称
            </div>
            <div class="aui-list-item-input">
              <input type="text" class="aui-text-right aui-text-default" maxlength="15"
                     v-model="nick_name">
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              性别
            </div>
            <div class="aui-list-item-input">
             <utilselect  :selectvalue="gender" :utilparam="genderutil" :id="genderutil" @changeSelect="genderChange"></utilselect>
            </div>
          </div>
        </li>
        <div class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              学历
            </div>
            <div class="aui-list-item-input">
              <utilselect  :selectvalue="xueli" :utilparam="xueliutil" :id="xueliutil" @changeSelect="xueliChange"></utilselect>
            </div>
          </div>
        </div>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              联系方式
            </div>
            <div class="aui-list-item-input">
              <div class="aui-text-right">
                <!-- <input type="text" class="aui-text-right" style="color: #B3B3B3" maxlength="15" disabled
                       v-model="phonenum"> -->
                       <span  class="aui-text-right" style="color: #B3B3B3">{{phonenum}}</span>
              </div>
            </div>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              出生日期
            </div>
              <el-date-picker
              style="padding-left:60px"
                  v-model="birthday"
                  type="date"
                  align="right"
                  :editable=false
                  :clearable=false
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
          </div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              身份证号码
            </div>
            <div class="aui-list-item-input">
              <div class="aui-text-right">
                <input type="text" class="aui-text-right" style="color: #B3B3B3" maxlength="18"
                       v-model="ID_number">
              </div>
            </div>
          </div>
        </li>
        <li class="aui-list-item" style="border:none">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label">
              身份选择
            </div>
            <div class="aui-list-item-input">
              <div class="aui-text-right" @click="selectrole">
                <input type="text" class="aui-text-right" style="color: #B3B3B3" maxlength="15" placeholder="未选择"
                       v-model="role">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </form>
    <div class="aui-row-padded aui-padded-t-15"  style="width:80%">
            <span id="error_msg" class="aui-font-size-12 aui-margin-l-10 aui-text-danger">
            *理理健康将严格保护您的信息安全
            </span>
    </div>
    <div class="mainbtn-main" style="margin-top: 5rem" @click="updateuser" >确定</div>
  </div>
  <div v-if="selillflg">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBackToPage1" >
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">身份选择</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index" >
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <div class="aui-list-item-inner" style="margin-top:0.5rem">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item" v-show="docdispflg">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <input
                type="radio"
                id="doctor"
                value="doctor"
               v-model="myrole">
            </div>
            <div class="aui-list-item-input">
              医生
            </div>
          </div>
        </li>
        <li class="aui-list-item" v-show="nurdispflg" style="border:none">
          <div class="aui-list-item-inner">
            <div class="aui-list-item-label-icon">
              <input
                type="radio"
                id="nurse"
                value="nurse"
               v-model="myrole">
            </div>
            <div class="aui-list-item-input">
              护士
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mainbtn-main" @click="roleUpdate" style="margin-top: 2rem">确定</div>
  </div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  const back_delete_ill = false;
  import {MessageBox} from 'mint-ui';
  import Select from '../../../../components/page/select.vue'
  export default {
    components: {
      'utilselect':Select,
    },
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    data() {
      return{
        info : null,                      //医生用户信息
        gender_val : null,                //性别下拉列表数组常量
        xueli_val : null,                 //学历下拉列表数组常量
        showPage_flag : false,
        realname : '',
        nick_name : '',
        xueli : '',
        phonenum : '',
        birthday : '',
        gender : '',
        role : '',
        ID_number: '',  
        genderutil : 'gender_val',
        xueliutil : 'doctor_xueli_val ',
        infoflg : true,
        selillflg : false,
        docdispflg : true,
        nurdispflg : true,
        myrole : '',
      }
    },
    mounted() {
      self.init();    //初始化
    },
    methods: {
      init : function () {
        //页面信息赋值
        var doc_id = localStorage.getItem("doc_id");
        this.api.doc_getByIdWithToken({user_id : doc_id, level : 4}).then((res)=>{
          this.common.consoledebug.log(JSON.stringify(res.data.ret))
          self.info = res.data.ret;
          self.realname = self.info.real_name;
          self.nick_name = self.info.nick_name;
          self.xueli = self.info.xueli;
          self.phonenum = self.info.phonenum;
          self.birthday = self.info.birthday;
          self.gender = self.info.gender;
          self.role = self.info.role_str;
          self.roleid = self.info.role;
          self.ID_number = self.info.ID_number;
          self.showPage_flag = true;
        }).catch((err)=>{

        });
      },
      //校验输入的出生日期
      checkbirthday : function () {
        //获取当前时间（年-月-日）
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        if(self.birthday > currentdate){
          MessageBox('提示', '出生日期不能晚于今天，请重试');
          return false;
        }else if (self.birthday < "1900-01-01"){
          MessageBox('提示', '出生日期不符合人类生存规律，请重试');
          return false;
        }
      },
      updateuser : function () {
        if(self.checkbirthday() == false)
        {
          return false;
        }
        if(self.ID_number == null || self.ID_number == ''){
          MessageBox('错误', '请填写身份证号')
        }
        if(self.realname == '' || self.realname == null){
          MessageBox('提示', '请填写真实姓名');
          return false;
        }
        if(self.nick_name == '' || self.nick_name == null){
          MessageBox('提示', '请填写昵称');
          return false;
        }
        if(self.xueli == '' || self.xueli == null){
          MessageBox('提示', '请选择学历');
          return false;
        }
        if(self.gender == '' || self.gender == null){
          MessageBox('提示', '请选择性别');
          return false;
        }
        if(self.realname.length < 2){
          MessageBox('提示', '姓名不能少于两个字');
          return false;
        }
        var token = localStorage.getItem("token");
        var doc_id = localStorage.getItem("doc_id");
        var realname = self.realname;
        var nickname = self.nick_name;
        var xueli = self.xueli;
        var birthday = self.birthday;
        var gender = self.gender;
        var param = {
          "user_id" : doc_id,
          "token" : token,
          "real_name" : realname,
          "nick_name" : nickname,
          "xueli" : xueli,
          "birthday" : birthday,
          "gender" : gender,
          "ID_number" : self.ID_number,
          "role" : self.roleid
        }
        //更新
        self.api.doc_updateById(param).then((res)=>{
          //self.common.consoledebug.log("res:" + JSON.stringify(res));
          if(res.data.ret){
            localStorage.setItem("doctor", JSON.stringify(res.data.ret))
            MessageBox('提示', '修改信息成功！');
            self.common.jumpToPage({router: self.$router, url : "../index"});
          }else{
            MessageBox('提示', JSON.stringify(res.data.message).replace(/"/g,""));
            return false;
          }
        }).catch((err)=>{
          self.common.consoledebug.log("err:" + JSON.stringify(err));
        MessageBox('提示', '修改信息失败！');
        })
      },
      //跳转到身份选择页面
      selectrole : function(){
        self.infoflg = false;
        self.selillflg = true;
        //初始化页面
        var userid = localStorage.getItem("doc_id")
        this.api.doc_getRole({user_id : userid}).then((res)=>{
          //this.common.consoledebug.log("role" + JSON.stringify(res.data.ret))
          self.initselectrole(res.data.ret);
        }).catch((err)=>{

        })
        //self.common.jumpToPage({router: self.$router, url : "../homepage/selectrole"})
      },
      initselectrole : function(obj){
      //判断是否显示认证
      if(obj.doctor == null){
        self.docdispflg = false;
      }
      if(obj.nurse == null){
        self.nurdispflg = false;
      }
      if(obj.doctor == 1){
        self.myrole = "doctor";
      }else if(obj.nurse == 1){
        self.myrole = "nurse";
      }
    },
    roleUpdate: function(){
      // var doctor = null;
      // var nurse = null;
      // var userid = localStorage.getItem("doc_id");
      // var token = localStorage.getItem("token");
      // //更新
      // this.api.doc_updateRole({user_id : userid, token : token, role : self.myrole}).then((res)=>{
      //   if(res.data.result == true)
      //   {
      //     MessageBox('提示', '身份选择成功！');
      //     self.common.jumpToPage({router: self.$router, url : "../homepage/myinfo"})
      //   }
      // }).catch((err)=>{
      //   self.common.consoledebug.log("err : ")
      // })
      self.roleid = self.myrole;
      if( self.roleid == 'doctor'){
        self.role = '医生'
      }else if(self.roleid == 'nurse'){
        self.role = '护士'
      }
      self.selillflg = false;
      self.infoflg = true;
    } ,
      clickBack : function () {
        self.common.clickBack();
      },
      clickBackToPage1 : function(){
        self.infoflg = true;
        self.selillflg = false;
      },
      genderChange : function (data) {
        //self.common.consoledebug.log("你将下拉框修改为：" + data.value);
        self.gender = data.value;
      },
      xueliChange : function (data) {
       //self.common.consoledebug.log("你将下拉框修改为：" + data.value);
        self.xueli = data.value;
      }
    },
  }
</script>
<style scoped>

</style>
