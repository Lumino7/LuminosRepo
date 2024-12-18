const vm = Vue.createApp({
    data(){ //data() is a built-in method of the createApp's object. It is a function so that instance isolation is maintained.
        return{
            firstName: 'John',
            middleName: '',
            lastName: 'Doe',
            url: 'https://google.com',
            age: 20
        }
    },
    methods: { //do not use arrow functions as it will cause problems because of Vue's proxying systems
        // fullName(){
        //     return `${this.firstName} ${this.middleName} ${this.lastName}`
        // },
        updateLastName(msg, event) { //function keyword not needed for function declaration as Vue handles this.
            // event.preventDefault(); not needed anymore because of event modifier in html
            console.log(msg);
            this.lastName = event.target.value;
          },
        updateMiddleName(event){
            this.middleName = event.target.value;
        },
        increment(){
            this.age++;
            return;
        }
    },
    computed: { //unlike methods, all functions here must return a value. Only the value is stored in the computed object, the function is stored elsewhere. This is why no () is needed on the template.
        //also, you can't pass data into functions here. Unlike methods, results here are cached, Vue automatically reuses the last computed result as long as the dependencies haven’t changed, which makes computed properties very efficient.
        fullName(){
            return `${this.firstName} ${this.middleName} ${this.lastName}`
        },
    },
    watch: { //can be used on any property of the Vue instance. Not used frequently, usually for async fxns.
        age(newVal, oldVal){ //gets called whenever there are changes in age property. (function name is the name of the property you want to watch.)
            setTimeout(() => {
                this.age = 20;
            }, 3000) //reverts the value of age after 3 seconds

        }
    }
}).mount('#app')
