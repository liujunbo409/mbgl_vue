import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let routers = [
  {
    path: '/',
    redirect: '/MBGL/doctor/index'
  },
  //登录页面
  {
    path: '/MBGL/doctor/login',
    name: 'login',
    component: resolve => require(['@/views/MBGL/doctor/login/login'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //注册&忘记密码页面
  {
    path: '/MBGL/doctor/register',
    name: 'register',
    component: resolve => require(['@/views/MBGL/doctor/login/register'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页面
  {
    path: '/MBGL/doctor/index',
    name: 'index',
    component: resolve => require(['@/views/MBGL/doctor/index/index'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //页面：我的
  {
    path: '/MBGL/doctor/homepage',
    name: 'homepage',
    component: resolve => require(['@/views/MBGL/doctor/homepage/index'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //我的信息页面
  {
    path: '/MBGL/doctor/homepage/myinfo',
    name: 'myinfo',
    component: resolve => require(['@/views/MBGL/doctor/homepage/myinfo'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //用户反馈页面
  {
    path: '/MBGL/doctor/homepage/userfeedback',
    name: 'userfeedback',
    component: resolve => require(['@/views/MBGL/doctor/homepage/userfeedback'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //账号管理页面
  {
    path: '/MBGL/doctor/homepage/management',
    name: 'management',
    component: resolve => require(['@/views/MBGL/doctor/homepage/management'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
   //更换手机号页面
   {
    path: '/MBGL/doctor/homepage/revisephonenum',
    name: 'revisephonenum',
    component: resolve => require(['@/views/MBGL/doctor/homepage/revisephonenum'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //修改密码页面
  {
    path: '/MBGL/doctor/homepage/revisepassword',
    name: 'revisepassword',
    component: resolve => require(['@/views/MBGL/doctor/homepage/revisepassword'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //选择身份页面
  {
    path: '/MBGL/doctor/homepage/selectrole',
    name: 'selectrole',
    component: resolve => require(['@/views/MBGL/doctor/homepage/selectrole'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //资格认证 => 我的身份页面
  {
    path: '/MBGL/doctor/homepage/myrole',
    name: 'myrole',
    component: resolve => require(['@/views/MBGL/doctor/homepage/myrole'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //资格认证 => 我的身份页面 => 医生资格认证
  {
    path: '/MBGL/doctor/homepage/doctorapply',
    name: 'doctorapply',
    component: resolve => require(['@/views/MBGL/doctor/homepage/apply/doctorapply'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //选择教学疾病
  {
    path: '/MBGL/doctor/homepage/apply/selectill',
    name: 'selectill',
    component: resolve => require(['@/views/MBGL/doctor/homepage/apply/selectill'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //选择医院
  {
    path: '/MBGL/doctor/homepage/apply/selecthospital',
    name: 'selecthospital',
    component: resolve => require(['@/views/MBGL/doctor/homepage/apply/selecthospital'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //自定义医院
  {
    path: '/MBGL/doctor/homepage/apply/customhospital',
    name: 'customhospital',
    component: resolve => require(['@/views/MBGL/doctor/homepage/apply/customhospital'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //选择医院科室
  {
    path: '/MBGL/doctor/homepage/apply/selectdepartment',
    name: 'selectdepartment',
    component: resolve => require(['@/views/MBGL/doctor/homepage/apply/selectdepartment'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //资格认证 => 我的身份页面 => 护士资格认证
  {
    path: '/MBGL/doctor/homepage/nurseapply',
    name: 'nurseapply',
    component: resolve => require(['@/views/MBGL/doctor/homepage/apply/nurseapply'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页=> 出诊计划
  {
    path: '/MBGL/doctor/visitplan',
    name: 'visitplan',
    component: resolve => require(['@/views/MBGL/doctor/visitplan/index'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页=> 系统文章
  {
    path: '/MBGL/doctor/systemarticle',
    name: 'systemarticle',
    component: resolve => require(['@/views/MBGL/doctor/systemarticle/catalogselect'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页=> 系统文章 =>文章详情
  {
    path: '/MBGL/doctor/articledetail',
    name: 'articledetail',
    component: resolve => require(['@/views/MBGL/doctor/systemarticle/articledetail'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页=> 系统文章 =>文章详情 =>文章问题 
  {
    path: '/MBGL/doctor/articlequestion',
    name: 'articlequestion',
    component: resolve => require(['@/views/MBGL/doctor/systemarticle/articlequestion'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页=> 系统文章 =>文章详情 =>文章反馈 
  {
    path: '/MBGL/doctor/articlefeedback',
    name: 'articlefeedback',
    component: resolve => require(['@/views/MBGL/doctor/systemarticle/articlefeedback'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页=> 收藏文章
  {
    path: '/MBGL/doctor/collectarticle',
    name: 'collectarticle',
    component: resolve => require(['@/views/MBGL/doctor/collectarticle/articlelist'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页=> 收藏文章 =>文章详情
  {
    path: '/MBGL/doctor/collectarticledetail',
    name: 'collectarticledetail',
    component: resolve => require(['@/views/MBGL/doctor/collectarticle/collectarticledetail'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页=> 收藏文章 =>文章详情 =>文章问题
  {
    path: '/MBGL/doctor/collectarticlequestion',
    name: 'collectarticlequestion',
    component: resolve => require(['@/views/MBGL/doctor/collectarticle/collectarticlequestion'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  //主页=> 收藏文章 =>文章详情 =>文章反馈 
  {
    path: '/MBGL/doctor/collectarticlefeedback',
    name: 'collectarticlefeedback',
    component: resolve => require(['@/views/MBGL/doctor/collectarticle/collectarticlefeedback'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
    //主页=> 审核文章
    {
      path: '/MBGL/doctor/assessarticle',
      name: 'assessarticle',
      component: resolve => require(['@/views/MBGL/doctor/assessarticle/index'], resolve),
      meta: {
        keepAlive: false // false 表示需要使用缓存
      }
    },
    //主页=> 审核文章的文章详情
    {
      path: '/MBGL/doctor/assessarticle/detail',
      name: 'assessarticledetail',
      component: resolve => require(['@/views/MBGL/doctor/assessarticle/detail'], resolve),
      meta: {
        keepAlive: false // false 表示需要使用缓存
      }
    },
     //主页=> 审核问答题库
     {
      path: '/MBGL/doctor/assessQa',
      name: 'assessQa',
      component: resolve => require(['@/views/MBGL/doctor/assessQa/index'], resolve),
      meta: {
        keepAlive: false // false 表示需要使用缓存
      }
    },
    //主页=> 审核问答题库详情
    {
      path: '/MBGL/doctor/assessQa/detail',
      name: 'assessQaDetail',
      component: resolve => require(['@/views/MBGL/doctor/assessQa/detail'], resolve),
      meta: {
        keepAlive: false // false 表示需要使用缓存
      }
    },
    //主页=> 全部问答题库
  {
    path: '/MBGL/doctor/systemQa',
    name: 'systemQa',
    component: resolve => require(['@/views/MBGL/doctor/systemQa/catalogselect'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
    
  },
  //主页=> 全部问答题库 =>问答题库详情
  {
    path: '/MBGL/doctor/Qadetail',
    name: 'Qadetail',
    component: resolve => require(['@/views/MBGL/doctor/systemQa/Qadetail'], resolve),
    meta: {
      keepAlive: false // false 表示需要使用缓存
    }
  },
  // {
  //   path: '/testqn',
  //   name: 'testqn',
  //   component: resolve => require(['@/views/testqn'], resolve),
  //   meta: {
  //     keepAlive: false // false 表示需要使用缓存
  //   }
  // },
  // {
  //   path: '/testtree',
  //   name: 'testtree',
  //   component: resolve => require(['@/components/page/catalogtree'], resolve),
  //   meta: {
  //     keepAlive: false // false 表示需要使用缓存
  //   }
  // },
  // {
  //   path: '/testpagination',
  //   name: 'testpagination',
  //   component: resolve => require(['@/components/page/pagination'], resolve),
  //   meta: {
  //     keepAlive: false // false 表示需要使用缓存
  //   }
  // },
  // {
  //   path: '/testdate',
  //   name: 'testdate',
  //   component: resolve => require(['@/components/page/datepicker'], resolve),
  //   meta: {
  //     keepAlive: false // false 表示需要使用缓存
  //   }
  // },
  // {
  //   path: '/testbtn',
  //   name: 'testbtn',
  //   component: resolve => require(['@/views/testbtn'], resolve),
  //   meta: {
  //     keepAlive: false // false 表示需要使用缓存
  //   }
  // },
  // {
  //   path: '/testtimepicker',
  //   name: 'testtimepicker',
  //   component: resolve => require(['@/views/testtimepicker'], resolve),
  //   meta: {
  //     keepAlive: false // false 表示需要使用缓存
  //   }
  // },
];
export default new Router({
  mode: 'hash',  // 默认hash
  routes: routers,    //统一管理路由
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  },
})
