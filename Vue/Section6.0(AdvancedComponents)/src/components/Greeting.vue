<template>
  <p v-if="age > 25">{{msg}}</p>
  <p v-else>You must be 25 years old or older to view this message.</p>
</template>

<script>
  export default {
    name: 'Greeting', //component name
    props: ["age"],
    data() {
      return {
        msg: "Hello World!"
      }
    }
  }
</script>

<style scoped> /* scoped keyword makes this CSS apply only to this component. */
p {
  color: red;
}
</style>
