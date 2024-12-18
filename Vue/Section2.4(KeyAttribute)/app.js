let vm = Vue.createApp({
  data() {
    return {
      people: [
        {
          name: 'John',
          message: 'Hello world!'
        },
        {
          name: 'Rick',
          message: 'I like pie.'
        },
        {
          name: 'Amy',
          message: 'Skydiving is fun!'
        }
      ]
    }
  },
  methods: {
    move() { //moves the first item of the array to the end.
      const first = this.people.shift();
      this.people.push(first);
    }
  }
}).mount('#app')
