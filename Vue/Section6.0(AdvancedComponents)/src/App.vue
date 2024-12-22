<script>
  import Greeting from "@/components/Greeting.vue"  //@ is a path alias set in vite.config.js
  import User from "@/components/User.vue"

  export default { //makes the following statement the module's default export, meaning it can be named anything when being imported.
    //if not default, it would be a named export: export const myComponent{}, and has to be called the same name when imported.
    name: 'App', //component name
    // data() { //moved to greeting component
  //     return {
  //       msg: "Hello World!"
  //     }
  //   }
    components: { //local component declaration
      Greeting, //shorthand for Greeting:Greeting
      User
    },
    data() {
      return{
        age:20 //data that needs to be used by this component's children components.
        //Any changes to this will be inherited to the children components.
      }
    },
    methods: {
      updateAge(num) {
        this.age += num
      },
      updateAgeCB(num) { //CB = callback
        this.age += num
      }
    }
  }
</script>

<template>
  <h3>Hey!</h3>
  <!-- <button type="button" @click="age++">Update Age</button> This button also updates the age in the children components. -->
  <greeting :age="age"></greeting> <!--Vue handles the conversion of the component name to kebab-case. The entire Greeting.vue file is
  imported and processed. Not just the script tag.-->
  <user :age="age" @age-change="updateAge" :ageChangeFn="updateAgeCB"></user> <!-- passing a prop to the User component. Adding a listener for the emitted event (age-change). Vue automatically passes the payload to the event handler (updateAge).
  passing a function as a prop. -->
</template>
