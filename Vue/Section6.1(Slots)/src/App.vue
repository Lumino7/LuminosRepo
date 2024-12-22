<script>
  import AppForm from "./components/Form.vue"
  export default {
    name: "App",
    components: {
      AppForm
    },
    data () {
      return {
        help: "This is some help text."
      }
    }
  }
</script>

<template>
  <app-form> <!--kebab case accepted and handled by Vue. Component where the slots will be exported to.-->
    <template v-slot:help> <!-- v-slot can only be used with the template tag.-->
      <p>{{ help }}</p> <!-- No need to use props as help is used in the same component.-->
    </template>
    <template v-slot:fields>
      <input type="text" placeholder="email">
      <input type="text" placeholder="username">
      <input type="password" placeholder="password">
    </template>
    <template v-slot:buttons>
      <button type="button">Submit</button>
    </template>
    <p>Dummy Text</p>
  </app-form>


  <app-form>
    <template v-slot:help>
      <p>Contact help text.</p>
    </template>
    <template v-slot:fields>
      <input type="text" placeholder="name">
      <input type="text" placeholder="message">
    </template>
    <template v-slot:buttons>
      <button type="button">Submit</button>
    </template>
  </app-form>
</template>

