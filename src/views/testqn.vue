<template>
<div>
<upload :src='photourl1' @changeSrc="src1Change"></upload>
<upload :src='photourl2' @changeSrc="src2Change"></upload>
</div>
</template>
<script>
import upload from '../components/page/qnupload.vue';
  export default {
    data(){
      return{
        content: {
				type: 'hidden',
				require: false
      },
      photourl1 : '',
      photourl2 : '',
      }
    },
    components: {
      'upload':upload
    },
    methods :{
      src1Change : function(data){
        this.common.consoledebug.log("你将图片修改为：" + data.url);
      },
      src2Change : function(data){
        this.common.consoledebug.log("你将图片修改为：" + data.url);
      }
    }
  };
</script>
