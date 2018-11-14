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
    // consoledebug.log("isDomInArr id:" + id + " arr_id:" + arr[i].id)
    if (id == arr[i].id) {
      return true;
    }
  }
  return false;
}

//内部跳转相关//////////////////////////////////////////////////////////////

//路由到主页
export const jumpToIndex = params => {
  params.router.push({path: "/index", query: {}})
}

export {};


