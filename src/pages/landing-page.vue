<template>
  <section id="app" class="landing-page">
    <header class="home-header align-center">
      <section class="home-nav">
        <a class="logo-home">tasker.com</a>
        <div class="extra-info">
          <router-link to="/"
            >Product<i class="fas fa-chevron-down"></i
          ></router-link>
          <router-link to="/about"
            >Solutions<i class="fas fa-chevron-down"></i
          ></router-link>
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
          What would you like to manage with tasker.com Work OS?
        </h5>
      </section>
      <div class="icons">
        <div>
          <span><i class="fas fa-stream"></i>Project Management</span>
          <span><i class="fas fa-chart-line"></i>Scales and CRM</span>
          <span><i class="fas fa-bullhorn"></i>Marketing</span>
          <span><i class="fas fa-shapes"></i>Creative and design</span>
        </div>
        <div>
          <span><i class="fas fa-code"></i>Software development</span>
          <span><i class="fas fa-check"></i>Task management</span>
          <span><i class="fas fa-cog"></i>Operations</span>
          <span><i class="far fa-user"></i>HR and recruitment</span
          ><span><i class="fas fa-sliders-h"></i>IT</span>
        </div>
        <span><i class="fas fa-dot-circle"></i>200+ workflows</span>
      </div>
      <router-link class="get-started-in" to="/home">
        Get Started<i class="fas fa-chevron-right"></i
      ></router-link>
      <img class="main-img" :src="require(`@/pics/picture1.jpeg`)" />
      <section class="more-info first-p">
        <img :src="require(`@/pics/picture2.png`)" />
        <div class="txt">
          <h3>Manage everything in one workspace</h3>
          <p>
            Planning, tracking and delivering your team's best work has never
            been easier
          </p>
        </div>
      </section>
      <section class="more-info">
        <div class="txt">
          <h3>Visualize work with Views</h3>
          <p>View data as a kanban, danban, dashboard and more</p>
        </div>
        <img :src="require(`@/pics/picture3.png`)" />
      </section>
      <section class="more-info">
        <div class="imgs">
          <img class="phone-pic" :src="require(`@/pics/picture6.jpg`)" />
          <img class="phone-pic" :src="require(`@/pics/picture7.jpg`)" />
        </div>
        <div class="txt">
          <h3>Setup in minutes</h3>
          <p>
            Get started fast with hundreds of visual and cutomizable templated -
            or creat your own even from your phone
          </p>
        </div>
      </section>
      <section class="trial">
        <h3>Try Tasker for your team</h3>
        <h5>14-day free trial | No credit card needed</h5>
        <router-link to="/home"
          >Get Started<i class="fas fa-chevron-right"></i
        ></router-link>
      </section>
      <section class="links">
        <div class="about-us">
          <a>About Us</a>
          <a>Become a partner</a>
          <a>Careers</a>
          <a>Blog</a>
          <a>Pricing</a>
          <a>Contact sales</a>
          <a>Terms and privacy</a>
          <a>Product overview</a>
          <a>Investor relations</a>
        </div>
        <div class="general">
          <a>Contact us</a>
          <a><i class="fas fa-universal-access"></i>Accessibility statement</a>
          <a
            ><i class="fas fa-globe"></i>Contact us<i
              class="fas fa-chevron-down"
            ></i
          ></a>
        </div>
      </section>
      <footer>
        <h1 class="logo">Tasker</h1>
        <p>All Rights Reserved <i class="far fa-copyright"></i> tasket.com</p>
        <div class="social-contact">
          <i class="fab fa-twitter"></i>
          <i class="fab fa-linkedin-in"></i>
          <i class="fab fa-facebook"></i>
          <i class="fab fa-youtube"></i>
          <i class="fab fa-instagram-square"></i>
        </div>
      </footer>
    </section>
  </section>
</template>

<script>
export default {};
</script>