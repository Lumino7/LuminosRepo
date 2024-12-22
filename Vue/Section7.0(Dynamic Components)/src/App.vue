<script>
  import Home from "./components/Home.vue"
  import About from "./components/About.vue"
  export default {
    name: "App",
    components: {
      Home,
      About
    },
    data() {
      return {
        componentName: 'Home' //default value is Home
      }
    }
  }

</script>

<template>
  <select v-model="componentName"> <!--dropdown-->
    <option value="Home">Home</option>
    <option value="About">About</option>
  </select>
  <keep-alive>
    <component :is="componentName"></component>
  </keep-alive>
  <!--the component tag is a dynamic component. Whenever a component is toggled out, it gets unmounted (all of it's data and properties get unaccessible.)
    and when it gets retoggled, the data reverts to default state. Work-around: keepalive-->
  <!--prevents the component from being unmounted when toggled out. Basically just hides it from view.-->
  <!--is is a special attribute of the component tag.-->
</template>
