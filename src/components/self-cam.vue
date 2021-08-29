<template>
  <video ref="video" autoplay="autoplay">
  </video>
</template>

<script>
export default {
  props: {
    
  },
  data(){
    return {
      
    }
  },
  mounted(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false},
    (stream)=>{
      this.$refs.video.srcObject=stream;
    },
    (error)=>{
      alert(error);
    })
  }
}
</script>

<style scoped>
  video{
    width: 100%;
  }
</style>