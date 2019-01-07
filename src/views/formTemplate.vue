<template>
  <div class="one" style="display:flex">
    <label class="title" style="width: 30%;">{{text}}</label>
    <input style=""
      :id = "id"
    :name = "name"
    :type="type"
    ref="input"
    :value="value"
    >
  </div>
</template>
<script>
  export default {
    name: 'FormTemplate',
    props: ['id','text','name', 'type','value'],
    methods :{
      test:function () {
        debugger;
        alert(1);
      }
    },
  };
</script>
