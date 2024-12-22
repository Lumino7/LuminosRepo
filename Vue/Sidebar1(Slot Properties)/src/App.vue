<template>
  <div id="app">
    <hello-world v-slot='v'> <!--v-slot takes an alias for the object containing the slot properties.-->
      <p>Hello {{ v.user.name }}</p>
    </hello-world>


    <hello-world #default="{ user, favorites }"> <!--# is shorthand for v-slot, should be followed by slot name, default is default.
      you can destructure selected properties instead of passing the entire object.-->
      <p>Hello {{ user.name }}. I like {{ favorites[0] }}.</p>
    </hello-world>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
