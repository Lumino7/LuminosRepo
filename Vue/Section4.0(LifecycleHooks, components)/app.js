let vm = Vue.createApp({
  // data() {
  //   return {
  //     message: "Hello world!"
  //   }
  // },
  // template: `{{ message }}` //if you want to generate template from the app.js file. Not recommended.
})

vm.component("hello", { //for making components. Has to be called before the instance is mounted. 1st arg is the component name.
//can have it's own data, methods, computed and watch properties.
  template: `<h1>{{ message }}</h1>`,
  data() {
    return {
      message: "Hello World!"
    }
  }
})

vm.mount("#app");

// setTimeout(() => {
//   vm.mount("#app")
// }, 3000)



// let vm = Vue.createApp({
//   data() {
//     return {
//       message: "Hello world!"
//     }
//   },
//   beforeCreate() { //lifecycle hooks. This one is when the data and methods aren't initialized yet (i.e. Vue has no access to them yet)
//     console.log("beforeCreate function called!", this.message)
//   },
//   created() { //instance is created, data and methods are available.
//     console.log("created function called!", this.message)
//   },
//   beforeMount() { //not mounted yet, no access to the template yet.
//     console.log("beforeCreate function called!", this.$el) //this.$el is the element that Vue will mount to.
//   },
//   mounted() { //has access to the template.
//     console.log("mounted function called!", this.$el)
//   },
//   beforeUpdate() { //whenever an update to data occurs, but before these are reflected to the template. Usually used for debugging.
//     console.log("beforeUpdate function called!")
//   },
//   updated() { //once template is updated
//     console.log("updated function called!")
//   },
//   beforeUnmount() { //before Vue instance is unmounted vm.unmount
//     console.log("beforeUnmount function called!")
//   },
//   unmounted() { //after instance is unmounted
//     console.log("unmounted function called!")
//   }
// })

// vm.mount("#app");

// // setTimeout(() => {
// //   vm.mount("#app")
// // }, 3000)
