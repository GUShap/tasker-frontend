<template>
  <div id="app">
    <header class="home-header flex space-between">
      <div class="">
      <h1>Tasker</h1>
      <div class="main-nav">
        <router-link to="/">Product</router-link> |
        <router-link to="/about">Solutions</router-link> |
        <router-link to="/home">Templates</router-link> |
        <router-link to="/home">Pricing</router-link> |
      </div>
       </div>
      <div class="action-btn">
         <router-link to="/login">Login</router-link> |
         <router-link to="/home">start</router-link> |
          <router-link to="/login">Sign In</router-link> |
      </div>
    </header>
      <h1>landing page</h1>
  </div>
</template>

<script>
export default {};
</script>