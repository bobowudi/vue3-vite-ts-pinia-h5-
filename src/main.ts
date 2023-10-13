import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import {pinia} from '@/store'
import { router } from '@/router';

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')



