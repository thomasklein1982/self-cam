<template>
  <div id="screen">
    <top-div>
    </top-div>
    <self-cam></self-cam>

  </div>
</template>

<script>
import selfCam from './components/self-cam.vue'
import TopDiv from './components/top-div.vue'
export default {
  data(){
    return {
      version: "2"
    }
  },
  components: { selfCam, TopDiv },
}
</script>

<style scoped>
  #top{
    flex: 1;
  }
  #screen{
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
</style>

<style>
  body, html, #app{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body{
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    font-family: sans-serif;
  }
</style>
