import './assets/base.css';
import './assets/main.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia' //'pinia' is the name of the NPM package registered in node_modules. That's why its a string.

import App from './App.vue'
import router from './router'
import VeeValidatePLugin from './includes/validation'; //registering a custom plugin
import "./includes/firebase";

const app = createApp(App)

app.use(createPinia()) //registering plugins, must be done before mounting the instance. Adds a Pinia tool in Vue devtools.
app.use(router)
app.use(VeeValidatePLugin) //you can add a 2nd argument here to be passed to the plugin as the options arg.

app.mount('#app')
