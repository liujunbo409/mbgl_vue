<template>
  <div >
    <test></test>
    <div class="one">
      <label class="title">姓名</label>
      <label class="value">医生姓名</label>
    </div>
    <div class="one">
      <label class="title">昵称</label>
      <label class="value">医生昵称</label>
    </div>
    <div class="one">
      <label class="title">性别</label>
      <label class="value">男</label>
    </div>
    <div class="one" style="border-bottom: none">
      <label class="title">电话</label>
      <label class="value">13888888888</label>
    </div>
    <div class="smalltitle">
      <label style="margin-left: 0.5rem">医生信息 请准确填写</label>
    </div>
    <div class="one">
      <label class="title">身份证</label>
      <label class="value">请输入身份证</label>
    </div>
    <div class="one">
      <label class="title">学历</label>
      <label class="value">硕士</label>
    </div>
    <div class="one">
      <label class="title">职称</label>
      <label class="value">主治医师慎</label>
    </div>
    <div class="one" style="border-bottom: none;height: 3rem">
      <label class="title">个人简介</label>
    </div>
    <div class="one" style="border-bottom: none;height: 10em;">
      <textarea class="jianjie" placeholder="请输入简介"></textarea>
    </div>


  </div>
</template>
<script>
  export default {
    methods :{

    }
  }

</script>
<style scoped>

  header{
    width: 100%;
    background-color: #03a9f4;
    height: 2.5rem;
    text-align: center;
    color: #FFFFFF;
    line-height: 2.5rem;
    font-size: 1rem;
  }
  .title{
    margin-left: 0.5rem;
    font-size:0.7rem;
  }
  .value{
    margin-right: 0.5rem;
    float: right;
    color:#B3B3B3;
    font-size:0.7rem;
  }
  .one{
    height: 2rem;
    line-height: 2rem;
    border-bottom: solid 1px #B3B3B3;
    background-color: #FFFFFF;
  }
  .smalltitle{
    margin-top: 0.8rem;
    height: 1.7rem;
    line-height: 1.7rem;
    background-color: #03a9f4;
    color:#FFFFFF;
    font-size: 0.8rem;
  }
  .jianjie{
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding: 0.5rem;
    max-width: 95%;
    height: 6rem;
    border: solid 1px #B3B3B3;
    font-size: 0.7rem;
  }
</style>
