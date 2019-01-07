<template>
<upload :uploadurl="uploadimgs" :pickfile ="pickfiles" : multiple="true">
                <div slot="upload">
                  <div :id="pickfiles" class="btn">点击添加门店logo/照片<img :src="uploadimgs" class="uploadimg"></div>
                </div>
              </upload>
</template>
 <script>
import upload from '../components/page/upload.vue';
export default {
    components: {
      upload,
    },
}
</script>
