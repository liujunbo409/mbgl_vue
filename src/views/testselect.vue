<template>
  <div class="selectWrap">
    <div class="select-wrapper">
      <div class="select" @click = "triggerOption">
        <div class="select-content">{{selectContent.text}}</div>
        <div class="triangle-wrapper">
          <div id="triangle-down"></div>
        </div>
      </div>
      <div class="option-wrapper" style="display: none;">
        <div class="option-item" v-for = "(item,index) in subject" :key="index" @mouseout="out($event)" @mouseover="move($event)" @click = "choose(item)">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:[
      'utilparam',           //数组常量参数
      'selectvalue',        //select选中的值
    ],
    data(){
      return{
        subject:{
        type:Array,
        default:function(){
          return []
        }
      },
      selectContent: {value: 0, text: "请选择"}, //模拟select默认选中的值,
      }
    },
    mounted(){
          this.api.user_getUtils({param: this.utilparam}).then((res) => {
          //this.common.consoledebug.log("ret :" + JSON.stringify(res.data.ret));
        this.subject = res.data.ret;
        var vl = this.selectvalue;
        for (var i = 0; i < this.subject.length; i++) {
          if (vl == this.subject[i].value) {
            this.selectContent.text = this.subject[i].text;
          }
        }
      }).
        catch((err) => {
          this.common.consoledebug.log("err :" + JSON.stringify(err));
      })
        ;      
    },
    computed:{
      optionWrapper(){
        return document.querySelector(".option-wrapper");
      },
      selectCon(){
        return document.querySelector(".select-content");
      },
      subjectList(){
        return document.getElementsByClassName("option-item");
      },
    },
    methods:{
      move(event){
        for(var item of this.subjectList){
          item.classList.remove("hover");
        }
        event.currentTarget.classList.add("hover");
      },
      out(event){
        event.currentTarget.classList.remove("hover");
      },
      triggerOption(){
        if (this.optionWrapper.style.display == "none") {
          this.optionWrapper.style.display = "block";
        }else{
          this.optionWrapper.style.display = "none";
        }
        for(var item of this.subjectList){
          if (item.innerHTML == this.selectContent.text) {
            item.classList.add("hover");
          }else{
            item.classList.remove("hover");
          }
        }
      },
      choose(item,value){
        this.selectContent.text = item.text;
        this.selectContent.value = item.value;
        this.optionWrapper.style.display = "none";
        var data = {
          value : this.selectContent.value,
          text : this.selectContent.text
        };
        this.$emit("changeSelect",data);
      }
    },
  }
</script>
<style>
  .select{
    position: relative;
    overflow: hidden;
    padding-right: 20px;
    min-width: 80px;
    width: 100%;
    height: 44px;
    line-height: 44px;
    border: 1px solid #000;
    cursor: default;
    font-size: 13px;
  }
  .select-content{
    text-align: right;
  }
  .triangle-wrapper{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 20px;
    cursor: default;
  }
  #triangle-down{
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 6px solid #000;
  }
  .option-wrapper{
    position: relative;
    overflow: hidden;
    min-width: 80px;
    width: 100%;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
  }
  .option-item{
    min-width: 80px;
    height: 20px;
    line-height: 20px;
    padding-right: 10px;
    text-align: right;
    cursor: default;
  }
  .hover{
    background-color: #03a9f4;
    color:#fff !important;
  }
</style>
