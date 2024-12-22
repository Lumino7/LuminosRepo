<template>
   <!-- Header -->
   <header id="header" class="bg-gray-700">
      <nav class="container mx-auto flex justify-start items-center py-5 px-4">
        <!-- App Name -->
        <a class="text-white font-bold uppercase text-2xl mr-4" href="#"
          >Music</a
        >

        <div class="flex flex-grow items-center">
          <!-- Primary Navigation -->
          <ul class="flex flex-row mt-1">
            <!-- Navigation Links -->
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Login / Register</a>
            </li>
            <li>
              <a class="px-2 text-white" href="#">Manage</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
</template>

<script>
  import {mapStores} from 'pinia'; //mapStores is a function
  import useModalStore from '@/stores/modal' //naming convention use<storename>store

  export default {
    name: "AppHeader",
    computed: {
      ...mapStores(useModalStore) //merges the store into this component, giving access to the state.
      // This line creates a modalStore object.
    },
    methods: {
      toggleAuthModal() {
        this.modalStore.isOpen = !this.modalStore.isOpen; //mapStores() creates an object with the name <modal-name> + <Store>
        //you can access isOpen directly in the template without saying modalStore.isOpen, but if you want to update the state itself, you have to use modalStore.isOpen.
        console.log(this.modalStore.isOpen);
      }
    },
  }
</script>
