<template>
  <div v-if="showflg">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">出诊时间</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <table class="table">
        <tr>
            <th style="width: 25%">时间段</th>
            <th style="width: 25%">上午</th>
            <th style="width: 25%">下午</th>
            <th style="width: 25%">夜间</th>
        </tr>
        <tr>
          <td>周一</td>
          <td v-for="(item,key) of info[0]" @click="edit(item, 0, key)">
              <div v-show="item.time_from != null">
                  <span class="time_from">{{item.time_from}}</span>&nbsp; - &nbsp;
                  <span class="time_to">{{item.time_to}}</span>
              </div>
              <div class="aui-padded-t-5">
                  {{item.address}}
              </div>
          </td>
        </tr>
        <tr>
          <td>周二</td>
          <td v-for="(item,key) of info[1]" @click="edit(item, 1, key)">
              <div v-show="item.time_from != null">
                  <span class="time_from">{{item.time_from}}</span>&nbsp; - &nbsp;
                  <span class="time_to">{{item.time_to}}</span>
              </div>
              <div class="aui-padded-t-5">
                  {{item.address}}
              </div>
          </td>
        </tr>
        <tr>
          <td>周三</td>
          <td v-for="(item,key) of info[2]" @click="edit(item, 2, key)">
              <div v-show="item.time_from != null">
                  <span class="time_from">{{item.time_from}}</span>&nbsp; - &nbsp;
                  <span class="time_to">{{item.time_to}}</span>
              </div>
              <div class="aui-padded-t-5">
                  {{item.address}}
              </div>
          </td>
        </tr>
        <tr>
          <td>周四</td>
          <td v-for="(item,key) of info[3]" @click="edit(item, 3, key)">
              <div v-show="item.time_from != null">
                  <span class="time_from">{{item.time_from}}</span>&nbsp; - &nbsp;
                  <span class="time_to">{{item.time_to}}</span>
              </div>
              <div class="aui-padded-t-5">
                  {{item.address}}
              </div>
          </td>
        </tr>
        <tr>
          <td>周五</td>
          <td v-for="(item,key) of info[4]" @click="edit(item, 4, key)">
              <div v-show="item.time_from != null">
                  <span class="time_from">{{item.time_from}}</span>&nbsp; - &nbsp;
                  <span class="time_to">{{item.time_to}}</span>
              </div>
              <div class="aui-padded-t-5">
                  {{item.address}}
              </div>
          </td>
        </tr>
        <tr>
          <td>周六</td>
          <td v-for="(item,key) of info[5]"  @click="edit(item, 5, key)">
              <div v-show="item.time_from != null">
                  <span class="time_from">{{item.time_from}}</span>&nbsp; - &nbsp;
                  <span class="time_to">{{item.time_to}}</span>
              </div>
              <div class="aui-padded-t-5">
                  {{item.address}}
              </div>
          </td>
        </tr>
        <tr>
          <td>周日</td>
          <td v-for="(item,key) of info[6]" @click="edit(item, 6, key)">
              <div v-show="item.time_from != null">
                  <span class="time_from">{{item.time_from}}</span>&nbsp; - &nbsp;
                  <span class="time_to">{{item.time_to}}</span>
              </div>
              <div class="aui-padded-t-5">
                  {{item.address}}
              </div>
          </td>
        </tr>
    </table>
    <div class="aui-content aui-margin-b-15">
        <form method="post" onsubmit="">
            <ul class="aui-list aui-form-list">
                <li class="aui-list-header" style="background-color: #03a9f4;color: white">编辑出诊时间</li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label aui-font-size-14">
                            日期：
                        </div>
                        <div class="aui-list-item-input">
                            <input type="hidden" v-model="planid">
                            <select id="day" name="day" v-model="day">
                                <option value="0">周一</option>
                                <option value="1">周二</option>
                                <option value="2">周三</option>
                                <option value="3">周四</option>
                                <option value="4">周五</option>
                                <option value="5">周六</option>
                                <option value="6">周日</option>
                            </select>
                        </div>
                    </div>
                </li>

                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label aui-font-size-14">
                            时间段：
                        </div>
                        <div class="aui-list-item-input">
                            <select id="shijianduan" name="shijianduan" v-model="timeslot">
                                <option value="0">上午</option>
                                <option value="1">下午</option>
                                <option value="2">夜间</option>
                            </select>
                        </div>
                    </div>
                </li>
                <!-- <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label aui-font-size-14">
                            开始时间：
                        </div>
                        <div class="aui-list-item-input">
                            <input id="time_from" type="time" name="time_from" v-model="timefrom">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label aui-font-size-14">
                            结束时间：
                        </div>
                        <div class="aui-list-item-input">
                            <input id="time_to" type="time" name="time_to" v-model="timeto">
                        </div>
                    </div>
                </li> -->
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label aui-font-size-14">
                            开始时间：
                        </div>
                        <div class="aui-list-item-input">
                           <el-time-picker
                           :editable = "false"
                            value-format="HH:mm"
                            v-model="timefrom"
                            placeholder="请选择开始时间">
                        </el-time-picker>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label aui-font-size-14">
                            结束时间：
                        </div>
                        <div class="aui-list-item-input">
                           <el-time-picker
                           :editable = "false"
                            value-format="HH:mm"
                            v-model="timeto"
                            placeholder="请选择结束时间">
                        </el-time-picker>
                        </div>
                    </div>
                </li>
                <li class="aui-list-item" style="border:none">
                    <div class="aui-list-item-inner">
                        <div class="aui-list-item-label aui-font-size-14">
                            地点：
                        </div>
                        <div class="aui-list-item-input">
                            <input id="address" type="text" name="address" v-model="address">
                        </div>
                    </div>
                </li>
                <li class="aui-list-item">
                    <div class="aui-list-item-inner aui-list-item-center aui-list-item-btn">
                        <div style="width: 100%;display: flex">
                        <div id="addplan" class="aui-btn aui-btn-info aui-btn-block"
                             style="border-radius: 50px;width:40%;margin: auto;" @click="doSave">保存
                        </div>
                        <div id="delplan" class="aui-btn aui-btn-danger aui-btn-block "
                             style="border-radius: 50px;width:40%;margin: auto;" @click="doDelete" v-if="delbtnflg">删除
                        </div>
                        </div>
                    </div>
                </li>
            </ul>
        </form>
    </div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  import { MessageBox  } from 'mint-ui';
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
        info : null,
        timeslot : '',               //时间段
        timefrom : '',               //开始时间
        timeto : '',                 //结束时间
        address : '',                //地址
        day :'',                     //选择的是周几
        delbtnflg : false,           //删除按钮显示标志
        planid : '',                 //出诊计划id
        showflg : false,             //页面显示标志
      }
    },
    methods :{
        init : function(){
            //清空信息
            self.timeslot = '';
            self.timefrom = '';
            self.timeto = '';
            self.day = '';
            self.address = '';
            self.planid = '';
            self.delbtnflg = false;
            //获取一周出诊信息
            var doc_id = localStorage.getItem("doc_id");
            self.api.doc_getvisitTime({user_id : doc_id}).then((res)=>{
                //self.common.consoledebug.log("res:" + JSON.stringify(res.data.ret));
                for(var i = 0;i < res.data.ret.length;i++){
                    for(var j = 0 ;j < res.data.ret[i].length;j++){
                        if(res.data.ret[i][j] == null){
                            res.data.ret[i][j] = [{"time_from" : "","time_to" : "", "address" : ""}]
                        }else{
                            res.data.ret[i][j].time_from = JSON.stringify(res.data.ret[i][j].time_from).substring(1, 6);
                            res.data.ret[i][j].time_to = JSON.stringify(res.data.ret[i][j].time_to).substring(1, 6);
                        }
                    }
                }
                self.info = res.data.ret;
                self.showflg = true;
            }).catch((err)=>{

            })
        },
        edit : function(data, dayOfweek, timeSlot){
            //页面下方信息赋值
            self.planid = data.id;
            self.delbtnflg = false;
            self.day = dayOfweek;
            self.timeslot = timeSlot;
            self.timefrom = data.time_from;
            self.timeto = data.time_to;
            self.address = data.address;
            if(data.time_to != null){
                self.delbtnflg = true;
            }
            window.scrollTo(0, document.body.scrollHeight);
        },
        doCheck : function(){
            if(self.timefrom == null || self.timefrom =="")
            {
                 MessageBox('提示', "请填写开始时间!");
                 return false;
            }
            if(self.timeto == null || self.timeto =="")
            {
                 MessageBox('提示', "请填写结束时间!");
                 return false;
            }
            if(self.timefrom > self.timeto)
            {
                MessageBox('提示', "开始时间不能晚于结束时间!");
                 return false;
            }
            if(self.timeslot == "0"){
                //上午
                if(self.timefrom > '12:00:00'){
                    MessageBox('提示', "您所填写的时间段并不在上午");
                    return false;
                }
                if( self.timeto< '06:00:00'){
                    MessageBox('提示', "您所填写的时间段并不在上午");
                    return false;
                }
                }else if (self.timeslot == "1"){
                //下午
                if(self.timefrom > '18:00:00'){
                    MessageBox('提示', "您所填写的时间段并不在下午");
                    return false;
                }
                if( self.timeto< '12:00:00'){
                    MessageBox('提示', "您所填写的时间段并不在下午");
                    return false;
                }
            }else{
                //晚上
                if(self.timefrom >  '23:00:00'){
                    MessageBox('提示', "您所填写的时间段并不在晚上");
                    return false;
                    }
                    if(self.timeto< '18:00:00'){
                    MessageBox('提示', "您所填写的时间段并不在晚上");
                    return false;
                    }
            }
            if(self.address == "" || self.address == null){
                MessageBox('提示', "请填写出诊地址");
                return false;
            }
        },
        doSave : function(){
            //校验
            if(self.doCheck() == false)
            {
                return false;
            }
            //定义参数
            let params = {
                user_id : localStorage.getItem("doc_id"),
                token : localStorage.getItem("token"),
                shijianduan : self.timeslot,
                day : self.day,
                time_from : self.timefrom,
                time_to : self.timeto,
                address : self.address
            }
            //self.common.consoledebug.log(params);
            self.api.doc_editvisitTime(params).then((res)=>{
                //self.common.consoledebug.log("res" + JSON.stringify(res.data.ret));
                MessageBox({
                        message: "保存成功",
                        duration: 2000,
                        position : 'middle'
                    });
                //初始化
                self.init();
            }).catch((err)=>{

            })
        },
        doDelete : function(){
            self.api.doc_delvisitTime({id : self.planid,user_id : localStorage.getItem("doc_id"),
                token : localStorage.getItem("token"),}).then((res)=>{
                //self.common.consoledebug.log("res" + JSON.stringify(res.data.ret));
                MessageBox({
                        message: "删除成功",
                        duration: 2000,
                        position : 'middle'
                    });
                //初始化
                self.init();
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
    div input[type="text"] {
        font-size: 13px;
        color: #b3b3b3;
    }

    div input[type="time"] {
        font-size: 13px;
        padding-top: 14px;
        color: #b3b3b3;

    }

    div select {
        font-size: 13px;
        text-align: center;
        color: #b3b3b3;
    }

    .table {
        border-collapse: collapse;
        border-spacing: 0;
        margin-right: auto;
        margin-left: auto;
        width: 100%;
    }

    th, td {
        border: 1px solid #b5d6e6;
        font-size: 12px;
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        height: 50px;
    }

    table tr th {
        background-color: white;
        text-align: center;
    }

    .table tr td {
        background-color: white;
        text-align: center;
    }

</style>
