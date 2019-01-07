<template>
  <div >
    <test v-bind:title="title" ref="test"></test>
    <div v-for="list in lists">
      <FormTemplate  :name="list.name" :id="list.id" :text="list.text" :type="list.type"  v-model="list.value"></FormTemplate>
    </div>
    <button class="normalbtn-secondary"  @click="test">编辑</button><br><br>
  </div>
</template>
<style scoped>


</style>

<script>
  import {Toast} from 'mint-ui';
  import {createToast} from "../assets/js/api";
  import Test from './test';
  import FormTemplate from './formTemplate';
  import {clickBack} from "../assets/js/common";
  export default {
    data(){
      return {
        title: '表单组件',
        lists:[
          {id:'text',name:'text',text :'文本输入框',type:'type',value:'文本输入'},
          {id:'number',name:'number',text :'数字输入框',type:'number',value:'123456'},
          {id:'password',name:'password',text :'密码输入框',type:'type',value:'文本输入'}
        ]
      }
    },
    methods :{
      getById :function () {
        var obj = document.getElementById("password");
        alert(obj.value);
      },
      test:function () {
        this.$refs.test.test();
      }
    },
    components: {
      'test': Test,
      'FormTemplate':FormTemplate
    },
  }

</script>
