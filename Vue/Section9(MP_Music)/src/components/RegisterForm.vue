<template>
  <!--alert box-->
  <div class="text-white text-center font-bold p-4 rounded mb-4"
  v-if="reg_show_alert"
  :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>

  <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
  <!--VeeForm is a component that was imported in validation.js, automatically wraps the compononent in a form tag. -->
  <!--validation-schema applies rules for each field, corresponding to the keys in the schema.-->
  <!--Vee Form's submit event forces validation on all the fields before submission. Also prevents the page from refreshing upon submission.-->
  <!--initial-values: for setting default values in the field.-->
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      /> <!--VeeField wraps the component in an input tag. Otherwise put vee-field as="select" if you want it to be wrapped in select for instance. name attribute is for the name of the field.-->
      <ErrorMessage class="text-red-600" name="name"/> <!--ErrorMessage component generates a span tag containing the error message if there's an error. name=name of the field this errormessage will correspond to.-->
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email"/>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age"/>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" v-slot="{ field, errors }"
        type="password"
        :bails="false"
      > <!--bails=false disables Vue's fast exit strategy when validating. ie returning an error immediately on the first broken rule.-->
      <!--v-slot to give us access to the field object/property of vee-field.-->
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password" v-bind="field"
        /> <!--v-bind to bind the field and errors(errors is an array) properties to this input, giving it the functionalities of a vee-field.-->
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password"/>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field as="select" name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
    </vee-field>
    <ErrorMessage class="text-red-600" name="country"/>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field name="tos" value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <!--Checkboxes only send data when they are checked. Otherwise, they are simply omitted from the form submission.
      value="1" ensures that tos=0 is submitted when the checbox isnt ticked, instead of omitting it.
      This prevents error from vee-validate handling the "required" rule.-->
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600" name="tos"/>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
    <!--binding disabled disables the button when form is already in submission (prevents spamming)-->
      Submit
    </button>
  </vee-form>
</template>

<script>
  import {auth, usersCollection} from '@/includes/firebase'; //remember to import the firebase module you customized and not the entire firebase module.

  export default {
    name: 'RegisterForm',
    data() {
      return {
        schema: {
            name: "required|min:3|max:100|alpha_spaces", //name in the name attribute : rule name. rules separated by pipe.
            email: "required|min:3|max:100|email",
            age: "required|min_value:18|max_value:120",
            password: "required|min:9|max:100|excluded:password",
            confirm_password: "passwords_mismatch:@password", //confirmed rule checks if the input matches another field. In this case, password (renamed to passwords_m)
            country: "required|country_excluded:Antarctica", //excluded will throw an error if the options passed are chosen. Assumes that values are strings, can be comma-separated.
            tos: "tos",
          },
          userData: {
            country: 'USA', //the key names should correspond to the field names that you want to put initial values on.
          },
          reg_in_submission: false,
          reg_show_alert: false,
          reg_alert_variant: 'bg-blue-500',
          reg_alert_msg: 'Please wait. Your account is being created.'
      }
    },
    methods: {
      async register(values) {
        this.reg_show_alert = true;
        this.reg_in_submission = true;
        this.reg_alert_variant = 'bg-blue-500';
        this.reg_alert_msg = 'Please wait. Your account is being created.';
        
        let userCred = null;
        try {
          userCred = await auth.createUserWithEmailAndPassword(
            values.email, values.password
          );
        } catch(error) {
          this.reg_in_submission = false;
          this.reg_alert_variant = 'bg-red-500';
          this.reg_alert_msg = 'An unexpected error occured. Please try again later. -auth'
          console.log(`error:${error}`)
          return;
        }
        //firebase.auth() returns the firebase auth object, which has the createUserWithEmailAndPassword method.
        //this method creates a user account, logs in that user, and then returns the user credentials.
        //in this case, we'll store them in userCred.
        //firebase.auth was moved to firebase.js to turn it into a named export, instead of repeatedly calling it throughout the code.

        try {
          await usersCollection.add({
            name: values.name,
            email: values.email,
            age: values.age,
            country: values.country
          });
        } catch(error) {
          this.reg_in_submission = false;
          this.reg_alert_variant = 'bg-red-500';
          this.reg_alert_msg = 'An unexpected error occured. Please try again later. -database'
          return;
        }

        this.reg_alert_variant = 'bg-green-500';
        this.reg_alert_msg = 'Success! Your account has been created.';
        console.log(userCred);
      }, //v-model not needed as vee-validate keeps track of the input values.
    }
  }
</script>
