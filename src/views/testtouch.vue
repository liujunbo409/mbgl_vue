<template>
  <div>
    <v-touch v-on:swipeleft="onSwipeLeft"  v-on:swiperight="onSwipeRight"  >

      484845454154.
      26515165156165
      56165165165165165
      156165165165
      6546546554
      45

             
    </v-touch>
  </div>
</template>
<style scoped>


</style>

<script>
  import {Toast} from 'mint-ui';
  import {createToast} from "../assets/js/api";
  import {clickBack, jumpToPage} from "../assets/js/common";
  export default {
    methods :{
      onSwipeLeft : function () {
        console.log("left");
      },
      onSwipeRight : function () {
        console.log("right");
      }
    }
  }

</script>
