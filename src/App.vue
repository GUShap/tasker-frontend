<template>
  <div id="app">
    <header>
      <h1>Logo</h1>
      <div class="main-nav">
        <router-link to="/">Product</router-link>
        <router-link to="/about">Solutions</router-link>
        <router-link to="/tasker-app">Templates</router-link>
        <router-link to="/tasker-app">Pricing</router-link>
      </div>
      <div class="">
         <router-link to="/tasker-app">Login</router-link>
          <router-link to="/tasker-app">Sign In</router-link>

      </div>
    </header>
    <router-view />
  </div>
</template>

