<template>
  <div style="background-color:#FFFFFF">
    <header class="aui-bar aui-bar-nav">
      <a class="aui-pull-left" @click="clickBack">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">用户反馈</div>
      <a class="aui-pull-right" href="#/MBGL/doctor/index">
        <span class="aui-iconfont aui-icon-home"></span>
      </a>
    </header>
    <div style="margin-left:0.5rem;margin-top:1.5rem;color:#ddd">
      反馈类型
    </div>
    <div style="width:100%;display:flex;margin-left:0.5rem;margin-top:0.5rem;">
      <div v-for="(item, key) of alltype" style="width:45%">
        <input class="aui-radio" type="checkbox" v-bind:value="item.id" v-model="selectedtype"><span style="height:24px;line-height:24px;margin-left:4px;">{{item.name}}</span>
      </div>
    </div>
    <ul class="aui-list aui-form-list" style="margin-top:0.5rem">
        <div class="aui-border-b">
                <textarea class="aui-font-size-14 aui-padded-10" style="width: 100%;height:auto;border: 0px;
                                        line-height: 22px;color:#666666;outline: none; overflow-y:visible" rows="6"
                          placeholder="请填写您的反馈内容，我们将尽快为您处理" maxlength="140" v-model="content"></textarea>
                </div>
      </ul>
    <div class="aui-bar aui-bar-tab aui-bg-info">
        <div class="aui-bar-tab-item aui-active" style="color:#FFFFFF"tapmode @click="doFeedBack">
            提交
        </div>
    </div>
  </div>
</template>
<script>
  var self = null;    //在create方法中初始化为this
  const back_delete_ill = false;
  import { MessageBox  } from 'mint-ui';
  export default {
    created() {
      self = this;    //使用self来代替this，避免this无效
    },
    mounted(){
      self.init();
    },
    data(){
      return {
        content : '', //文章反馈内容
        alltype : [],   //所有类型
        selectedtype : [], //选择之类型
      }
    },
    methods :{
      init : function(){
        //获得类型列表
        self.api.user_getFeedBackTypes({type : 'global'}).then((res)=>{
          for(let index in res.data.ret) {  
            let type = {id : index, name: res.data.ret[index]};
            self.alltype.push(type);
          };  
        }).catch((err)=>{

        })
      },
      //提交反馈
      doFeedBack : function(){
        if(self.selectedtype.length == 0){
           MessageBox('提示','请选择反馈类型！');
           return false;
        }
        if(self.content == ''){
           MessageBox('提示','反馈内容不能为空！');
           return false;
        }
        var type = "";
        for(var i=0;i<self.selectedtype.length;i++){
          if(self.selectedtype.length == 1){
            type = self.selectedtype[0];
          }else{
            if(i == self.selectedtype.length-1 ){
              type += self.selectedtype[i];
            }else{
              type += self.selectedtype[i] + "&";
            }
          }
        }
        //console.log(JSON.stringify(type));
        let params = {
          user_id : localStorage.getItem("doc_id"),
          role : localStorage.getItem("role"),
          token : localStorage.getItem("token"),
          type : type,
          mokuai_id: '-1',
          content : self.content,
          mokuai : 'global'
        }
        self.api.common_doFeedBack(params).then((res)=>{
          //console.log(JSON.stringify(res));
          MessageBox('提交成功！','非常感谢您的反馈！');
        }).catch((err)=>{

        })
      },
      clickBack : function () {
        self.common.clickBack();
      }
    },
  }

</script>
