//页面调用接口方法
import axios from 'axios'
import qs from 'qs'

import {Indicator, Toast} from 'mint-ui';
import {consoledebug} from "./common";

//业务名
const BUSI_NAME = "mbgl";   //慢病管理

//调试标志符
const DEBUG_FLAG = true;

let base = DEBUG_FLAG ? 'http://de.lljiankang.top/' : 'http://de.lljiankang.top/'; //基础接口

// axios 配置
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = base

//request拦截器
axios.interceptors.request.use((config) => {
  consoledebug.log("axios.interceptors.request config:" + JSON.stringify(config));   //调试用
  //统一配置user_id和token
  if (config.method == "get") {

  }
  if (config.method == "post") {
    // if (!config.data.hasOwnProperty('user_id') && config.url != 'api/doctor/login/login' && config.url != 'doctor/login/forgetPWD') {
    //   if (window.localStorage.getItem("user_id") && !judgeIsNullStr(window.localStorage.getItem("user_id"))) {   //如果存在user_id
    //     config.data.user_id = window.localStorage.getItem("user_id");
    //   }
    //   if (window.localStorage.getItem("token") && !judgeIsNullStr(window.localStorage.getItem("token"))) {   //如果存在token
    //     config.data.token = window.localStorage.getItem("token");
    //   }
    // }
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  // consoledebug.log("axios.interceptors.request err:" + JSON.stringify(error));
  return Promise.reject(error);
});

//response拦截器
axios.interceptors.response.use((res) => {
  // consoledebug.log("res:" + JSON.stringify(res));    //调试用
  Indicator.close();
  return res;
}, (error) => {
  //404等问题可以在这里处理
  Indicator.close();
  return Promise.reject(error);
});

/*
 * axios ajax请求
 *
 * @params 参数
 * @url 链接
 * @method 方法
 * @success_callback
 * @error_callback
 *
 */
function axios_ajax(url, params, method, loadding_flag) {

  //请注意，配置param，包括放入user_id和token，应该在request拦截器中实现
  consoledebug.log("axios_ajax method:" + method + " url:" + url + "  params:" + JSON.stringify(params));
  //加载图标
  if (loadding_flag) {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  }

  //GET方式
  if (method.toUpperCase() == "GET") {
    return axios({
      url: url,
      method: 'get',
      params: params
    })
  }

  //POST方式
  if (method.toUpperCase() == "POST") {
    return axios({
      url: url,
      method: 'post',
      data: params
    })
  }

}


//以下为接口调用的封装/////////////////////////////////////////////////////////////

//数组常量
export const user_getUtils = params => {
  return axios_ajax('api/common/utils', params, 'GET', false);
}

//获取用户角色选择状态（列表形式）
export const doc_getRole = params => {
  return axios_ajax('api/doctor/my/roleSelect', params, 'GET', false);
}

//获取用户角色审核状态
export const doc_getshenheStatus = params => {
  return axios_ajax('api/doctor/apply/shenheStatus', params, 'GET', false);
}

//用户角色选择状态更新
export const doc_updateRole = params => {
  return axios_ajax('api/doctor/my/roleSelectUpdate', params, 'POST', false);
}

//获取七牛uploadtoken
export const getUploadtoken = params => {
  return axios_ajax('api/common/uploadToken', params, 'GET', false);
}

//免登陆
export const doc_checkLogin = params => {
  return axios_ajax('api/doctor/login/getDoctorByOpenId', params, 'GET', true);
}

//医生登录
export const doc_doLogin = params => {
  return axios_ajax('api/doctor/login/login', params, 'POST', true);
}

//患者注册
export const doc_doRegister = params => {
  return axios_ajax('api/doctor/login/register', params, 'POST', true);
}

//获取用户信息(带token)
export const doc_getByIdWithToken = params => {
  return axios_ajax('api/doctor/my/getByIdWithToken', params, 'GET', false);
}

//更新用户信息
export const doc_updateById = params => {
  return axios_ajax('api/doctor/my/updateById', params, 'POST', false);
}

//验证用户密码
export const doc_validatePassword = params => {
  return axios_ajax('api/doctor/my/validatePassword', params, 'POST', false);
}
//修改用户密码
export const doc_revisePassword = params => {
  return axios_ajax('api/doctor/my/revisePassword', params, 'POST', false);
}

//向用户新手机号发送短信
export const doc_validateNewPhonenum = params => {
  return axios_ajax('api/doctor/login/validateNewPhonenum', params, 'GET', false);
}

//向用户旧手机号发送短信
export const doc_validateOldPhonenum = params => {
  return axios_ajax('api/doctor/login/validateOldPhonenum', params, 'GET', false);
}

//修改用户手机号
export const doc_revisePhonenum = params => {
  return axios_ajax('api/doctor/my/revisePhonenum', params, 'POST', false);
}

//忘记密码
export const doc_forgetPWD = params => {
  return axios_ajax('api/doctor/login/forgetPWD', params, 'POST', false);
}

//获取医院列表
export const doc_getHospitalList = params => {
  return axios_ajax('api/doctor/apply/hospitalList', params, 'GET', false);
}

//获取科室列表
export const doc_getDepartmentList = params => {
  return axios_ajax('api/doctor/apply/departmentList', params, 'GET', false);
}

//获取基础疾病列表（apply）
export const doc_getbaseillList = params => {
  return axios_ajax('api/doctor/apply/baseIllList', params, 'GET', false);
}

//出诊时间首页
export const doc_getvisitTime = params => {
  return axios_ajax('api/doctor/czsj/index', params, 'GET', false);
}

//提交出诊时间
export const doc_editvisitTime = params => {
  return axios_ajax('api/doctor/czsj/edit', params, 'POST', false);
}

//删除出诊时间
export const doc_delvisitTime = params => {
  return axios_ajax('api/doctor/czsj/del', params, 'POST', false);
}

//获取科室下疾病列表
export const doc_getDepartmentIllList = params => {
  return axios_ajax('api/doctor/apply/departmentIllList', params, 'GET', false);
}

//医生资格认证首页
export const doc_docapplyIndex = params => {
  return axios_ajax('api/doctor/apply/doctorApply', params, 'GET', false);
}

//医生资格认证申请
export const doc_docApply = params => {
  return axios_ajax('api/doctor/apply/doctorApplyPost', params, 'POST', false);
}

//护士资格认证首页
export const doc_nurapplyIndex = params => {
  return axios_ajax('api/doctor/apply/nurseApply', params, 'GET', false);
}

//护士资格认证申请
export const doc_nurApply = params => {
  return axios_ajax('api/doctor/apply/nurseApplyPost', params, 'POST', false);
}

//获取基础疾病列表
export const doc_getIlllist = params => {
  return axios_ajax('api/common/baseIllList', params, 'GET', false);
}

//获取目录列表
export const doc_getCataloglist = params => {
  return axios_ajax('api/doctor/article/mulu', params, 'GET', false);
}

//获取目录下文章列表
export const doc_getArticlelist = params => {
  return axios_ajax('api/doctor/article/articleList', params, 'GET', false);
}

//获取文章详情
export const doc_getArticleDetail = params => {
  return axios_ajax('api/doctor/article/article', params, 'GET', false);
}

//获取文章来源
export const doc_getArticleSource = params => {
  return axios_ajax('api/doctor/article/source', params, 'GET', false);
}

//获取收藏文章状态
export const doc_getCollectStatus = params => {
  return axios_ajax('api/doctor/article/collect', params, 'GET', false);
}

//获取文章关联
export const doc_getArticleNexus = params => {
  return axios_ajax('api/doctor/article/nexus', params, 'GET', false);
}

//判断是否有认可资格
export const doc_getAcceptTitle = params => {
  return axios_ajax('api/doctor/article/acceptTitle', params, 'GET', false);
}

//文章认可状态
export const doc_getAcceptStatus = params => {
  return axios_ajax('api/doctor/article/accept', params, 'GET', false);
}

//修改收藏文章状态
export const doc_doCollectChange = params => {
  return axios_ajax('api/doctor/article/collectPost', params, 'POST', false);
}

//修改文章认可状态
export const doc_doAcceptChange = params => {
  return axios_ajax('api/doctor/article/acceptPost', params, 'POST', false);
}

//文章下问题
export const doc_getArticleQuestion = params => {
  return axios_ajax('api/doctor/article/question', params, 'GET', false);
}

//文章反馈
export const doc_doArticleFeedBack = params => {
  return axios_ajax('api/doctor/article/articleFeedback', params, 'POST', false);
}

//目录下收藏文章列表
export const doc_getCollectList = params => {
  return axios_ajax('api/doctor/article/collectList', params, 'GET', false);
}

//目录下认可文章列表
export const doc_getAcceptList = params => {
  return axios_ajax('api/doctor/article/acceptList', params, 'GET', false);
}

//待审核文章列表
export const doc_getArticleWaitList = params => {
  return axios_ajax('api/doctor/article/shenhe/waitList', params, 'GET', false);
}

//已审核文章列表
export const doc_getArticleReadyList = params => {
  return axios_ajax('api/doctor/article/shenhe/already', params, 'GET', false);
}

//审核文章详情
export const doc_getSHArticle = params => {
  return axios_ajax('api/doctor/article/shenhe/article', params, 'GET', false);
}

//审核文章
export const doc_shenheArticle = params => {
  return axios_ajax('api/doctor/article/shenhe/shenhe', params, 'POST', false);
}

//用户反馈
export const doc_userFeedBack = params => {
  return axios_ajax('api/doctor/my/feedback', params, 'POST', false);
}

//判断是否有进入其他模块权限
export const doc_userAccess = params => {
  return axios_ajax('api/doctor/my/access', params, 'GET', false);
}

//判断是否有驳回通知
export const doc_userInform = params => {
  return axios_ajax('api/doctor/my/inform', params, 'GET', false);
}

/*
 *
 * 创建Toast
 *
 * @message:提示信息
 * @iconClass:图标类名
 * @duration:时间（毫秒）
 * @className:样式类名
 */
function createToast(message, iconClass, duration, className) {
  Toast({
    message: message,
    iconClass: iconClass,
    duration: duration,
    className : className,
    position : 'middle'
  });
}

//进行方法输出
export default{
  axios_ajax,   //基础axios方法封装
  createToast,   //创建Toast
  user_getUtils,
  getUploadtoken,
  doc_doLogin,
  doc_doRegister,
  doc_getByIdWithToken,
  doc_updateById,
  doc_validatePassword,
  doc_revisePassword,
  doc_validateNewPhonenum,
  doc_validateOldPhonenum,
  doc_revisePhonenum,
  doc_forgetPWD,
  doc_getRole,
  doc_updateRole,
  doc_getshenheStatus,
  doc_getHospitalList,
  doc_getbaseillList,
  doc_getvisitTime,
  doc_editvisitTime,
  doc_delvisitTime,
  doc_docapplyIndex,
  doc_getDepartmentList,
  doc_getDepartmentIllList,
  doc_docApply,
  doc_nurapplyIndex,
  doc_nurApply,
  doc_getIlllist,
  doc_getCataloglist,
  doc_getArticlelist,
  doc_getArticleDetail,
  doc_getArticleSource,
  doc_getCollectStatus,
  doc_getAcceptTitle,
  doc_getAcceptStatus,
  doc_doCollectChange,
  doc_doAcceptChange,
  doc_getArticleQuestion,
  doc_getCollectList,
  doc_getAcceptList,
  doc_getArticleNexus,
  doc_doArticleFeedBack,
  doc_getArticleWaitList,
  doc_getArticleReadyList,
  doc_getSHArticle,
  doc_shenheArticle,
  doc_checkLogin,
  doc_userFeedBack,
  doc_userAccess,
  doc_userInform,
}



