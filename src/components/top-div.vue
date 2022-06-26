<template>
  <div id="top" :style="{'font-size': fontSize, 'background-color': settings.background, 'color': settings.foreground}">
    <div v-html="markdown">
      
    </div>
    
  </div>
  <button style="position: fixed; left: 0.2rem; top: 0.2rem;" :style="{'background-color': settings.background, 'color': settings.foreground}" @click="showSettings=true">☰</button>
  <div style="z-index: 100; background-color: #aaa; opacity: 0.7; border: 2pt solid #121212; position: fixed; width: 60%; height: 60%; left: 20%; top: 20%;" v-show="showSettings" :style="{display: 'flex', 'flex-direction': 'column'}">
    <h1>Self-Cam v{{$root.version}}</h1>
    <div>
      Self-Cam ist eine App von <a href="https://mathe-info.com" target="_blank">Thomas Klein</a>.
    </div>
    <div>
      Größe: <input type="range" v-model="settings.size"/> Hintergrund: <input type="color" v-model="settings.background"/> Schrift: <input type="color" v-model="settings.foreground"/>
    </div>
    <textarea v-model="settings.html" style="width: 100%" :style="{flex: 1}"></textarea>
    <div style="text-align: right"><button @click="changeSettings()">OK</button><button @click="cancelSettings()">Abbrechen</button><button @click="reset(settings)">Zurücksetzen</button></div>
  </div>
</template>

<script>
import { marked } from 'marked';
export default {
  watch: {
    showSettings(){
      for(let a in this.oldSettings){
        this.oldSettings[a]=this.settings[a];
      }
    }
  },
  computed: {
    fontSize(){
      return (this.settings.size*1.5+70)+"%";
    },
    markdown(){
      return marked(this.settings.html);
    } 
  },
  data(){
    return {
      showSettings: false,
      oldSettings: {
        html: "",
        background: "",
        foreground: "",
        size: 20
      },
      settings: {
        html: "",
        background: "",
        foreground: "",
        size: 20
      },
      SAVE_KEY: "THOMASKL-SELF-CAM"
    };
  },
  mounted(){
    let saved=localStorage.getItem(this.SAVE_KEY);
    if(saved){
      try{
        this.settings=JSON.parse(saved);
        for(let a in this.oldSettings){
          if(!(a in this.settings)){
            this.settings[a]=this.oldSettings[a];
          }
        }
      }catch(e){
        console.log("Settings konnten nicht wiederhergestellt werden");
        this.reset(this.settings,true);
      }
    }else{
      this.reset(this.settings,true);
    }
  },
  methods: {
    reset(settingsObject,force){
      if(!force){
        force=confirm("Willst du wirklich alles auf die Ursprungswerte zurücksetzen?");
      }
      if(force){
        settingsObject.html="Mehr Mathe und Informatik unter\n\n*mathe-info.com*";
        settingsObject.foreground="#ffffff";
        settingsObject.background="#121212";
      }
    },
    changeSettings(){
      localStorage.setItem(this.SAVE_KEY,JSON.stringify(this.settings));
      this.showSettings=false;
    },
    cancelSettings(){
      for(let a in this.settings){
        this.settings[a]=this.oldSettings[a];
      }
      this.showSettings=false;
    }
  }
}
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }
  h1{
    font-size: 120%;
  }
  button{
    min-height: 0.8cm;
  }
  #top{
    text-align: center;
    justify-content: space-around;
    display: flex;
    flex-direction: column;
    color: white;
  }
</style>