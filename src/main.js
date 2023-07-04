import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import video from 'video.js'
import 'video.js/dist/video-js.css'; // 导入video.js的CSS样式文件

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
