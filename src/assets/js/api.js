//页面调用接口方法
import axios from 'axios'
import qs from 'qs'

import {Indicator, Toast} from 'mint-ui';
import {consoledebug} from "./common";

//业务名
const BUSI_NAME = "mbgl";   //慢病管理

//调试标志符
const DEBUG_FLAG = true;

let base = DEBUG_FLAG ? 'http://cs.yishubang.org/' : 'http://art.yishubang.org/'; //基础接口

// axios 配置
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = base

//request拦截器
axios.interceptors.request.use((config) => {
  consoledebug.log("axios.interceptors.request config:" + JSON.stringify(config));   //调试用
  //统一配置busi_name、user_id和token
  if (config.method == "get") {
    //判断是否包含busi_name属性，如果包含该属性，则不再重新赋值
    if (!config.params.hasOwnProperty('busi_name')) {
      config.params.busi_name = BUSI_NAME;
    }
  }
  if (config.method == "post") {
    //判断是否包含busi_name属性，如果包含该属性，则不再重新赋值
    if (!config.params.hasOwnProperty('busi_name')) {
      config.data.busi_name = BUSI_NAME;
    }
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

//获取轮播图列表
// export const ad_getListByCon = params => {
//   return axios_ajax('api/shop/ad/getListByCon', params, 'GET', false);
// }

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
export {
  axios_ajax,   //基础axios方法封装
  createToast   //创建Toast
}


