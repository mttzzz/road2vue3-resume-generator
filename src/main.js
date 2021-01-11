import {createApp} from 'vue'
import DKToast from 'vue-dk-toast'
import App from './App.vue'
import './theme.css'

createApp(App).use(DKToast, {
  duration: 1000,
  positionY: 'top',
  styles: {
    'background-color': '#42b983',
    color: 'white'
  }
}).mount('#app')
