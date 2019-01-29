// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTouch from 'vue-touch'
// 引入公共的css样式
import '../static/css/aui.css'
import '../static/css/aui-flex.css'
import '../static/css/common.css'
import '../static/css/standard.css'
import '../static/css/iconfont.css'
//引入公共js
import common from './assets/js/common'
//页面调用接口方法
// import axios from 'axios'
// import qs from 'qs'

Vue.prototype.common = common   //common公共方法
import api from './assets/js/api'

Vue.prototype.api = api     //api公共方法

Vue.prototype.$DEBUG_FLAG = process.env.DEBUG_FLAG      //全局变量
// mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//element ui
import ElementUI from 'element-ui'

import '../node_modules/element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
//图片验证码
import SIdentify from './components/page/identify.vue'
import Select from './components/page/select.vue'

Vue.use(MintUI)

Vue.use(VueTouch, {name: 'v-touch'})

VueTouch.config.swipe = {
// 手指左右滑动距离
  threshold: 100
}

Vue.use(SIdentify)
Vue.use(Select)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
import {MessageBox} from 'mint-ui'
//路由拦截
router.beforeEach((to, from, next) => {
  //let docid = localStorage.getItem("doc_id");
  //let token = localStorage.getItem("token");
  // api.doc_getHospitalList().then((res)=>{
  //   console.log("ret"  + JSON.stringify(res.data.ret));
  // }).catch((err)=>{
  // })
  // localStorage.clear();
  //localStorage.setItem("fwh_openid",'oCbCtt55Qxofc-aPMtGYmi8CadFY');
  if (to.name !== 'login') {
  //     let doc_id = localStorage.getItem("doc_id");
  //   if(doc_id == null && token==null && role==null){
  //     api.doc_checkLogin({fwh_openid : localStorage.getItem("fwh_openid")}).then((res)=>{
  //       if (res.data.result == true){
  //         console.log("ret:" + JSON.stringify(res.data.ret));
  //         localStorage.setItem("doctor", JSON.stringify(res.data.ret));
  //         localStorage.setItem("token", res.data.ret.token);
  //         localStorage.setItem("doc_id", res.data.ret.id);
  //         localStorage.setItem("role", res.data.ret.role);
  //       }else{
  //         router.push({name: 'login'});
  //       }
  //   }).catch((err)=>{

  //   })
  // }
  //是否被停用
  api.doc_getUserStatus({user_id : localStorage.getItem("doc_id")}).then((res)=>{
    if(res.data.result == false){
      MessageBox('提示', '您已被停用！请联系管理员！');
      router.push({name: 'login'});
    }
  }).catch((err)=>{

  })
  //是否被驳回
  api.doc_userInform({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role")}).then((res)=>{
    if(res.data.result == true){
      MessageBox('提示', '请完成医生审核！');
      router.push({name: 'doctorapply'});
    }else{
      if(to.name != 'homepage' && to.name !='myrole' && to.name != 'myinfo' && to.name != 'management' && to.name != 'revisephonenum' && to.name != 'revisepassword'
      && to.name !='userfeedback' && to.name !='index' && to.name !='selectrole' && to.name !='doctorapply'  && to.name !='nurseapply'
      )
      {
        // var role = localStorage.getItem("role");
        // if(role == 'doctor' && to.name == 'nurseapply'){
        //   MessageBox('提示', '您现在没有进入该模块的权限，将前往首页');
        //   router.push({name: 'index'});
        // }else if (role == 'nurse' && to.name == 'doctorapply'){
        //   MessageBox('提示', '您现在没有进入该模块的权限，将前往首页');
        //   router.push({name: 'index'});
        // }
      //是否有查看权限
      api.doc_userAccess({user_id : localStorage.getItem("doc_id"), role : localStorage.getItem("role")}).then((res)=>{
        if(res.data.result == false){
          //alert('您现在没有进入该模块的权限，将前往首页');
          MessageBox('提示', '您现在没有进入该模块的权限，将前往首页');
          // this.$message({
          //   message: '您现在没有进入该模块的权限，将前往首页',
          //   type: 'warning'
          // });
          router.push({name: 'index'});
        }
      }).catch((err)=>{})
      }
    }
  }).catch((err)=>{

  })
  }
  next()
 
})