<template>
  <div>
    <slot :user="user" :favorites="favorites"></slot> <!--binding user to a slot property that you named user. A way to send data from child to parent component.-->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      user: {
        name: "John",
        age: 25,
      },
      favorites: ["Pizza", "Marbles", "Birds"],
    };
  },
}
</script>
