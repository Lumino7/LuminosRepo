<template>
    <button type="button" @click="onClickAge">Update Age (emit)</button> <!--props(data and other properties passed to children components) aren't allowed to be updated directly in the children components.
    Workarounds: emitting events OR callback functions. It's recommended to use emit events, as you can debug them in Vue devtools.-->
    <button type="button" @click="ageChangeFn(3)">Update Age (callback)</button> <!--callback fn that is inherited as a prop, which will then be called in the parent component.-->
    <p>The user is {{ age }} years old.</p>
    <p>{{ ageDoubled }}</p> <!--This doesn't change the age in App.vue as it is an entirely different data.-->
</template>

<script>
    export default {
        name: "User",
        // props: ["age"], //props is short for properties. array of props that the component will accept.
        props: { // if you want to validate props, pass them as an object.
            age: { //prop name
                type: Number, //datatypes that you want to accept. You can use arrays if you want multiple.
                required: true
            },
            ageChangeFn: Function //no need to set as an object if you're only checking for the type.
        },
        emits: ["age-change"], //array of events emitted from the component. emit means to trigger an event.
        methods: {
            onClickAge() { //onClickAge only exists within the scope of this component. In order for it to be listened by the parent, emit is needed.
                this.$emit('age-change',3) //Vue event emitting function. 1st Argument: name of the custom event that will be emitted. Can only be listened to by a parent component, not by siblings.
                //2nd argument: payload (optional), data sent along with the event.
            }
        },
        computed: {
            ageDoubled() {
                return this.age*2 //no need to use emits if you are just using the prop value and not changing it.
            }
        }
    }
</script>
