import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import './assets/tailwind.css';
import VueClipboard from 'vue3-clipboard'

const app = createApp(App)

app.use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
})

app.use(store);
app.mount('#app')


/* createApp(App).use(store).mount('#app'); */

