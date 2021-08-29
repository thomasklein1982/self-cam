import { createApp } from 'vue';
import App from './App.vue';
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    let a=confirm("Es ist eine neue Version verfügbar. Wollen Sie die neue Version installieren?");
    if(a){
      updateSW();
      console.log('update');
      window.location.reload();
    }
  },
  onOfflineReady() {},
})

let app=createApp(App);
app.mount('#app');

window.app=app;
