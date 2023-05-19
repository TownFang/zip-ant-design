<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div> -->
  <div>
    <Login></Login>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/views/login/page/Login.vue";

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
    Login,
  },
};
</script>
