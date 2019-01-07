<template>
  <div>
    <testselect  :selectvalue="vl" :utilparam="shuzuparam" @changeSelect="changeSelect"></testselect>
  </div>
</template>
<script>
  var self = null;
  import testselect from './testselect';

  export default {
    components: {
      'testselect': testselect,
    },
    created() {
      self = this;    //使用self来代替this，避免this无效

    },
    mounted() {
      self.init();
    },
    data() {
      return {
        xueliinfo: null,
        xueli: {"04": "博士"},
        xuelili: '04',
        selectContent: {value: 0, text: "请选择"}, //模拟select默认选中的值
        subject: null,
        vl : "doctor",
        shuzuparam:"doctor_role"
      }
    },
    methods: {
      init: function () {
      //   self.api.user_getUtils({param: 'xueli_val '}).then((res) => {
      //     self.common.consoledebug.log("ret :" + JSON.stringify(res.data.ret));
      //   self.subject = res.data.ret;
      //   var vl = "03";
      //   for (var i = 0; i < self.subject.length; i++) {
      //     if (vl == self.subject[i].value) {
      //       self.selectContent.text = self.subject[i].text;
      //     }
      //   }
      // }).
      //   catch((err) => {
      //     self.common.consoledebug.log("err :" + JSON.stringify(err));
      // })
      //   ;
      },
      changeSelect : function (data) {
        self.common.consoledebug.log(data);
        self.common.consoledebug.log("你将下拉框修改为：" + data.value + data.text);
      }
    }
  };
</script>
