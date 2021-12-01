<template>
  <section id="app">
    <header class="home-header align-center main-container">
      <div>Tasker</div>
      <div class="home-nav">
        <router-link to="/">Product</router-link> |
        <router-link to="/about">Solutions</router-link> |
        <router-link to="/home">Templates</router-link> |
        <router-link to="/home">Pricing</router-link> |
      </div>
      <div class="action-btn">
        <router-link to="/login">Login</router-link> |
        <router-link to="/home">start</router-link> |
        <router-link to="/login">Sign In</router-link> |
      </div>
    </header>
    <section class="info-section">
      <section class="info-header">
        <h1>Work Without Limits</h1>
        <h5>
          Easily build, run, and scale your dream workflows on one platform.
          What would you like to manage with wednesday Work OS?
        </h5>
        <button>Get Started ></button>
        <!-- <img> -->
      </section>
      <section class="more-info">
        <h3>Manage everything in one workspace</h3>
        <h5>
          Planning, tracking and delivering your team's best work has never been
          easier
        </h5>
        <!-- <img> -->
      </section>
      <section class="more-info">
        <h3>Visualize work with Views</h3>
        <h5>View data as a kanban, danban, dashboard and more</h5>
        <!-- <img> -->
      </section>
      <section class="more-info">
        <h3>Setup in minutes</h3>
        <h5>
          Get started fast with hundreds of visual and cutomizable templated -
          or creat your own
        </h5>
        <!-- <img> -->
        <section>
          <section class="trial">
            <h3>Try Tasker for your team</h3>
            <h5>14-day free trial | No credit card needed</h5>
            <button>Get Started</button>
          </section>
          <section class="links">
            <a>About Us</a>
            <a>Become a partner</a>
            <a>Careers</a>
            <a>Blog</a>
            <a>Pricing</a>
            <a>Contact sales</a>
            <a>Terms and privacy</a>
            <a>Product overview</a>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
export default {};
</script>