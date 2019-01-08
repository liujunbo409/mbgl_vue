//公共js方法，适用于vue框架，应该在main.js中引入
/*
 * By TerrQi
 *
 * 沈阳艺萨艺术发展有限公司
 *
 * 2018-10-21
 *
 */

//标识位
const DEBUG = true;    //是否为调试状态，主要关联日志输出

//debug相关
/*
 * 请注意，前端不要使用console.log方法，而改为consoledebug.log，通过DEBUG进行前端log的输出控制
 *
 */
export const consoledebug = (DEBUG) ? console : new nodebug()

function nodebug() {
}

nodebug.prototype.log = function (str) {
}
nodebug.prototype.warn = function (str) {
}


//公共方法相关//////////////////////////////////////////////////////////////
export const showObject = (obj) => {
  var des = "";
  for (var name in obj) {
    des += name + ":" + obj[name] + ";";
  }
  return des;
}


//对象是否在数组中
/*
 * 传入对象的id，数组是json数组，其中id是对应的id
 *
 * By TerryQi
 *
 */
export const isDomInArr = (id, arr) => {
  for (var i = 0; i < arr.length; i++) {
    consoledebug.log("isDomInArr id:" + id + " arr_id:" + arr[i].id)
    if (id == arr[i].id) {
      return true;
    }
  }
  return false;
}

//判断是否为空
/*
 * 其中val的值为null、""和undefined都算为空
 *
 */
export const judgeIsNullStr = (val) => {
  if (val == null || val == "" || val == undefined || val == "未设置") {
    return true
  }
  return false
}

//内部跳转相关//////////////////////////////////////////////////////////////

//点击返回
export const clickBack = params => {
  window.history.go(-1);
}
//跳转到指定页面奥
export const jumpToPage = params => {
  params.router.push({path: params.url, query: {}})
}

//注册&忘记密码页面
export const goToRegister = params => {
  params.router.push({path: "../doctor/register", query: {type : params.type}})
}
//选择医院,科室之后跳转到资格认证首页
export const goToApplyindex = params => {
  params.router.push({path: "../doctorapply", query: {hospitalname : params.hospitalname, hospital : params.hospital, departmentid : params.departmentid, departmentname : params.departmentname}})
}
//选择科室之后将id代入选择疾病页面
export const goToSelectIll = params => {
  params.router.push({path: "../homepage/apply/selectill", query: { departmentid : params.departmentid}})
}
//选择疾病后返回医生资格申请
export const goToDoctorApply = params => {
  params.router.push({path: "../doctorapply", query: {ill_ids : params.ill_ids, ill_names : params.ill_names}})
}
//选择文章之后查看文章详情页
export const goToArticleDetail = params => {
  params.router.push({path: "../doctor/articledetail", query: {articleid : params.articleid, muluid : params.muluid, illid : params.illid}})
}
//选择文章之后查看文章问题
export const goToArticleQuestion = params => {
  params.router.push({path: "../doctor/articlequestion", query: {articleid : params.articleid}})
}
//选择文章之后进行文章反馈
export const goToArticleFeedBack = params => {
  params.router.push({path: "../doctor/articlefeedback", query: {articleid : params.articleid}})
}
//收藏文章模块选择文章之后查看文章详情页
export const goToArticleDetailWithCollected = params => {
  params.router.push({path: "../doctor/collectarticledetail", query: {articleid : params.articleid, illid : params.illid}})
}
//收藏文章模块选择文章之后查看文章问题
export const goToArticleQuestionWithCollected = params => {
  params.router.push({path: "../doctor/collectarticlequestion", query: {articleid : params.articleid}})
}
//选择文章之后进行文章反馈
export const goToArticleFeedBackWithCollected = params => {
  params.router.push({path: "../doctor/collectarticlefeedback", query: {articleid : params.articleid}})
}

//跳转到指定页面，参数为articleid,type
export const jumpToPageWithArticleid = params => {
  params.router.push({path: params.url, query: {articleid : params.articleid, type: params.type, shenheid : params.shenheid}})
}
//跳转到问答题库审核详情，参数为question_id,shenhe_id,来源from
export const jumpToQaInfo = params => {
  params.router.push({path: params.url, query: {question_id : params.question_id, shenhe_id: params.shenhe_id, from : params.from}})
}
export default{
  //公共方法///////////////////////////////////////////////////////////////
  consoledebug,
  showObject,
  isDomInArr,
  //页面跳转
  clickBack,
  jumpToPage,
  goToRegister,
  goToApplyindex,
  //goToSelectDepartment,
  goToSelectIll,
  goToDoctorApply,
  goToArticleDetail,
  goToArticleQuestion,
  goToArticleDetailWithCollected,
  goToArticleQuestionWithCollected,
  goToArticleFeedBack,
  goToArticleFeedBackWithCollected,
  jumpToPageWithArticleid,
  jumpToQaInfo,
};


