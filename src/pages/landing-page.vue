<template>
  <section id="app" class="landing-page">
    <header class="home-header align-center">
      <section class="home-nav">
        <a class="logo-home">Tasker</a>
        <div class="extra-info">
          <router-link to="/">Product</router-link>
          <router-link to="/about">Solutions</router-link>
          <router-link to="/home">Templates</router-link>
          <router-link to="/home">Pricing</router-link>
        </div>
      </section>
      <div class="action-btn">
        <router-link to="/login">Login</router-link>
        <router-link class="get-started" to="/home"> Get Started</router-link>
      </div>
    </header>
    <section class="info-section">
      <section class="info-header">
        <h1 class="info-heading">Work Without Limits</h1>
        <h5 class="opening-para">
          Easily build, run, and scale your dream workflows on one platform.
          What would you like to manage with wednesday Work OS?
        </h5>
        <button>Get Started<i class="fas fa-chevron-right"></i></button>
      </section>
      <!-- <img> -->
      <section class="more-info">
        <h3>Manage everything in one workspace</h3>
        <p>
          Planning, tracking and delivering your team's best work has never been
          easier
        </p>
        <img :src="require(`@/pics/pic1.png`)" />
      </section>
      <section class="more-info">
        <h3>Visualize work with Views</h3>
        <p>View data as a kanban, danban, dashboard and more</p>
        <!-- <img> -->
      </section>
      <section class="more-info">
        <h3>Setup in minutes</h3>
        <p>
          Get started fast with hundreds of visual and cutomizable templated -
          or creat your own
        </p>
        <!-- <img> -->
      </section>

      <section class="trial">
        <h3>Try Tasker for your team</h3>
        <p>14-day free trial | No credit card needed</p>
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
</template>

<script>
export default {};
</script>