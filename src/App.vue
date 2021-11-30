<template>
  <div id="app">
    <header class="home-header">
      <h1>Tasker</h1>
      <div class="main-nav">
        <router-link to="/">Product</router-link>
        <router-link to="/about">Solutions</router-link>
        <router-link to="/home">Templates</router-link>
        <router-link to="/home">Pricing</router-link>
      </div>
      <div class="btn-container">
        <router-link to="/home">Login</router-link>
        <router-link to="/home">Sign In</router-link>
      </div>
    </header>
    <router-view />
  </div>
</template>

