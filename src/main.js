import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' //import vue router
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'


const app = createApp(App)

app.use(router)

app.mount('#app')
