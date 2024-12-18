import { createApp } from 'vue' //syntax to import named exports.
import App from './App.vue' //App.vue will be the root component.
// import Greeting from "@/Greeting.vue"  //@ is a path alias set in vite.config.js

let vm = createApp(App);

// vm.component("Greeting", Greeting) //global component declaration. Can be used anywhere in Vue, including children components.
//Takes component name and the component itself. Usually local declaration is best practice (declaring it inside it's parent component.)

vm.mount('#app')
